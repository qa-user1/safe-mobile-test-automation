import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser;

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

describe('Edit Person - Org Admin', () => {

    before(() => {
        ui.login.logIn(admin);
    });

     afterEach(() => {
            ui.app.cleanUp()
        });

    context('All fields enabled', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Person_fields();
            D.generateNewDataSet()
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.people.add_new_person(true, S.selectedEnvironment.newCase)
        });

        it ('E.P_1 Edit Person with all fields enabled', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .clickEditPersonButton()
                .editAllPersonFields(D.editedPerson)
                .clickSave()
                .verifyAllValues(D.editedPerson)
                .selectPersonTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.editedPerson)
        });
    });

    context('Reduced number of fields', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.disable_Person_fields();
            D.getNewCaseData()
            D.getPersonDataWithReducedFields(D.newCase)
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.people.add_new_person(true, S.selectedEnvironment.newCase)
        });

        it ('E.P_2 Edit Person with reduced number of fields', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .clickEditPersonButton()
                .editAllPersonFields(D.editedPerson)
                .clickSave()
                .verifyAllValues(D.editedPerson)
                .selectPersonTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.editedPerson)
        });
    });

    context('E.P_3 Custom Form / Create a new Case and add Person to it (reduced number of fields)', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.disable_Person_fields()

        });
            beforeEach(async () => {
                D.getNewCaseData()
                D.getPersonDataWithReducedFields(D.newCase)
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.people.add_new_person(true, S.selectedEnvironment.newCase)
            });

        it ('E.P_3.1 Add Custom form to the person / Add User to User/User Group field', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.customData)
                .addCustomForm(S.selectedEnvironment.personCustomForm.name)
                .populateAllCustomFields(D.newPerson)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newPerson)
                .selectTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.newPerson)
                .verifyAllCustomValuesOnHistoryPage(D.newPerson)
        });

        it ('E.P_3.2 Add Custom form with all fields populated / Add User Group to User/User Group field', () => {
            D.newPerson.customUser.firstName = S.selectedEnvironment.admin_userGroup.name
            D.newPerson.customUser.name = S.selectedEnvironment.admin_userGroup.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.customData)
                .addCustomForm(S.selectedEnvironment.personCustomForm.name)
                .populateAllCustomFields(D.newPerson)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newPerson)
                .selectTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.newPerson)
                .verifyAllCustomValuesOnHistoryPage(D.newPerson)
        });

        it ('E.P_3.3 Edit Custom form that has empty fields / Add User & User Group to User/User Group field', () => {
           let userGroupA = S.selectedEnvironment.admin_userGroup.name
            D.newPerson.customUser.name = D.newPerson.customUser.name +'\n' + S.selectedEnvironment.admin_userGroup.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.customData)
                .addCustomForm(S.selectedEnvironment.personCustomForm.name)
                .saveCustomForm()
                .expandCustomForm()
                .populateAllCustomFields(D.newPerson)
                .selectUserGroup(userGroupA)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newPerson)
                .selectTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyAllValuesInHistory(D.newPerson)
                .verifyAllCustomValuesOnHistoryPage(D.newPerson)
        });

        it ('E.P_3.4 Edit Custom Form / Add Users or User Groups to User/User Group custom field', () => {
            let userGroupA = S.selectedEnvironment.admin_userGroup.name,
                userGroupB = S.selectedEnvironment.power_userGroup.name,
                userA = admin,
                userB = powerUser

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.customData)
                .addCustomForm(S.selectedEnvironment.personCustomForm.name)
                .selectUser(userA.firstName)
                .selectUser(userB.firstName)
                .saveCustomForm()
            D.newPerson.customUser.name = userA.name +'\n' + userB.name
            ui.personView
                .verifyValuesInUser_UserGroupField(D.newPerson)
                .clearUser_UserGroupField(2)
                .selectUserGroup(userGroupA)
                .selectUserGroup(userGroupB)
                .saveCustomForm()
            D.newPerson.customUser.name = userGroupA +'\n' + userGroupB
            ui.personView.verifyValuesInUser_UserGroupField(D.newPerson)
        });
    });
});


