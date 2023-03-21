import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import BasePage from '../pages/basePage';

let el,
    itemNumber = number => mob.$('//h2[contains(text(),"Item # ' + number + '")]'),
    primaryCaseonGrid = caseNumber => mob.$('//ion-card//ion-col[contains(text(),"' + caseNumber + '")]'),
    primaryCase = caseNumber => mob.$('//button//div//ion-label//*[contains(text(),"' + caseNumber + '")]'),
    storageLocation = location => mob.$('//ion-row//*[contains(text()," ' + location + '")]'),
    descriptionOnGrid = text => mob.$('//ion-row//*[contains(text()," ' + text + '")]'),
    valueOnItemView = value => mob.$('//page-item-basic//ion-col[contains(text(),"' + value + '")]'),
    tabs = text => mob.$('//page-item-view//span[text()="'+ text + '"]'),
    currencyTotalField = e => mob.$$('//*[@type="number"]//input')[13],
    editItem = e => mob.$('//page-item-basic//button[@color="primary"]//*[@name="close"]'),
    flashIcon = e => mob.$('//button[@color="energized"]//*[@name="close"]'),
    flashIconOnItemView = e => mob.$('//page-item-basic//button[@color="energized"]//*[@name="close"]'),
    description = e => mob.$('//*[@formcontrolname="description"]//textarea'),
    recoveredBy = e => mob.$('//*[@formcontrolname="name"]//input'),
    clearFieldIcon = index => mob.$$('//button[@clear]')[index],
    modelInput = e => mob.$('//*[@formcontrolname="model"]//input'),
    makeInput = e => mob.$('//*[@formcontrolname="make"]//input'),
    storageLocationField = e => mob.$('//*[@formcontrolname="locationName"]//input'),
    serialNumberInput = e => mob.$('//*[@formcontrolname="serialNumber"]//input'),
    toggleConfirmationButton = e => mob.$('.toggle'),
    itemNo = text => mob.$('//ion-label[contains(text(),"'+ text + '")]'),
    valueOnAddItem = text => mob.$('//page-add-item//*[contains(text(),"' + text + '")]'),
    additionalBarcodeField = text => mob.$('//*[@formcontrolname="barcodes"]'),
    storageLocationArrow = text => mob.$('//button[@item-right]'),
    selectIcon = text => mob.$('//*[@class="select-icon"]'),
    serialNumber

export default class ItemPage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
               el = require('./elementSelectors/android/itemPage-selectors');
               serialNumber = e => mob.$('//ion-input[@formcontrolname="serialNumber"]');

        } else {
            el = require('./elementSelectors/iOS/itemPage-selectors');
            serialNumber = e => mob.$('//*[@formcontrolname="serialNumber"]//input');
        }
        super();
    }

    goToItemViewPage () {
        this.waitLoaderToDisappear()
        itemNumber(D.newItem.itemNo).waitForDisplayed({timeout:50000})
        this.pause(0.1)
        itemNumber(D.newItem.itemNo).click();
        return this;
    }

    pressItem (itemNumber) {
        this.waitLoaderToDisappear()
        this.longPress(el.itemNo(itemNumber))
        return this;
    }

    selectItemsTab (text) {
        tabs(text).waitForDisplayed();
        tabs(text).waitForEnabled();
        this.pause(0.5)
        tabs(text).click();
        return this;
    }

    clickEditItemButton () {
        this.waitLoaderToDisappear()
        editItem().click()
        return this;
    }

    clickFlashIcon () {
        this.waitLoaderToDisappear()
        flashIcon().click()
        return this;
    }

    clickFlashIconOnItemView () {
        this.waitLoaderToDisappear()
        flashIconOnItemView().click()
        return this;
    }

    confirmAction () {
        this.waitLoaderToDisappear()
        toggleConfirmationButton().click()
        //workaround to get toggle button enabled
        selectIcon().click()
        this.clickButton('Cancel')
        return this;
    }

    editCategory (object) {
        this.waitLoaderToDisappear()
        this.selectOptionOnFirstDropdown(object, true);
        this.clickButton('OK')
        return this;
    }

    editRecoveredBy (personObject) {
        this.waitLoaderToDisappear()
        this.clearAndEnterValue(recoveredBy(), personObject.firstName)
        this.selectPersonOnTypehaead();
        return this;
    }

    editDescription (value) {
        this.waitLoaderToDisappear()
        description().waitForDisplayed({timeout:5000})
        this.pause(0.2)
        if(S.isIOS()){
            description().click()
        }
        this.enterValue(description(), value)
        return this;
    }

    editMake (value) {
        this.waitLoaderToDisappear()
        makeInput().waitForDisplayed({timeout:5000})
        if(S.isAndroid()) {
            makeInput().setValue('t')
        }
        else {
            this.pause(0.3)
            makeInput().click()
        }
        this.pause(0.5)
        clearFieldIcon(3).click()
        this.pause(0.2)
        this.enterValue(makeInput(), value)
        return this;
    }

    editModel (value) {
        this.waitLoaderToDisappear()
        modelInput().waitForDisplayed({timeout:5000})
        if(S.isAndroid()) {
            modelInput().setValue('t')
        }
      else {
            modelInput().click()
        }
        this.pause(0.5)
        clearFieldIcon(2).click()
        this.pause(0.2)
        this.enterValue(modelInput(), value)
        return this;
    }

    editSerialNumber (value) {
        this.waitLoaderToDisappear()
        serialNumber().waitForDisplayed({timeout:5000})
        serialNumber().click()
        this.pause(0.5)
        clearFieldIcon(1).click()
        this.pause(0.2)
        this.enterValue(serialNumberInput(), value)
        return this;
    }

    editItemBelongsTo (personObject) {
        this.waitLoaderToDisappear()
        this.selectItemBelongsTo(C.placeholders.addItem.itemBelongsTo, personObject)
        return this;
    }

    selectRecoveryDate () {
        this.waitLoaderToDisappear()
        this.pause(0.3)
        this.clickElementWithPlaceholder(C.placeholders.addItem.selectDate)
        this.clickButton(C.buttons.clear);
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        this.clickElementWithPlaceholder(C.placeholders.addItem.selectDate)
        this.clickButton(C.buttons.done);
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }


    editAllValues (object) {
        this.editCategory(object.category)
        if(object.recoveredBy) this.editRecoveredBy(object.personObject)
        if(object.recoveryLocation) this.editAddress('recoveryLocation', object.recoveryLocation)
        if(object.recoveryDate)   this.selectRecoveryDate();
        if(object.custodyReason) {
            this.selectCustodyReason(object.custodyReason);
            this.clickButton('OK')
            mob.$('//*[@role="dialog"]').waitForDisplayed({reverse:true});
        }
        if(object.serialNumber) this.editSerialNumber(object.serialNumber);
        if(object.model) this.editModel(object.model);
        if(object.make) this.editMake(object.make);
        if(object.description)  this.editDescription(object.editedDescription);
        if(object.people)  this.editItemBelongsTo(object.personObject)
        if(object.tags[0].name)  this.addTag(object.tags[0].name);
        return this;
    }

     verifyValuesOnItemGrid (itemInfo) {
        this.verifyProvidedTextOnMultipleElements([
            [itemNumber(itemInfo.itemNo), 'ITEM # ' + itemInfo.itemNo],
            [primaryCaseonGrid(itemInfo.caseNumber), itemInfo.caseNumber],
        ])
        this.verifyText(storageLocation(itemInfo.location), itemInfo.location)
        if(itemInfo.description) this.verifyText(descriptionOnGrid(itemInfo.description), itemInfo.description)

        return this;
    }


    verifyAllValues (itemInfo) {
        this.verifyText(primaryCase(itemInfo.caseNumber), itemInfo.caseNumber);
        this.verifyText(valueOnItemView(itemInfo.status), itemInfo.status);
        this.verifyText(valueOnItemView(itemInfo.location), itemInfo.location);

        this.verifyTextOnMultipleElements(
            [
                itemInfo.recoveryLocation,
               // itemInfo.recoveryDate,
                itemInfo.recoveredByName,
                itemInfo.submittedByName,
                itemInfo.category,
                itemInfo.custodyReason,
                itemInfo.serialNumber,
                itemInfo.make,
                itemInfo.model,
                itemInfo.description,
            ],
        );
        return this;
    }

    verifyAllValuesOnItemAddPage (itemInfo, itemNumber) {
        this.verifyTextOnMultipleElements(
            [
                itemInfo.recoveryLocation,
                // itemInfo.recoveryDate,
                itemInfo.recoveredByName,
                itemInfo.submittedByName,
                itemInfo.serialNumber,
                itemInfo.make,
                itemInfo.model,
            ],
        );
        this.verifyProvidedTextOnMultipleElements([
            [valueOnAddItem(itemInfo.category), itemInfo.category],
            [valueOnAddItem(itemInfo.custodyReason), itemInfo.custodyReason],
           // [storageLocationField(), itemInfo.location] include this one when #10754 gets fixed
        ]);
        this.verifyText(itemNo(itemNumber), itemNumber)
        if (itemInfo.description) this.verifyValueOnInputField(description(), itemInfo.description)

        return this;
    }

    verifyAllCustomValuesInCurrencyForm (object) {
        for(let i=0; i<13; i++){
            this.verifyValueOnInputField(mob.$$('//*[@type="number"]//input')[i], object.customCurrencyValue)
        }
        this.verifyValueOnInputField(currencyTotalField(), object.customCurrencyTotal.toString())
        return this;
    }

    verifyStorageLocationOnTheGrid (itemInfo) {
        this.waitLoaderToDisappear()
        this.pause(0.3)
        this.verifyText(storageLocation(itemInfo), itemInfo)
        return this;
    }

    verifyValuesOnItemView (location, status, custodian) {
        this.waitLoaderToDisappear()
        this.pause(0.3)
        this.verifyText(valueOnItemView(location), location)
        if(status){
            this.verifyText(valueOnItemView(status), status)
        }
        if(custodian){
            this.verifyText(valueOnItemView(custodian.name), custodian.name)
        }
        return this;
    }

}
