import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import BasePage from '../pages/basePage';
import m from './menu';
import A from './add-case-page';
import AllureReporter from '@wdio/allure-reporter';
import { assert } from 'chai';

let el,
    existingCaseNumber = e => mob.$('//case-select-typeahead//ion-list/button//div//ion-label'),
    //caseNumberField = text => mob.$('//*[contains(text(), "'+ text + '")]')
    caseNumberField = text => mob.$('//*[@placeholder="' + text + '"]//input'),
    currencyTotalRequired = e => mob.$('//p[contains(text(),"Required")]'),
    currencyTotalField = e => mob.$$('//*[@type="number"]//input')[13]

export default class AddItemsPage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/addItemsPage-selectors');
        } else {
            el = require('./elementSelectors/iOS/addItemsPage-selectors');
        }
        super();
    }

    selectRecoveredBy (personObject) {
        this.selectPerson(C.placeholders.addItem.selectPerson, personObject)
        return this;
    }

    selectRecoveryLocation (value) {
        this.enterAddress(C.placeholders.addItem.recoveryLoc, value)
        return this;
    }

    enterDescription (value) {
        this.waitLoaderToDisappear()
        this.enterValueInElementWithPlaceholder(C.placeholders.addItem.itemDescription, value)
        return this;
    }

    enterMake (value) {
        this.waitLoaderToDisappear()
        this.enterValueInElementWithPlaceholder(C.placeholders.addItem.make, value)
        return this;
    }

    enterModel (value) {
        this.waitLoaderToDisappear()
        this.enterValueInElementWithPlaceholder(C.placeholders.addItem.model, value)
        return this;
    }

    enterSerialNumber (value) {
        this.waitLoaderToDisappear()
        this.enterValueInElementWithPlaceholder(C.placeholders.addItem.itemSerialNumber, value)
        return this;
    }

    enterAdditionalBarcode (value) {
        this.waitLoaderToDisappear()
        this.enterValueInElementWithPlaceholder(C.placeholders.addItem.additionalBarcodes, value)
        return this;
    }

    selectPersonInItemBelongsTo (personObject) {
        this.waitLoaderToDisappear()
        this.selectItemBelongsTo(C.placeholders.addItem.itemBelongsTo, personObject)
        return this;
    }

    selectRecoveryDate () {
        this.waitLoaderToDisappear()
        this.clickElementWithPlaceholder(C.placeholders.addItem.selectDate)
        this.clickButton(C.buttons.done);
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    selectCase (caseNumber) {
        this.waitLoaderToDisappear()
        this.clearValue(caseNumberField(C.placeholders.caseSearch))
        this.selectCaseNumber(caseNumber)
        return this;
    }

    populateAllNumberFieldsInCurrencyForm(object) {
        for(let i=0; i<12; i++){
            this.enterValue(mob.$$('//*[@type="number"]//input')[i], object.customCurrencyValue)
            this.pause(0.2)
            if(S.isAndroid()){
                mob.$$('//forms-display//div[@class="input-cover"]')[i+1].click()
            }
        else {
                mob.$$('//*[@type="number"]//input')[i+1].click()
            }
        }
        this.enterValue(mob.$$('//*[@type="number"]//input')[12], object.customCurrencyValue)
        return this;
    }

    verifyCurrencyTotalFieldIsRequired() {
        this.verifyElementIsVisible(currencyTotalRequired())
        return this;
    }

    verifyTotalIsCorrectlyAutoPopulated(object) {
        this.verifyValueOnInputField(currencyTotalField(), object.customCurrencyTotal.toFixed(3))
        return this;
    }

    populateAllFields (object) {
        this._________WEB_CONTEXT_________()
        this.selectOptionOnFirstDropdown(object.category);
        if(object.recoveredBy) this.selectRecoveredBy(object.personObject)
        if(object.recoveryLocation) this.selectRecoveryLocation(object.recoveryLocation)
        if(object.description)  this.enterDescription(object.description);
        if(object.recoveryDate)   this.selectRecoveryDate();
        if(object.make) this.enterMake(object.make);
        if(object.custodyReason)  {
            this.selectCustodyReason(object.custodyReason);
            mob.$('//*[@role="dialog"]').waitForDisplayed({reverse:true});
        }
        if(object.model) this.enterModel(object.model);
        if(object.serialNumber) this.enterSerialNumber(object.serialNumber);
        if(object.additionalBarcode) this.enterAdditionalBarcode(object.additionalBarcode);
        if(object.people)  this.selectPersonInItemBelongsTo(object.personObject)
        if(object.tags[0].name)  this.addTag(object.tags[0].name);
        this.selectStorageLocation(object.location);
        return this;
    }

    verifyCaseNumberFieldIsPopulated (caseNumber) {
        this.verifyText(caseNumberField(caseNumber).getValue(), caseNumber);
        return this;
    }

//////////////////////////////////////////////////////

    editFirstListedItemAndroid (device) {
        AllureReporter.addStep('Edit last created item');
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        try {
            el.firstItem().waitForDisplayed();
            el.firstItem().click();
            if (el.loadingWindow().isDisplayed() === true) {
                el.loadingWindow().waitForDisplayed({ reverse: true });
            }
            el.firstItemHeader().waitForDisplayed();
            this.switchContextTo('native', device);
            el.editIcon().waitForEnabled();
            el.editIcon().click();
            this.switchContextTo('web', device);
            el.custodyReason().click();
            this.switchContextTo('native', device);
            el.custodyReasonMenu().waitForDisplayed();
            el.custodyReasonMenu().click();
            this.switchContextTo('web', device);
            el.okButton().click();
            el.saveButton().waitForEnabled();
            el.saveButton().click();
            this.switchContextTo('native', device);
            el.editIcon().waitForDisplayed();
            this.switchContextTo('web', device);
        } catch {
            console.log('no item available');
        }
        return this;
    }

    editFirstListedItemIOS (device) {
        AllureReporter.addStep('Edit last created item');
        this.switchContextTo('web', device);
        if (el.loadingWindow.isDisplayed() === true) {
            el.loadingWindow.waitForDisplayed({ reverse: true });
        }
        el.firstItem().waitForDisplayed();
        el.firstItem().click();
        this.switchContextTo('native', device);
        el.editIcon().waitForEnabled();
        el.editIcon().click();
        // el.model.click()
        // browser.keys(`${D.randomString}`)
        // this.switchContextTo('web', device)
        // browser.$('//input[@formcontrolname="make"]').setValue(`${D.randomString}`)
        el.model().setValue(`Mobile Automation Test - ${D.randomString}`);
        // browser.$$('.text-input')[8].clearValue()
        // browser.$$('.text-input')[7].addValue(`Mobile Automation Test - ${D.randomString}`)
        this.switchContextTo('native', device);
        if (browser.isKeyboardShown() === true) {
            driver.hideKeyboard();
            console.log('is keyboard shown: ' + browser.isKeyboardShown());
        }
        el.saveButton().waitForEnabled();
        el.saveButton().click();
        el.editIcon().waitForDisplayed();
        return this;
    }

    // only for Android

    openLastCreatedItem (device) {
        AllureReporter.addStep('Edit last created item');
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        try {
            el.firstItem().waitForDisplayed();
            el.firstItem().click();
            if (el.loadingWindow().isDisplayed() === true) {
                el.loadingWindow().waitForDisplayed({ reverse: true });
            }
            el.firstItemHeader().waitForDisplayed();
        } catch {
            console.log('no item available');
        }
        return this;
    }

    duplicateItem (device) {
        AllureReporter.addStep('Click on action icon then duplicate the item');
        this.switchContextTo('native', device);
        el.actionIcon().waitForEnabled();
        el.actionIcon().click();
        el.duplicate().waitForDisplayed();
        el.duplicate().click();
        this.switchContextTo('web', device);
        el.offenseDate().waitForDisplayed();
        var date = el.offenseDate().getText();
        this.switchContextTo('native', device);
        browser.scrollAndClick('.className("android.view.View")', '.text("arrow dropdown")');
        // driver.hideKeyboard()
        this.switchContextTo('web', device);
        browser.$(`//span[text()="${D.storage}"]`).waitForDisplayed();
        browser.$(`//span[text()="${D.storage}"]`).forceClick();
        this.switchContextTo('native', device);
        el.confirmToggle().click();
        this.clickSaveButton();
        el.editIcon().waitForDisplayed();
        m.clickBurgerIcon()
            .openHomePageTab();
        browser.openLastCreatedCase();
        A.clickOnItemIcon();
        this.switchContextTo('web', device);
        el.lastItem().waitForDisplayed();
        el.lastItem().click();
        this.switchContextTo('native', device);
        el.editIcon().waitForDisplayed();
        el.editIcon().click();
        this.switchContextTo('web', device);
        el.offenseDate().waitForDisplayed();
        expect(el.offenseDate()).toHaveText(date);
        return this;
    }

    genericEle (value) {
        return $('//*[contains(text(),"' + value + '")]');
    }
}
