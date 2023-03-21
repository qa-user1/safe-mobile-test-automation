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

describe('Edit Item - Org Admin', () => {

    before(() => {
        ui.login.logIn(admin);
    });

     afterEach(() => {
            ui.app.cleanUp()
        });

    context('1. All fields enabled', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.get_current_org_settings(S.selectedEnvironment.orgSettings.id)
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();

        });
        context('1.1 Checked In Item', () => {
            beforeEach(async () => {
                D.generateNewDataSet();
                D.newItem.barcodes = [{id:0, value:helper.getRandomNo(10)}]
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });

        it.only('1.1.1 Edit Checked In Item with all fields enabled / verify that Save button is enabled as soon as we edit any value', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .clickEditItemButton()
                .editCategory(D.newItem.category)
                .verifyButtonIsEnabled('Save')
                .editAllValues(D.editedItem)
                .clickSave()
            D.editedItem.caseNumber = D.newCase.caseNumber
            D.editedItem.recoveredByName = S.userAccounts.powerUser.lastName + ', '  + S.userAccounts.powerUser.firstName + ' (' + S.userAccounts.powerUser.email + ')'
            ui.itemView.verifyAllValues(D.editedItem)
        });

            it('1.1.2 Split Checked In Item with all fields enabled / values are not edited', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                ui.itemView.goToItemViewPage()
                    .clickFlashIconOnItemView()
                    .selectAction('Split')
                ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '1.1')
                    .confirmAction()
                    .clickSave()
                D.editedItem.caseNumber = D.newCase.caseNumber
                ui.itemView.verifyAllValues(D.newItem)
            });

            it('1.1.3 Duplicate Checked In Item with all fields enabled / values are not edited', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                ui.itemView.goToItemViewPage()
                    .clickFlashIconOnItemView()
                    .selectAction('Duplicate')
                ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '2')
                    .confirmAction()
                    .clickSave()
                D.editedItem.caseNumber = D.newCase.caseNumber
                ui.itemView.verifyAllValues(D.newItem)
            });
        });

        context('1.2 Checked Out Item', () => {
            beforeEach(async () => {
                D.generateNewDataSet();
                D.newItem.barcodes = [{id:0, value:helper.getRandomNo(10)}]
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item()
            });
        it.only('1.2.1 Edit Checked Out Item with all fields enabled', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .clickEditItemButton()
                .editAllValues(D.editedItem)
                .clickSave()
            D.editedItem.caseNumber = D.newCase.caseNumber
            D.editedItem.recoveredByName = S.userAccounts.powerUser.lastName + ', '  + S.userAccounts.powerUser.firstName + ' (' + S.userAccounts.powerUser.email + ')'
            D.editedItem.status = 'Checked Out'
            D.editedItem.location = ''
            ui.itemView.verifyAllValues(D.editedItem)
        });

            it('1.2.2 Split Checked Out Item with all fields enabled / Select Storage Location', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                ui.itemView.goToItemViewPage()
                    .clickFlashIconOnItemView()
                    .selectAction('Split')
                ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '1.1')
                    .confirmAction()
                    .selectStorageLocation(D.newItem.location)
                    .clickSave()
                D.editedItem.caseNumber = D.newCase.caseNumber
                ui.itemView.verifyAllValues(D.newItem)
            });

            it('1.2.3 Duplicate Checked Out Item with all fields enabled / Select Storage Location', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                ui.itemView.goToItemViewPage()
                    .clickFlashIconOnItemView()
                    .selectAction('Duplicate')
                ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '2')
                    .confirmAction()
                    .selectStorageLocation(D.newItem.location)
                    .clickSave()
                D.editedItem.caseNumber = D.newCase.caseNumber
                ui.itemView.verifyAllValues(D.newItem)
            });
        });

        context('1.3 Disposed Item', () => {
            beforeEach(async () => {
                D.generateNewDataSet();
                D.newItem.barcodes = [{id:0, value:helper.getRandomNo(10)}]
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.dispose_item()
            });
        it('1.3.1 Edit Disposed Item with all fields enabled', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .clickEditItemButton()
                .editAllValues(D.editedItem)
                .clickSave()
            D.editedItem.caseNumber = D.newCase.caseNumber
            D.editedItem.recoveredByName = S.userAccounts.powerUser.lastName + ', '  + S.userAccounts.powerUser.firstName + ' (' + S.userAccounts.powerUser.email + ')'
            D.editedItem.status = 'Disposed'
            D.editedItem.location = ''
            ui.itemView.verifyAllValues(D.editedItem)
        });
   //TODO Add error message verification when #13808 gets deployed
            xit('1.3.2 Verify that cannot split Disposed Item', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                ui.itemView.goToItemViewPage()
                    .clickFlashIconOnItemView()
                    .selectAction('Split')
            });

            it('1.3.3 Duplicate Disposed Item with all fields enabled / Select Storage Location', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                ui.itemView.goToItemViewPage()
                    .clickFlashIconOnItemView()
                    .selectAction('Duplicate')
                ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '2')
                    .confirmAction()
                    .selectStorageLocation(D.newItem.location)
                    .clickSave()
                D.editedItem.caseNumber = D.newCase.caseNumber
                ui.itemView.verifyAllValues(D.newItem)
            });
        });
    });

    context('2. Reduced number of Item fields', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.disable_Item_fields();
            D.getNewCaseData()
            D.getItemDataWithReducedFields(D.newCase)

        });
        beforeEach (async () => {
            D.getNewCaseData()
            D.getItemDataWithReducedFields(D.newCase)
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.items.add_new_item(S.selectedEnvironment.newCase)
        });

        it('2.1.1 Edit Item with reduced number of fields', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .clickEditItemButton()
                .editAllValues(D.editedItem)
                .clickSave()
            D.editedItem.caseNumber = D.newCase.caseNumber
            ui.itemView.verifyAllValues(D.editedItem)
        });

        it('2.1.2 Split Checked In Item with reduced number of fields / values are not edited', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .clickFlashIconOnItemView()
                .selectAction('Split')
            ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '1.1')
                .confirmAction()
                .clickSave()
            D.editedItem.caseNumber = D.newCase.caseNumber
            ui.itemView.verifyAllValues(D.newItem)
        });

        it('2.1.3 Duplicate Checked In Item with reduced number of fields / values are not edited', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .clickFlashIconOnItemView()
                .selectAction('Duplicate')
            ui.itemView.verifyAllValuesOnItemAddPage(D.newItem, '2')
                .confirmAction()
                .clickSave()
            D.editedItem.caseNumber = D.newCase.caseNumber
            ui.itemView.verifyAllValues(D.newItem)
        });


    context('2.2 Custom Form', () => {

        it ('2.2.1 Add Custom form with all fields populated / Add User to User/User Group field', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.customData)
                .addCustomForm(S.selectedEnvironment.itemCustomForm.name)
                .populateAllCustomFields(D.newItem)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newItem)
        });

        it ('2.2.2 Add Custom form with all fields populated / Add User Group to User/User Group field', () => {
            D.newItem.customUser.firstName = S.selectedEnvironment.admin_userGroup.name
            D.newItem.customUser.name = S.selectedEnvironment.admin_userGroup.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.customData)
                .addCustomForm(S.selectedEnvironment.itemCustomForm.name)
                .populateAllCustomFields(D.newItem)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newItem)
        });

        it ('2.2.3 Edit Custom form that has empty fields / Add User & User Group to User/User Group field', () => {
           let userGroupA = S.selectedEnvironment.admin_userGroup.name
            D.newItem.customUser.name = D.newItem.customUser.name +'\n' + S.selectedEnvironment.admin_userGroup.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.customData)
                .addCustomForm(S.selectedEnvironment.itemCustomForm.name)
                .saveCustomForm()
                .expandCustomForm()
                .populateAllCustomFields(D.newItem)
                .selectUserGroup(userGroupA)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newItem)
        });

        it ('2.2.4 Edit Custom Form / Add Users or User Groups to User/User Group custom field', () => {
            let userGroupA = S.selectedEnvironment.admin_userGroup.name,
                userGroupB = S.selectedEnvironment.power_userGroup.name,
                userA = admin,
                userB = powerUser

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.customData)
                .addCustomForm(S.selectedEnvironment.itemCustomForm.name)
                .selectUser(userA.firstName)
                .selectUser(userB.firstName)
                .saveCustomForm()
            D.newItem.customUser.name = userA.name +'\n' + userB.name
            ui.itemView
                .verifyValuesInUser_UserGroupField(D.newItem)
                .clearUser_UserGroupField(2)
                .selectUserGroup(userGroupA)
                .selectUserGroup(userGroupB)
                .saveCustomForm()
            D.newItem.customUser.name = userGroupA +'\n' + userGroupB
            ui.itemView.verifyValuesInUser_UserGroupField(D.newItem)
        });
        });
    });
});


