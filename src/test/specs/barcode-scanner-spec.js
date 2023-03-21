import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import helper from '../utils/helper';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser, itemData1, itemData2,
    locationLabels = [
    'Items Count:',
    'Location Barcode:' ,
    'Legacy Barcode:',
    'Full Location Path:',
    'Groups:',
    'Storage:'
];

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

if(S.isIOS()){
describe('Barcode Scanner - Org Admin', () => {

    before(() => {
        ui.login.logIn(admin);
    });

     afterEach(() => {
        ui.barcodeScanner.clearScanList()
             .verifyScanListsAreCleared(
                 C.messages.scanPage.itemCurrentOffice,
                 C.messages.scanPage.itemOtherOffices,
                 C.messages.scanPage.containers,
                 C.messages.scanPage.history
             )
         ui.app.cleanUp()
        });

    context('Scan Items', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.enable_all_Case_fields();
            await api.org_settings.enable_all_Item_fields();
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
        });

        context('1. Single Barcode', () => {
            before(async () => {
                await api.items.add_new_item(S.selectedEnvironment.newCase);
            });

        it('1.1 Scan valid Item Barcode', () => {
            let itemData = JSON.parse(S.selectedEnvironment.newItem)

            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                .enterBarcode(itemData.barcode)
                .clickScanButton()
                .verifyScanMessage(['Items scanned Successfully with value: ' + itemData.barcode + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('1', true)
                .verifyItemValues(D.newItem)
                .goTo('history')
                .verifyNumberOfReturnedResults('1')
                .verifyTextOnScanHistoryRecord(0, itemData.barcode, 'Items', D.newItem.location, D.newItem.description, scanTime, 'Scanned')

        });

        it('1.2 Scan Item Additional Barcode', () => {

            let itemData = JSON.parse(S.selectedEnvironment.newItem)

            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                .enterBarcode(itemData.barcodes[0].value)
                .clickScanButton()
                .verifyScanMessage(['Items scanned Successfully with value: ' + itemData.barcodes[0].value + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('1', true)
                .verifyItemValues(D.newItem)
                .goTo('history')
                .verifyNumberOfReturnedResults('1')
                .verifyTextOnScanHistoryRecord(0, itemData.barcode, 'Items', D.newItem.location, D.newItem.description, scanTime, 'Scanned')
        });

        it('1.3 Scan Item Serial Number', () => {
            let itemData = JSON.parse(S.selectedEnvironment.newItem)

            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                .enterBarcode(itemData.serialNumber)
                .clickScanButton()
                .verifyScanMessage(['Items scanned Successfully with value: ' + itemData.serialNumber + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('1', true)
                .verifyItemValues(D.newItem)
                .goTo('history')
                .verifyTextOnScanHistoryRecord(0, itemData.barcode, 'Items', D.newItem.location, D.newItem.description, scanTime, 'Scanned')
        });

        it('1.4 Scan valid and invalid/not existing barcode', () => {
            let itemData = JSON.parse(S.selectedEnvironment.newItem)

            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                .enterBarcode('jasjfgajfgjsfgj')
                .clickScanButton()
                .verifyScanMessage([
                    'No item or location found with scanned value: jasjfgajfgjsfgj.'])
                .clickBarcodeButton()
                .enterBarcode(itemData.barcode)
                .clickScanButton()
                .verifyScanMessage(['Items scanned Successfully with value: ' + itemData.barcode + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('1', true)
                .goTo('history')
                .verifyNumberOfReturnedResults('2')
                .verifyErrorMessageOnScanHistory('jasjfgajfgjsfgj', 'No item or location found with scanned value: jasjfgajfgjsfgj.')
                .verifyTextOnScanHistoryRecord(0, itemData.barcode, 'Items', D.newItem.location, D.newItem.description, scanTime, 'Scanned')
        });

        it('1.5 Scan the same barcode twice', () => {
            let itemData = JSON.parse(S.selectedEnvironment.newItem)

            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                .enterBarcode(itemData.barcode)
                .clickScanButton()
                .verifyScanMessage(['Items scanned Successfully with value: ' + itemData.barcode + '.'])
            let   scanTime1 = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner
                .clickBarcodeButton()
                .enterBarcode(itemData.barcode)
                .clickScanButton()
            let   scanTime2 = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyScanMessage(['Item already scanned with value: ' + itemData.barcode + '.'])
                .verifyNumberOfReturnedResults('1', true)
                .verifyItemValues(D.newItem)
                .goTo('history')
                .verifyNumberOfReturnedResults('2')
                .verifyTextOnScanHistoryRecord(0, itemData.barcode, 'Items', D.newItem.location, D.newItem.description, scanTime1, 'Already Scanned')
                .verifyTextOnScanHistoryRecord(1, itemData.barcode, 'Items', D.newItem.location, D.newItem.description, scanTime2, 'Scanned')

    });
    });

    context('2. Mass Import', () => {

         before(async () => {
             D.getNewItemData()
             D.newItem.barcodes = [{id:0, value:helper.getRandomNo(10)}]
             await api.items.add_new_item(S.selectedEnvironment.newCase);
              S.selectedEnvironment.barcodes[0] = JSON.parse(S.selectedEnvironment.newItem).barcode
              itemData1 = D.newItem
             D.getNewItemData()
             D.newItem.barcodes = [{id:0, value:helper.getRandomNo(10)}]
             await api.items.add_new_item(S.selectedEnvironment.newCase);
              S.selectedEnvironment.barcodes[1] = JSON.parse(S.selectedEnvironment.newItem).barcode
              itemData2 = D.newItem
        });

        it('2.1 Scan Items valid Barcodes', () => {

            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .selectMassImport()
                .verifyMessage('(You can add up to 500 barcodes or serial numbers at a time, 1 per line.)')
                .enterBarcode(S.selectedEnvironment.barcodes[0], true)
                .enterBarcode(S.selectedEnvironment.barcodes[1], true)
                .clickScanButton()
                .verifyScanMessage([
                    'Items scanned Successfully with value: ' + S.selectedEnvironment.barcodes[1] + '.',
                    'Items scanned Successfully with value: ' + S.selectedEnvironment.barcodes[0] + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('2', true)
                .verifyItemValues(itemData1)
                .verifyItemValues(itemData2)
                .goTo('history')
                .verifyNumberOfReturnedResults('2')
                .verifyTextOnScanHistoryRecord(0, S.selectedEnvironment.barcodes[1], 'Items', itemData2.location, itemData2.description, scanTime, 'Scanned')
                .verifyTextOnScanHistoryRecord(1, S.selectedEnvironment.barcodes[0], 'Items', itemData1.location, itemData1.description, scanTime, 'Scanned')
        });

        it('2.2 Scan Items Additional Barcodes', () => {
            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .selectMassImport()
                .verifyMessage('(You can add up to 500 barcodes or serial numbers at a time, 1 per line.)')
                .enterBarcode(itemData1.barcodes[0].value, true)
                .enterBarcode(itemData2.barcodes[0].value, true)
                .clickScanButton()
                .verifyScanMessage([
                    'Items scanned Successfully with value: ' + itemData1.barcodes[0].value + '.',
                    'Items scanned Successfully with value: ' + itemData2.barcodes[0].value + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('2', true)
                .verifyItemValues(itemData1)
                .verifyItemValues(itemData2)
                .goTo('history')
                .verifyNumberOfReturnedResults('2')
                .verifyTextOnScanHistoryRecord(0, S.selectedEnvironment.barcodes[1], 'Items', itemData2.location, itemData2.description, scanTime, 'Scanned')
                .verifyTextOnScanHistoryRecord(1, S.selectedEnvironment.barcodes[0], 'Items', itemData1.location, itemData1.description, scanTime, 'Scanned')

        });

        it('2.3 Scan Items Serial Numbers', () => {
            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .selectMassImport()
                .verifyMessage('(You can add up to 500 barcodes or serial numbers at a time, 1 per line.)')
                .enterBarcode(itemData1.serialNumber, true)
                .enterBarcode(itemData2.serialNumber, true)
                .clickScanButton()
                .verifyScanMessage([
                    'Items scanned Successfully with value: ' + itemData1.serialNumber + '.',
                    'Items scanned Successfully with value: ' + itemData2.serialNumber + '.'])
            let   scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('2', true)
                .verifyItemValues(itemData1)
                .verifyItemValues(itemData2)
                .goTo('history')
                .verifyNumberOfReturnedResults('2')
                .verifyTextOnScanHistoryRecord(0, S.selectedEnvironment.barcodes[1], 'Items', itemData2.location, itemData2.description, scanTime, 'Scanned')
                .verifyTextOnScanHistoryRecord(1, S.selectedEnvironment.barcodes[0], 'Items', itemData1.location, itemData1.description, scanTime, 'Scanned')

        });

        it('2.4 Scan valid Barcode and Serial Number of Item1 + invalid Barcode + Serial Number of Item 2', () => {
            ui.menu.navigateTo(C.menu.barcodeScanner)
            ui.barcodeScanner
                .clickBarcodeButton()
                .selectMassImport()
                .verifyMessage('(You can add up to 500 barcodes or serial numbers at a time, 1 per line.)')
                .enterBarcode(S.selectedEnvironment.barcodes[0], true)
                .enterBarcode(itemData1.serialNumber, true)
                .enterBarcode('jasjfgajfgjsfgj', true)
                .enterBarcode(itemData2.serialNumber, true)
                .clickScanButton()
                .verifyScanMessage([
                    'Items scanned Successfully with value: ' + S.selectedEnvironment.barcodes[0] + '.',
                    'Items scanned Successfully with value: ' + itemData1.serialNumber + '.', /// this is not a correct message - it should be already on the list (as it works on web app)
                    'No item or location found with scanned value: jasjfgajfgjsfgj.',
                    'Items scanned Successfully with value: ' + itemData2.serialNumber + '.'])
            let  scanTime = helper.setDate(C.currentDateTimeFormat)
            ui.barcodeScanner.verifyNumberOfReturnedResults('2', true)
                .verifyItemValues(itemData1)
                .verifyItemValues(itemData2)
                .goTo('history')
                .verifyNumberOfReturnedResults('4')
                .verifyTextOnScanHistoryRecord(0, S.selectedEnvironment.barcodes[1], 'Items', itemData2.location, itemData2.description, scanTime, 'Scanned')
                .verifyErrorMessageOnScanHistory('jasjfgajfgjsfgj', 'No item or location found with scanned value: jasjfgajfgjsfgj.')
                .verifyTextOnScanHistoryRecord(2, S.selectedEnvironment.barcodes[0], 'Items', itemData1.location, itemData1.description, scanTime, 'Scanned')
                .verifyTextOnScanHistoryRecord(3, S.selectedEnvironment.barcodes[0], 'Items', itemData1.location, itemData1.description, scanTime, 'Scanned')
        });
    });

        context('3. Scan Containers', () => {
               let legacyBarcode = 'legacyB_' + helper.getRandomNo(5)

                before(async () => {
                    await api.locations.add_storage_location('Container_TA')
                    await api.locations.update_location('Container_TA', 'isContainer', true)
                    await api.locations.update_location('Container_TA', 'legacyBarcode', legacyBarcode)
            });

               it('3.1 Scan Empty Container', () => {
                    let containerLoc = JSON.parse(S.selectedEnvironment.newLocation.locations[0])

                    ui.menu.navigateTo(C.menu.barcodeScanner)
                    ui.barcodeScanner
                        .clickBarcodeButton()
                        .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                        .enterBarcode(containerLoc.barcode)
                        .clickScanButton()
                        .verifyScanMessage(['Container scanned Successfully with value: ' + containerLoc.barcode + '.'])
                    let   scanTime = helper.setDate(C.currentDateTimeFormat)
                    ui.barcodeScanner.verifyNumberOfReturnedResults('1', false, true)
                        .verifyContainerValues(
                            locationLabels,
                            containerLoc.name,
                            '0',
                            containerLoc.barcode,
                           // containerLoc.name,
                            'true',
                            legacyBarcode
                        )
                        .goTo('history')
                        .verifyNumberOfReturnedResults('1')
                        .verifyTextOnScanHistoryRecord(0, containerLoc.barcode, 'Containers', containerLoc.name, 0, scanTime, 'Scanned')

                });

            context('3.2 Scan Container with Item', () => {

            before(async () => {
               D.newItem.barcodes = [{id:0, value:helper.getRandomNo(10)}]
               await api.items.add_new_item(S.selectedEnvironment.newCase, 'Container_TA');
            });

            it('3.2.1 Scan Container Barcode', () => {
                let containerLoc = JSON.parse(S.selectedEnvironment.newLocation.locations[0])

                ui.menu.navigateTo(C.menu.barcodeScanner)
                ui.barcodeScanner
                    .clickBarcodeButton()
                    .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                    .enterBarcode(containerLoc.barcode)
                    .clickScanButton()
                    .verifyScanMessage(['Container scanned Successfully with value: ' + containerLoc.barcode + '.'])
                let   scanTime = helper.setDate(C.currentDateTimeFormat)
                ui.barcodeScanner.verifyNumberOfReturnedResults('1', false, true)
                    .verifyContainerValues(
                        locationLabels,
                        containerLoc.name,
                        '1',
                        containerLoc.barcode,
                       // containerLoc.name,
                        'true',
                        legacyBarcode
                        )
                    .expandContainer(containerLoc.barcode)
                    D.newItem.location = containerLoc.name
                ui.barcodeScanner.verifyItemValues(D.newItem)
                    .goTo('history')
                    .verifyNumberOfReturnedResults('1')
                    .verifyTextOnScanHistoryRecord(0, containerLoc.barcode, 'Containers', containerLoc.name, 1, scanTime, 'Scanned')

            });

            it('3.2.2 Scan Container Legacy Barcode', () => {
                let containerLoc = JSON.parse(S.selectedEnvironment.newLocation.locations[0])

                ui.menu.navigateTo(C.menu.barcodeScanner)
                ui.barcodeScanner
                    .clickBarcodeButton()
                    .verifyMessage('Type or scan an item barcode, location barcode, or item serial number')
                    .enterBarcode(legacyBarcode)
                    .clickScanButton()
                    .verifyScanMessage(['Container scanned Successfully with value: ' + legacyBarcode + '.'])
                let   scanTime = helper.setDate(C.currentDateTimeFormat)
                ui.barcodeScanner.verifyNumberOfReturnedResults('1', false, true)
                    .verifyContainerValues(
                        locationLabels,
                        containerLoc.name,
                        '1',
                        containerLoc.barcode,
                      //  containerLoc.name,
                        'true',
                        legacyBarcode
                    )
                    .expandContainer(containerLoc.barcode)
                D.newItem.location = containerLoc.name
                ui.barcodeScanner.verifyItemValues(D.newItem)
                    .goTo('history')
                    .verifyNumberOfReturnedResults('1')
                    .verifyTextOnScanHistoryRecord(0, legacyBarcode, 'Containers', containerLoc.name, 1, scanTime, 'Scanned')

            });
            });
            });
    });
    });
}









