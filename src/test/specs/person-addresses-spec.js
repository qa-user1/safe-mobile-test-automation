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

describe('Person Addresses - Org Admin', () => {

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
        });
        beforeEach(async () => {
            D.generateNewDataSet()
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.people.add_new_person(true, S.selectedEnvironment.newCase)
        });

        it ('1. Add Second Address and set it as default and verify that it cannot be deleted', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.addresses)
                .clickAddAddressButton()
                .populateAddressFields(D.newPersonAddress2)
                .clicksaveButton()
                .verifyAllAddressValues(D.newPersonAddress2)
                .setAddressAsDefault(D.newPersonAddress2)
                .verifyMessage('Saved')
                .deleteAddress(D.newPersonAddress2, 1)
                .verifyMessage('Set another address as Default before deleting this address')

        });

        it ('2. Add Second Address / Fill in only required fields', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.addresses)
                .clickAddAddressButton()
                .addAddress1(D.newPersonAddress.line1)
                .addCity(D.newPersonAddress.city)
                .clicksaveButton()
                .verifyMessage('Saved')
                .verifyMultipleValuesOnPersonGrids([
                    D.newPersonAddress.line1,
                    D.newPersonAddress.city
                ])

        });
        it ('3. Edit Person Address', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.addresses)
                .editAddress(D.editedPersonAddress)
                .clicksaveButton()
                .verifyMessage('Saved')
                .verifyAllAddressValues(D.editedPersonAddress)

        });
        it ('4. Delete Person Address', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.addresses)
                .deleteAddress(D.newPersonAddress, 0)
                .clickButton('Yes')
                .verifyMessage('Saved')
                .verifyPersonHasNoAddress('(NO ADDRESSES)')

        });

    });
});


