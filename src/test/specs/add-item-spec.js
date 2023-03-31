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

describe('Add Item - Org Admin', () => {

    before(() => {
        ui.login.logIn(admin);
    });

     afterEach(() => {
            ui.app.cleanUp()
        });

    context('A.I_1 All fields enabled', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.enable_all_Item_fields();
            await api.org_settings.disable_Case_fields();
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
        });

        it.only ('A.I_1.1 Add Item with all fields from Main Menu', () => {
           /* ui.menu.navigateTo(C.menu.addItem);
             ui.addItems
                 .selectCase(D.newCase.caseNumber)
                 .verifyItemNumberOnAddItemPage('1')
                 .populateAllFields(D.newItem)
                 .clickSave();
             ui.itemView.verifyAllValues(D.newItem);*/
        });
    });

    context('A.I_2 Reduced number of fields', () => {
        beforeEach(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Item_fields();
            await api.org_settings.disable_Case_fields();
            D.generateNewDataSet(true);
            await api.cases.add_new_case(D.newCase.caseNumber);
        });

        it('A.I_2.1 Add Item with reduced number of fields from Case view page -> Items tab', () => {
            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
                .clickAddItemButton();
            ui.addItems
                .verifyItemNumberOnAddItemPage('1')
                .populateAllFields(D.newItem, true)
                .clickSave();
            ui.itemView.verifyValuesOnItemGrid(D.newItem)
                .goToItemViewPage()
                .verifyAllValues(D.newItem)

        });

    context('A.I_2.2 Add Item with Required Custom Form', () => {

        it('A.I_2.2.1 All custom fields are optional / Add User to User/User group field', () => {
            D.newItem.category = S.selectedEnvironment.category2.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
                .clickAddItemButton();
            ui.addItems.populateAllFields(D.newItem)
                .verifyCustomFormIsDisplayed()
                .verifyButtonIsEnabled(C.buttons.save)
                .expandCustomForm()
                .populateAllCustomFields(D.newItem)
                .clickSave();
            ui.itemView.goToItemViewPage()
                .verifyAllValues(D.newItem)
                .selectItemsTab(C.itemTabs.customData)
                .expandCustomForm()
                .verifyAllCustomValues(D.newItem);
        });

            it('A.I_2.2.2 All custom fields are required / Add User & User Group to User/User group field', () => {
                //TODO add validation for highlighted required fields when #14136 & #12750 get fixed
                let userGroupA = S.selectedEnvironment.admin_userGroup.name
                D.newItem.category = S.selectedEnvironment.category3.name
                D.newItem.customUser.name = D.newItem.customUser.name +'\n' + S.selectedEnvironment.admin_userGroup.name

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items)
                    .clickAddItemButton();
                ui.addItems.populateAllFields(D.newItem)
                    .verifyCustomFormIsDisplayed()
                    .verifyButtonIsDisabled(C.buttons.save)
                    .expandCustomForm()
                    .populateAllCustomFields(D.newItem)
                    .selectUserGroup(userGroupA)
                    .clickSave();
                ui.itemView.goToItemViewPage()
                    .verifyAllValues(D.newItem)
                    .selectItemsTab(C.itemTabs.customData)
                    .expandCustomForm()
                    .verifyAllCustomValues(D.newItem);
            });

            it('A.I_2.2.3 Required Custom Form with formula / Currency Form (Sys Template)', () => {

                D.newItem.category = S.selectedEnvironment.currencyCategory.name

                ui.menu.navigateTo(C.menu.addItem);
                ui.addItems.selectCase(D.newCase.caseNumber)
                    .populateAllFields(D.newItem)
                    .verifyCustomFormIsDisplayed()
                    .verifyButtonIsDisabled(C.buttons.save)
                    .expandCustomForm()
                    .verifyCurrencyTotalFieldIsRequired()
                    .populateAllNumberFieldsInCurrencyForm(D.newItem)
                    .verifyTotalIsCorrectlyAutoPopulated(D.newItem)
                    .clickSave()
                ui.itemView.verifyAllValues(D.newItem)
                           .selectItemsTab(C.itemTabs.customData)
                           .expandCustomForm()
                           .verifyAllCustomValuesInCurrencyForm(D.newItem)
            });
        });
    });
});


