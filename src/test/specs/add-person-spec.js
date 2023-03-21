import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import helper from '../utils/helper';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser;

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

describe('Add Person - Org Admin', () => {

    before(() =>{
        ui.login.logIn(admin);
    });

    afterEach(() => {
           ui.app.cleanUp()
       });

    context('A.P_1 All Person fields enabled', () => {
        before (async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Person_fields();
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
        });

        beforeEach (async () => {
            D.getNewPersonData()
        });

        it ('A.P_1.1 Add Person with all fields enabled from Main Menu ', () => {
            ui.menu.navigateTo(C.menu.addPerson);
             ui.addPerson.populateAllPersonFields(D.newPerson)
                 .populateAddressFields(D.newPersonAddress)
                 .selectCaseAndPersonType(D.newCase.caseNumber, D.newPerson.personType)
                 D.newPerson.updateDate = helper.setDate(C.currentDateTimeFormat)
             ui.addPerson.clickSave();
             ui.personView.verifyAllValues(D.newPerson)
                 .selectTab(C.peopleTabs.addresses)
                 .verifyAllAddressValues(D.newPersonAddress)
                 .selectTab(C.peopleTabs.history)
                 .goToHistoryViewPage(true)
                 .verifyAllValuesInHistory(D.newPerson)
        });

        it ('A.P_1.2 Verify that Person can be added without an Address', () => {
            ui.menu.navigateTo(C.menu.addPerson);
            ui.addPerson.addFirstName(D.newPerson.firstName)
                .addLastName(D.newPerson.lastName)
                .selectCaseAndPersonType(D.newCase.caseNumber, D.newPerson.personType)
                .verifySaveButtonIsEnabled()
                .clickSave()
            ui.personView.verifyPersonRequiredFields(D.newPerson)
                .selectTab(C.peopleTabs.addresses)
                .verifyPersonHasNoAddress(C.badge.noAddress)
        });
    });


    context('A.P_2 Reduced number of Person fields', () => {
        before (async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Person_fields();
            await api.org_settings.disable_Case_fields();
            D.generateNewDataSet(true);
            await api.cases.add_new_case(D.newCase.caseNumber);
        });

        beforeEach (async () => {
            D.getPersonDataWithReducedFields();
        });

        it('A.P_2.1 Add Person with reduced number of fields from Case view page -> Person tab', () => {
            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.addPerson.clickAddPersonButton()
                        .populateAllPersonFields(D.newPerson)
                        .selectPersonType(D.newPerson.personType)
            D.newPerson.updateDate = helper.setDate(C.currentDateTimeFormat)
            ui.addPerson.clickSave();
            ui.personView.goToPersonViewPage()
                .verifyPersonRequiredFields(D.newPerson)
                .selectTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.newPerson)
        });

    context('A.P_2.2 Add Person with Required Custom Form', () => {

        it ('A.P_2.2.1 All custom fields are optional / Add User to User/User Group field', () => {
            D.newPerson.personType = S.selectedEnvironment.personType2.name

            ui.menu.navigateTo(C.menu.addPerson);
            ui.addPerson.addFirstName(D.newPerson.firstName)
                .addLastName(D.newPerson.lastName)
                .selectCaseAndPersonType(D.newCase.caseNumber, D.newPerson.personType)
                .verifyButtonIsEnabled(C.buttons.save)
                .expandPeopleCustomForm()
                .populateAllCustomFields(D.newPerson)
                .clickSave();
            ui.personView.verifyPersonRequiredFields(D.newPerson)
                .selectTab(C.peopleTabs.customData)
                .expandCustomForm()
                .verifyAllCustomValues(D.newPerson)
                .selectTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.newPerson)
                .verifyAllCustomValuesOnHistoryPage(D.newPerson)
        });

           it ('A.P_2.2.2 All custom fields are required / Add User and User Group to User/User Group field', () => {
                //TODO add validation for highlighted required fields when #14136 & #12750 get fixed
                let userGroupA = S.selectedEnvironment.admin_userGroup.name
                D.newPerson.personType = S.selectedEnvironment.personType3.name
                D.newPerson.customUser.name = D.newPerson.customUser.name +'\n' + S.selectedEnvironment.admin_userGroup.name

                ui.menu.navigateTo(C.menu.addPerson);
                ui.addPerson.addFirstName(D.newPerson.firstName)
                    .addLastName(D.newPerson.lastName)
                    .selectCaseAndPersonType(D.newCase.caseNumber, D.newPerson.personType)
                    .verifyButtonIsDisabled(C.buttons.save)
                    .expandPeopleCustomForm()
                    .populateAllCustomFields(D.newPerson)
                    .selectUserGroup(userGroupA)
                    .clickSave();
                ui.personView.verifyPersonRequiredFields(D.newPerson)
                    .selectTab(C.peopleTabs.customData)
                    .expandCustomForm()
                    .verifyAllCustomValues(D.newPerson)
                    .selectTab(C.peopleTabs.history)
                    .goToHistoryViewPage(true)
                    .verifyAllValuesInHistory(D.newPerson)
                    .verifyAllCustomValuesOnHistoryPage(D.newPerson)
            });
        });
        });
});


