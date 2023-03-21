import D from '../utils/data';
import C from '../utils/constants';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';
import S from '../utils/settings';
let el,
    actionList = e => mob.$('//*[@color="light"]'),
    barcodeButton = e => mob.$('//*[@name="barcode"]'),
    transactionButton = e => mob.$('//*[@color="energized"]'),
    barcodeInput = e => mob.$('//input[@type="text"]'),
    massBarcodeInput = e => mob.$('//textarea'),
    scanButton = e => mob.$('//button//span[text()="Scan"]'),
    scanMessage = index => mob.$$('//*[@class="scan-msg"]')[index],
    itemNumber = number => mob.$('//h2[contains(text(),"Item # ' + number + '")]'),
    containerInfoOnGrid = text => mob.$('//ion-card//ion-col[contains(text(),"' + text + '")]'),
    primaryCaseOnGrid = caseNumber => mob.$('//ion-card//ion-col[contains(text(),"' + caseNumber + '")]'),
    storageLocation = location => mob.$('//ion-row//*[contains(text()," ' + location + '")]'),
    descriptionOnGrid = text => mob.$('//ion-row//*[contains(text(),"' + text + '")]'),
    navbarOption = text => mob.$('//*[@value="' + text + '"]'),
    numberOfReturnedResults = (navbarMenuOption,number) => mob.$('//*[@value="' + navbarMenuOption + '"]//ion-badge[contains(text(),"' + number + '")]'),
    selectedScanType = scanType => mob.$('//*[@value="' + scanType + '"][@aria-pressed="true"]'),
    selectAll = e => mob.$$('//page-scan//ion-buttons//button')[0],
    trashIcon = index => mob.$$('//page-scan//ion-buttons//button')[index],
    clearItemsCheckboxe = index => mob.$$('//*[@class="alert-checkbox-icon"]')[index],
    messageOnScanPage = text => mob.$('//*[contains(text(),"' + text +'")]'),
    scanHistoryRecord = index => mob.$$('//page-scan//ion-card-content')[index],
    massImportCheckbox = e => mob.$('//span[contains(text(),"Mass import")]')


export default class BarcodeScannerPage extends BasePage {

    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/barcodeScannerPage-selectors');
        } else {
            el = require('./elementSelectors/iOS/barcodeScannerPage-selectors');
        }

        super();
    }

    expandContainer (barcode) {
        this.waitLoaderToDisappear()
        containerInfoOnGrid(barcode).waitForDisplayed();
        containerInfoOnGrid(barcode).click();
        return this;
    }

    clickBarcodeButton () {
        this.waitLoaderToDisappear()
        barcodeButton().waitForDisplayed();
        barcodeButton().waitForEnabled();
        barcodeButton().click();
        return this;
    }

    selectMassImport () {
        this.waitLoaderToDisappear()
        massImportCheckbox().waitForDisplayed({timeout:50000});
        massImportCheckbox().waitForEnabled({timeout:50000});
        this.pause(0.3)
        massImportCheckbox().click();
        return this;
    }

    enterBarcode (barcode, isMassScan = false) {
        if(isMassScan){
            this.waitLoaderToDisappear()
            massBarcodeInput().waitForDisplayed({timeout:50000 });
            massBarcodeInput().waitForEnabled();
            this.enterValue(massBarcodeInput(),barcode);
            massBarcodeInput().addValue('Enter')
        }
        else {
        this.waitLoaderToDisappear()
        barcodeInput().waitForDisplayed({timeout:50000 });
        barcodeInput().waitForEnabled();
        this.enterValue(barcodeInput(),barcode);
        }
        return this;
    }

    clickScanButton () {
        this.waitLoaderToDisappear()
        scanButton().waitForDisplayed();
        scanButton().waitForEnabled();
        scanButton().click();
        return this;
    }

    goTo (text) {
        this.waitLoaderToDisappear()
        navbarOption(text).waitForDisplayed();
        navbarOption(text).click()
        return this;
    }

    clearScanList () {
        this.goTo('items')
        if(messageOnScanPage(C.messages.scanPage.itemCurrentOffice).isDisplayed() === false || messageOnScanPage(C.messages.scanPage.itemOtherOffices).isDisplayed() === false){
            this.waitLoaderToDisappear();
            selectAll().waitForDisplayed({timeout:50000});
            selectAll().click()
            trashIcon(1).waitForEnabled({timeout:50000});
            trashIcon(1).click();
            clearItemsCheckboxe(1).waitForDisplayed({timeout:50000});
            clearItemsCheckboxe(1).waitForEnabled({timeout:50000});
            this.pause(0.2)
            clearItemsCheckboxe(0).click();
            this.clickButton('Yes')
        }

        this.goTo('containers')
        if(messageOnScanPage(C.messages.scanPage.containers).isDisplayed() === false){
            this.waitLoaderToDisappear();
            selectAll().waitForDisplayed({timeout:50000});
            selectAll().click();
            trashIcon(1).waitForEnabled({timeout:50000});
            trashIcon(1).click();
            clearItemsCheckboxe(1).waitForDisplayed({timeout:50000});
            clearItemsCheckboxe(1).waitForEnabled({timeout:50000});
            this.pause(0.2)
            clearItemsCheckboxe(1).click();
            this.clickButton('Yes')
        }

        this.goTo('history')
        if(messageOnScanPage(C.messages.scanPage.history).isDisplayed() === false){
            this.waitLoaderToDisappear()
            trashIcon(0).waitForDisplayed({timeout:50000})
            this.pause(0.3)
            trashIcon(0).click()
            this.clickButton('Clear')
        }

        else {}
        return this;
    }

    verifyScanListsAreCleared (itemCurrentOffice, itemOtherOffices, containerMessage, historyMessage) {
        this.waitLoaderToDisappear()
        this.goTo('items')
        this.verifyElementIsVisible(messageOnScanPage(itemCurrentOffice))
        this.verifyElementIsVisible(messageOnScanPage(itemOtherOffices))
        this.goTo('containers')
        this.verifyElementIsVisible(messageOnScanPage(containerMessage))
        this.goTo('history')
        this.verifyElementIsVisible(messageOnScanPage(historyMessage))
        return this;
    }

    verifySelectedScanType (scanType) {
        this.waitLoaderToDisappear()
        selectedScanType(scanType).waitForDisplayed({timeout:50000});
        this.verifyElementIsVisible(selectedScanType(scanType))
        return this;
    }

    verifyScanMessage (message) {
        this.waitLoaderToDisappear()

            let that = this;

           message.forEach(function (arrayElement) {
                if (Array.isArray(arrayElement)) {
                    if (arrayElement[1]) {
                        that.verifyByText(arrayElement[0], arrayElement[1]);
                    }
                } else {
                    if (arrayElement) {
                        that.verifyByText(arrayElement);
                    }
                }
            });
        this.clickButton('ok')
        return this;
    }

    verifyTextOnScanHistoryRecord (index, barcode, type, locationPath, description, date, status) {
        this.waitLoaderToDisappear()
        if(type=== 'Items'){
            this.verifyText(scanHistoryRecord(index), 'Barcode\n' + barcode + '\nType\n' + type +'\nFull Location Path\n'+locationPath+'\nDescription\n'+ description +'\nScan Time\n' + date +'\n' +status)
        }
        else {
        this.verifyText(scanHistoryRecord(index), 'Barcode\n' + barcode + '\nType\n' + type +'\nFull Location Path\n'+locationPath+'\nItems Count\n'+ description +'\nScan Time\n' + date +'\n' +status)
        }
        return this;
    }

    verifyErrorMessageOnScanHistory(barcode, message) {
        this.verifyTextOnMultipleElements([
            'Barcode', barcode
        ])
        this.verifyMessage(message)
        return this;
    }

    verifyNumberOfReturnedResults (numberOfScannedBarcodes, isItem, isContainer) {
        if(isItem){
            this.verifyText(numberOfReturnedResults('items', numberOfScannedBarcodes), numberOfScannedBarcodes)
        }
        else  if(isContainer){
            this.verifyText(numberOfReturnedResults('containers', numberOfScannedBarcodes), numberOfScannedBarcodes)
        }
        else {
            this.verifyText(numberOfReturnedResults('history', numberOfScannedBarcodes), numberOfScannedBarcodes)
        }

        return this;
    }

    verifyItemValues (itemInfo) {
        if(itemInfo.description) this.verifyText(descriptionOnGrid(itemInfo.description), itemInfo.description)

        this.verifyProvidedTextOnMultipleElements([
            [primaryCaseOnGrid(itemInfo.caseNumber), itemInfo.caseNumber],
            [storageLocation(itemInfo.location), itemInfo.location],
        ])

        return this;
    }

    verifyContainerValues (labels, name, itemsCount, barcode, storage, legacyBarcode) {
        this.waitLoaderToDisappear()
        this.verifyProvidedTextOnMultipleElements([
            [containerInfoOnGrid(name), name],
            [containerInfoOnGrid(itemsCount), itemsCount],
            [containerInfoOnGrid(barcode), barcode],
            [containerInfoOnGrid(legacyBarcode), legacyBarcode],
            [containerInfoOnGrid(storage), storage],
        ])
        this.verifyTextOnMultipleElements([labels])

        return this;
    }








        ////////////////////////////////////////// old methods /////////////////////////
    clickOnBarcodeIcon (device) {
        AllureReporter.addStep('Click on Barcode Icon');
        this.switchContextTo('native', device);
        el.barcodeIcon().click();
        this.switchContextTo('web', device);
        el.barcodeInputHeader().waitForDisplayed();
        return this;
    }

    saveButtonIsDisplayed (device) {
        AllureReporter.addStep('Verify save button is displayed');
        this.switchContextTo('native', device);
        el.saveButton().waitForDisplayed();
        return this;
    }

    enteringBarcodeValue (barcode, device) {
        AllureReporter.addStep('Enter Barcode value');
        this.switchContextTo('web', device);
        el.barcodePlaceHolder().setValue(barcode);
        this.switchContextTo('native', device);
        return this;
    }

    clickSaveButton (device) {
        AllureReporter.addStep('Click on save button');
        this.switchContextTo('native', device);
        driver.pause(700);
        // el.saveButton.waitForEnabled()
        el.saveButton().click();
        return this;
    }

    itemIsNotFound (device) {
        AllureReporter.addStep('Verify modal showing item is not found');
        this.switchContextTo('web', device);
        el.itemNotFound().waitForDisplayed();
        return this;
    }

    itemIsFound (device) {
        AllureReporter.addStep('Verify modal showing item is found');
        this.switchContextTo('web', device);
        el.itemFound().waitForDisplayed();
        return this;
    }

    enteringInvalidBarcodeValue (barcode) {
        AllureReporter.addStep('Enter invalid barcode value');
        this.switchContextTo('web', device);
        el.barcodePlaceHolder().setValue(barcode);
        return this;
    }

    selectDesiredBarcode (device) {
        AllureReporter.addStep('Select barcode');
        this.switchContextTo('native', device);
        el.barcodeId().waitForDisplayed();
        el.barcodeId().click();
        el.trashIcon().waitForDisplayed();
        return this;
    }

    actionButtons (device) {
        AllureReporter.addStep('Verify action butttons are displayed');
        this.switchContextTo('native', device);
        el.trashIcon().waitForDisplayed();
        return this;
    }

    clickEditIcon (device) {
        AllureReporter.addStep('Click on edit icon');
        this.switchContextTo('native', device);
        el.editIcon().click();
        return this;
    }

    selectMoveItemOption (device) {
        AllureReporter.addStep('Select move item option');
        this.switchContextTo('web', device);
        el.moveItem().waitForDisplayed();
        el.moveItem().click();
        el.moveItemHeader().waitForDisplayed();
        return this;
    }

    typeLocationName (device) {
        AllureReporter.addStep('Enter location name');
        this.switchContextTo('native', device);
        el.storageLocation().setValue('sh');
        browser.pause(3000);
        driver.hideKeyboard();
        mob.$('android=.textContains(\"' + D.storage + '\")');
        mob.$('android=.textContains(\"' + D.storage + '\")').click();
        return this;
    }

    typeNote (device) {
        AllureReporter.addStep('Type a note');
        this.switchContextTo('native', device);
        el.noteInput().setValue('Mobile Automation test');
        driver.hideKeyboard();
        return this;
    }

    clickOnSignatureButton (device) {
        AllureReporter.addStep('Click on signature button');
        this.switchContextTo('native', device);
        el.signatureIcon().click();
        this.switchContextTo('web', device);
        el.signatureHeader().waitForDisplayed();
        return this;
    }

    writeRequiredSignature (device) {
        AllureReporter.addStep('Write required signature');
        this.switchContextTo('web', device);
        $('.signature-pad-landscape').click();
        driver.touchPerform([
            { action: 'press', options: { x: 448, y: 547 } },
            { action: 'moveTo', options: { x: 529, y: 362 } },
            { action: 'release' }
        ]);
        return this;
    }

    clickDoneButton (device) {
        AllureReporter.addStep('Click on done button');
        this.switchContextTo('native', device);
        el.DoneButton().click();
        return this;
    }

    signatureIsApplied (device) {
        AllureReporter.addStep('Verify signature is applied');
        this.switchContextTo('native', device);
        el.signatureApplied().waitForDisplayed();
        expect(el.signatureApplied()).toBeDisplayed();
        return this;
    }

    saveChange (device) {
        AllureReporter.addStep('Click on save button');
        this.switchContextTo('native', device);
        el.trueIcon().click();
        return this;
    }

    itemIsSuccessfllyMoved (device) {
        AllureReporter.addStep('Verify item is successfully moved');
        this.switchContextTo('native', device);
        el.barcodeId().waitForDisplayed();
        return this;
    }

    selectItemAndClickDelete (device) {
        AllureReporter.addStep('Select and item then click on delete button');
        this.switchContextTo('web', device);
        $("//h2[text()='Item # 2/1']").click();
       // $("//h2[text()='Item # 3/2']").click(); for IOS
        this.switchContextTo('native', device);
        el.trashIcon().click();
        if (el.clearModal().isDisplayed() === true) {
            if (el.currentOffice().isEnabled() === true) {
                el.currentOffice().click();
            } else {
                if (el.otherOffices().isEnabled() === true) {
                    el.otherOffices().click();
                }
            }
            el.yesButton().click();
        } else {
            el.trashIcon().click();
            el.clearModal().waitForDisplayed();
            if (el.currentOffice().isEnabled() === true) {
                el.currentOffice().click();
            } else {
                if (el.otherOffices().isEnabled() === true) {
                    el.otherOffices().click();
                }
            }
            el.yesButton().click();
        }
        return this;
    }

    barcodeIdIsRemoved (device) {
        AllureReporter.addStep('Verify barcode has been removed');
        this.switchContextTo('web', device);
        el.barcodeID().waitForDisplayed({ reverse: true });
        return this;
    }
}
