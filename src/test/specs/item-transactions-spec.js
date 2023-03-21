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

describe('Item Transactions - Org Admin', () => {

    before(() => {
        ui.login.logIn(admin);
    });

    afterEach(() => {
        ui.app.cleanUp();
    });

    context('1. Move transaction', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();
        });

        context('1.1 No Signature set by default / Touch Screen enabled', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(2, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });
            it('1.1.1 Move Item out of non_Container loc / All fields populated on Move modal / Add Signature', () => {

                D.transactionData.storageLocation = S.selectedEnvironment.locations[2].name;

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.move)
                    .populateTransactionFields(C.transactions.move)
                    .verifyNoSignatureIsCheckedByDefault(true)
                    .clickNoSignatureCheckbox()
                    .addSignature()
                    .completeTransaction(C.transactionModal.move);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation);
            });
        });

        context('1.2 No Signature & Touch Screen are enabled / Touch Screen set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, true, true);
            });
            beforeEach(async () => {
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });
            it('1.2.1 Move Item out of non_Container loc / All fields populated on Move modal / Signature is not added', () => {

                D.transactionData.storageLocation = S.selectedEnvironment.locations[2].name;

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.move)
                    .populateTransactionFields(C.transactions.move)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .clickNoSignatureCheckbox()
                    .completeTransaction(C.transactionModal.move);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation);

            });

            it('1.2.2 Verify Item cannot be moved to the same location / Required fields populated on Move modal / Add Signature', () => {

                D.transactionData.storageLocation = S.selectedEnvironment.locations[0].name;

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.move)
                    .populateTransactionFields(C.transactions.move, true)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .addSignature()
                    .completeTransaction(C.transactionModal.move)
                    .verifyToastMessage(C.messages.cannotMoveItemToTheSameLocation)
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation); //storage loc remains unchanged
            });
        });

        context('1.3 Only Touch Screen is enabled and set by default / Add Item to Container loc', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, false, true);
                D.generateNewDataSet();
                D.newItem.locationId = S.selectedEnvironment.locations[1].id; //Container location
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });

            context('1.3.1 Verify displaying warning modal when moving Item out of Container', () => {
            it('1.3.1 Only required fields are populated on Move modal including Signature', () => {

                D.transactionData.storageLocation = S.selectedEnvironment.locations[2].name;

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.move)
                    .verifyTextOnWarningModal(C.alerts.itemInsideOfContainer)
                    .clickButton('Yes')
                    .populateTransactionFields(C.transactions.move, true)
                    .addSignature()
                    .completeTransaction(C.transactionModal.move);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation);

            });
            });
        });
    });


    context('2. CheckOut transaction', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();
        });

        context('2.1 No Signature set by default / Touch Screen enabled', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(2, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });
            it('2.1.1 Check Item Out / All fields populated on Check Out modal / Add Signature', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.checkOut)
                    .verifyTextOnTransactionHeader('Checkout 1 Item')
                    .populateTransactionFields(C.transactions.checkOut)
                    .verifyNoSignatureIsCheckedByDefault(true)
                    .clickNoSignatureCheckbox()
                    .addSignature()
                    .completeTransaction(C.transactionModal.checkOut);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Checked Out', D.transactionData.custodian)
            });
        });

        context('2.2 No Signature & Touch Screen are enabled / Touch Screen set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });
            it('2.2.1 All fields populated on Check Out modal / External user added as Custodian / Signature is not added', () => {

                D.transactionData.custodian.firstName = S.userAccounts.org2Admin.firstName;
                let custodian_externalUser = S.userAccounts.org2Admin

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.checkOut)
                    .verifyTextOnTransactionHeader('Checkout 1 Item')
                    .populateTransactionFields(C.transactions.checkOut)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .clickNoSignatureCheckbox()
                    .completeTransaction(C.transactionModal.checkOut);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Checked Out', custodian_externalUser);

            });
        });

        context('2.3 Only Touch Screen is enabled and set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, false, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });

                it('2.3.1 Only required fields are populated on Check Out modal including Signature', () => {

                    ui.homePage.goToExistingCase(D.newCase.caseNumber);
                    ui.caseView.selectTab(C.caseTabs.items);
                    ui.itemView.pressItem('1')
                        .clickFlashIcon()
                    ui.transactions.selectAction(C.transactions.checkOut)
                        .verifyTextOnTransactionHeader('Checkout 1 Item')
                        .populateTransactionFields(C.transactions.checkOut, true)
                        .addSignature()
                        .completeTransaction(C.transactionModal.checkOut);
                    ui.itemView.verifyStatusOnTheGrid('Checked Out')
                        .goToItemViewPage()
                        .verifyValuesOnItemView('', 'Checked Out', D.transactionData.custodian);

            });
        });
    });

    context('3. Disposal transaction', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();
        });

        context('3.1 No Signature set by default / Touch Screen enabled', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(2, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });
            it('3.1.1 Dispose Checked In Item / All fields populated on Disposal modal / Add Signature', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.dispose)
                    .verifyTextOnTransactionHeader('Dispose 1 Item')
                    .populateTransactionFields(C.transactions.dispose)
                    .verifyNoSignatureIsCheckedByDefault(true)
                    .clickNoSignatureCheckbox()
                    .addSignature()
                    .completeTransaction(C.transactionModal.dispose);
                ui.itemView.verifyStatusOnTheGrid('Disposed')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Disposed')
            });
        });

        context('3.2 No Signature & Touch Screen are enabled / Touch Screen set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await api.transactions.check_out_item();
            });
            it('3.2.1 Dispose Checked Out Item / All fields populated on Disposal modal / Signature is not added', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.dispose)
                    .verifyTextOnTransactionHeader('Dispose 1 Item')
                    .populateTransactionFields(C.transactions.dispose)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .clickNoSignatureCheckbox()
                    .completeTransaction(C.transactionModal.dispose);
                ui.itemView.verifyStatusOnTheGrid('Disposed')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Disposed')
            });
        });

        context('3.3 Only Touch Screen is enabled and set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, false, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });

            it('3.3.1 Only required fields are populated on Disposal modal including Signature / External User set as witness', () => {
                D.transactionData.witness.firstName = S.userAccounts.org2Admin.firstName // External User

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.dispose)
                    .verifyTextOnTransactionHeader('Dispose 1 Item')
                    .populateTransactionFields(C.transactions.dispose, true)
                    .addSignature()
                    .completeTransaction(C.transactionModal.dispose);
                ui.itemView.verifyStatusOnTheGrid('Disposed')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Disposed')
            });
        });
    });

    context('4. CheckIn transaction', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();
        });

        context('4.1 No Signature set by default / Touch Screen enabled', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(2, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item();
            });
            it('4.1.1 Check Item In / All fields populated on CheckIn modal / Add Signature', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.checkIn)
                    .verifyTextOnTransactionHeader('Check in 1 item')
                    .populateTransactionFields(C.transactions.checkIn)
                    .verifyNoSignatureIsCheckedByDefault(true)
                    .clickNoSignatureCheckbox()
                    .addSignature()
                    .completeTransaction(C.transactionModal.checkIn);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation, 'Checked In')
            });
        });

        context('4.2 No Signature & Touch Screen are enabled / Touch Screen set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item();
            });
            it('4.2.1 Check Item In / All fields populated on CheckIn modal / Signature is not added', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.checkIn)
                    .verifyTextOnTransactionHeader('Check in 1 item')
                    .populateTransactionFields(C.transactions.checkIn)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .clickNoSignatureCheckbox()
                    .completeTransaction(C.transactionModal.checkIn);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation, 'Checked In')
            });
        });

        context('4.3 Only Touch Screen is enabled and set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, false, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item();
            });

            it('4.3.1 Only required fields are populated on CheckIn modal including Signature / External person set as Returned By', () => {

                D.transactionData.returnedBy.firstName = S.userAccounts.org2Admin.firstName

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.checkIn)
                    .verifyTextOnTransactionHeader('Check in 1 item')
                    .populateTransactionFields(C.transactions.checkIn, true)
                    .addSignature()
                    .completeTransaction(C.transactionModal.checkIn);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation, 'Checked In')
            });
        });
    });

    context('5. Undisposal transaction', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();
        });

        context('5.1 No Signature set by default / Touch Screen enabled', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(2, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.dispose_item();
            });
            it('5.1.1 Undispose Item / All fields populated on Undisposal modal / Add Signature', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Disposed')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.undispose)
                    .verifyTextOnTransactionHeader('Undispose 1 item')
                    .populateTransactionFields(C.transactions.undispose)
                    .verifyNoSignatureIsCheckedByDefault(true)
                    .clickNoSignatureCheckbox()
                    .addSignature()
                    .completeTransaction(C.transactionModal.checkIn);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation, 'Checked In')
            });
        });

        context('5.2 No Signature & Touch Screen are enabled / Touch Screen set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.dispose_item();
            });
            it('5.2.1 Undispose Item / All fields populated on Undisposal modal / Signature is not added', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Disposed')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.undispose)
                    .verifyTextOnTransactionHeader('Undispose 1 item')
                    .populateTransactionFields(C.transactions.undispose)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .clickNoSignatureCheckbox()
                    .completeTransaction(C.transactionModal.checkIn);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation, 'Checked In')
            });
        });

        context('5.3 Only Touch Screen is enabled and set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, false, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.dispose_item();
            });

            it('5.3.1 Only required fields are populated on Undisposal modal including Signature / External person set as Returned By', () => {

                D.transactionData.returnedBy.firstName = S.userAccounts.org2Admin.firstName

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Disposed')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.undispose)
                    .verifyTextOnTransactionHeader('Undispose 1 item')
                    .populateTransactionFields(C.transactions.undispose, true)
                    .addSignature()
                    .completeTransaction(C.transactionModal.checkIn);
                ui.itemView.verifyStorageLocationOnTheGrid(D.transactionData.storageLocation)
                    .goToItemViewPage()
                    .verifyValuesOnItemView(D.transactionData.storageLocation, 'Checked In')
            });
        });
    });

    context('6. Transfer transaction', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Item_fields();
        });

        context('6.1 No Signature set by default / Touch Screen enabled', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(2, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item();
            });
            it('6.1.1 Transfer Item / All fields populated on Transfer modal / Add Signature', () => {

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.transfer)
                    .verifyTextOnTransactionHeader('Transfer 1 item')
                    .verifyValueInTransferredFromField(admin.name)
                    .populateTransactionFields(C.transactions.transfer)
                    .verifyNoSignatureIsCheckedByDefault(true)
                    .clickNoSignatureCheckbox()
                    .addSignature()
                    .completeTransaction(C.transactionModal.transfer);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Checked Out', D.transactionData.custodian)
            });
        });

        context('6.2 No Signature & Touch Screen are enabled / Touch Screen set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, true, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item();
            });
            it('6.2.1 All fields populated on Transfer modal / External user added to the Transferred To / Signature is not added', () => {

                D.transactionData.custodian.firstName = S.userAccounts.org2Admin.firstName;
                let custodian_externalUser = S.userAccounts.org2Admin

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.transfer)
                    .verifyTextOnTransactionHeader('Transfer 1 item')
                    .verifyValueInTransferredFromField(admin.name)
                    .populateTransactionFields(C.transactions.transfer)
                    .verifyNoSignatureIsCheckedByDefault(false)
                    .clickNoSignatureCheckbox()
                    .completeTransaction(C.transactionModal.transfer);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Checked Out', custodian_externalUser);

            });
        });

        context('6.3 Only Touch Screen is enabled and set by default', () => {
            before(async () => {
                await api.org_settings.set_Signature_Configuration(0, false, true);
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
                await api.items.add_new_item(S.selectedEnvironment.newCase);
                await browser.pause(1000)
                await api.transactions.check_out_item();
            });

            it('6.3.1 Edit Transferred From field / Only required fields are populated on Transfer modal including Signature', () => {


                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.items);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .pressItem('1')
                    .clickFlashIcon()
                ui.transactions.selectAction(C.transactions.transfer)
                    .verifyTextOnTransactionHeader('Transfer 1 item')
                    .verifyValueInTransferredFromField(admin.name)
                    .editValueInTransferredFromField(admin2)
                    .selectPerson(C.placeholders.personField, D.transactionData.custodian)
                    .addSignature()
                    .completeTransaction(C.transactionModal.transfer);
                ui.itemView.verifyStatusOnTheGrid('Checked Out')
                    .goToItemViewPage()
                    .verifyValuesOnItemView('', 'Checked Out', D.transactionData.custodian);

            });
        });
    });
});


