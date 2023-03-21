import D from '../utils/data';
import S from '../utils/settings';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';
import C from '../utils/constants';
import { assert, expect } from 'chai';
let el,
    personIcon = e => mob.$('//*[@name="person"]'),
    tabs = text => mob.$('//page-person-view//span[text()="'+ text + '"]'),
    historyContainer = index => mob.$$('//page-person-history//ion-card-content')[index],
    personValue = text => mob.$('//page-person-basic//ion-col[contains(text(),"' + text + '")]'),
    editPerson = e => mob.$('//page-person-basic//button[@color="primary"]//*[@name="close"]'),
    textInHistoryTableRow = text => mob.$('//page-person-history-details//ion-row//ion-col[contains(text(),"'+ text +'")]'),

                             ///// Addresses //////
    addressTypeIcon = text => mob.$('//ion-badge[text()="'+ text + '"]'),
    addressContainer = text => mob.$('//page-address-list//*[@class="input-wrapper"]'),
    noAddressBadge = text => mob.$('//ion-badge[text()="(No addresses)"]'),
    textOnAddressCard = text => mob.$('//ion-col[2]//div[text()="'+ text + '"]'),
    addAddressButton = text => mob.$('//page-address-list//button[@color="primary"]//*[@name="close"]'),
    setAsDefaultButton = index => mob.$$('//button//*[@name="pin"]')[index],
    deleteAddressButton = index => mob.$$('//button//*[@name="trash"]')[index],
    mapIcon = e => mob.$('//*[@name="map"]'),
    addressInputField = index => mob.$$('//address//input')[index],
    clearIcon = index => mob.$$('.text-input-clear-icon')[index]

export default class PersonPage  extends BasePage {
    constructor () {
        super();

        if (S.isAndroid()) {
            el = require('./elementSelectors/android/addPersonPage-selectors')
        } else {
            el = require('./elementSelectors/iOS/addPersonPage-selectors')
        }
    }

    selectPersonTab(text) {
        this.waitLoaderToDisappear()
        tabs(text).waitForEnabled()
        this.pause(0.3)
        tabs(text).click()
        return this;
    }

    goToPersonViewPage() {
        this.waitLoaderToDisappear()
        personIcon().waitForEnabled()
        personIcon().click()
        return this;
    }

    clickEditPersonButton() {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        editPerson().click()
        return this;
    }

    goToHistoryViewPage(lastCreatedRecord, previouslyCreatedRecord) {
        let index
        this.waitLoaderToDisappear()
        if (lastCreatedRecord) index = 0
        else index = lastCreatedRecord + previouslyCreatedRecord
        historyContainer(index).waitForDisplayed({timeout: 30000})
        historyContainer(index).waitForEnabled({timeout: 30000})
        historyContainer(index).click()
        return this;
    }

    editAllPersonFields (personObject) {
        if (personObject.businessName) this.addBusinessName(personObject.businessName, true)
        this.addFirstName(personObject.firstName, true);
        if (personObject.middleName) this.addMiddleName(personObject.middleName, true);
        this.addLastName(personObject.lastName, true);
        if (personObject.alias) this.addAlias(personObject.alias, true);
        if (personObject.driverLicence) this.addDriverLicence(personObject.driverLicence, true);
        if (personObject.race) {
            this.addRace(personObject.race);
            this.clickButton(C.buttons.ok)
        }
        if (personObject.gender) {
            this.addGender(personObject.gender);
            this.clickButton(C.buttons.ok)
        }
        if (personObject.mobilePhone) this.addMobilePhone(personObject.mobilePhone, true);
        if (personObject.otherPhone) this.addOtherPhone(personObject.otherPhone, true);
        //  if (personObject.email) this.addEmail(personObject.email);

        return this;
    }

    ////////////////////// Addresses ////////////////////
    clickAddAddressButton() {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        addAddressButton().click()
        return this;
    }

    clearAddressInputFields() {
        this.pause(0.3)
        for(let i=0; i<4; i++){
            addressInputField(i).waitForDisplayed({timeout:50000})
            addressInputField(i).click()
            clearIcon(i).waitForDisplayed({timeout:50000})
            clearIcon(i).click()
        }
        return this;
    }

    editAddress(data) {
        this.waitLoaderToDisappear()
        mapIcon().click()
        this.clearAddressInputFields()
        this.populateAddressFields(data)
        return this;
    }

    setAddressAsDefault(data, addressIndex=1) {
        this.waitLoaderToDisappear()
        this._________NATIVE_CONTEXT_________()
        this.swipe(el.addrsLine1(data.line1), el.addrsType(data.addressType.toUpperCase()))
        this._________WEB_CONTEXT_________()
        setAsDefaultButton(addressIndex).click()
        return this;
    }

    deleteAddress(data, addressIndex) {
        this.waitLoaderToDisappear()
        this._________NATIVE_CONTEXT_________()
        this.swipe(el.addrsType(data.addressType.toUpperCase()), el.addrsLine1(data.line1))
        this._________WEB_CONTEXT_________()
        deleteAddressButton(addressIndex).click()
        return this;
    }

    verifyAddressType(object) {
        addressTypeIcon(object.addressType).waitForDisplayed()
        this.verifyExactText(addressTypeIcon(object.addressType), object.addressType.toUpperCase())
        return this;
    }

    verifyAddressValue(text, index) {
        assert.strictEqual(textOnAddressCard(text, index).getText(), text);
        return this;
    }

    verifyPersonHasNoAddress(text) {
        this.waitLoaderToDisappear();
        this.verifyExactText(noAddressBadge(), text);
        return this;
    };


    verifyPersonRequiredFields(personInfo) {
        this.waitLoaderToDisappear()
        this.verifyExactText(personValue(personInfo.firstName), personInfo.firstName)
        this.verifyExactText(personValue(personInfo.lastName), personInfo.lastName)
        return this;
    }

    verifyValueOnHistoryPage(text) {
        assert.strictEqual(textInHistoryTableRow(text).getText(), text);
        return this;
    }

    verifyMultipleValuesOnPersonGrids (valuesOrElementValuePairs, isAddress = false) {

        let that = this;

        valuesOrElementValuePairs.forEach(function (arrayElement) {
            if(isAddress){
            if (Array.isArray(arrayElement)) {
                if (arrayElement[1]) {
                    that.verifyAddressValue(arrayElement[0], arrayElement[1]);
                }
            }}
            else {
                if (Array.isArray(arrayElement)) {
                    if (arrayElement[1]) {
                        that.verifyValueOnHistoryPage(arrayElement[0], arrayElement[1]);
                    }
                }
            }
        });
        return this;
    };

    verifyAllAddressValues(addressInfo) {
        this.verifyAddressType(addressInfo)
        this.verifyMultipleValuesOnPersonGrids([
                addressInfo.line1,
                addressInfo.city,
                addressInfo.zip
            ], true
        );
        this.verifyExactText(textOnAddressCard(addressInfo.city), addressInfo.city + ', ' + addressInfo.stateWithoutPrefix)
        return this;
    }

    verifyAllValues (personInfo) {
        this.verifyTextOnMultipleElements(
            [
               // '',
                personInfo.businessName,
                personInfo.firstName,
                personInfo.lastName,
                personInfo.middleName,
                personInfo.alias,
                personInfo.driverLicence,
                personInfo.race,
                personInfo.gender,
                personInfo.mobilePhone,
                personInfo.otherPhone
            ]
        );
        return this;
    }

    verifyAllValuesInHistory (personInfo) {
        this.verifyMultipleValuesOnPersonGrids(
            [
                personInfo.updateMadeBy,
                personInfo.updateDate,
                personInfo.businessName,
                personInfo.firstName,
                personInfo.lastName,
                personInfo.middleName,
                personInfo.alias,
                personInfo.driverLicence,
                personInfo.race,
                personInfo.gender,
                personInfo.mobilePhone,
                personInfo.otherPhone,
                personInfo.email,
            ]
        );
        return this;
    }




//////////////////////////////////////////////////////////////////////////////
    fillRequiredField (name, device) {
        AllureReporter.addStep('Fill all required fields business name, first/last name, reace menu..etc');
        this.switchContextTo('native', device);
        el.businessName().setValue(name);
        el.firstName().setValue('amr');
        el.lastName().setValue(name);
        el.alias().setValue('Au' + name);
        driver.hideKeyboard();
        this.switchContextTo('web', device);
        browser.pause('500');
        this.switchContextTo('native', device);
        el.driverLicense().setValue(D.driverLicense);
        this.switchContextTo('web', device);
        el.raceMenu().click();
        this.switchContextTo('native', device);
        el.raceItem().waitForDisplayed();
        browser.pause('500');
        el.raceItem().click();
        this.switchContextTo('web', device);
        $("//span[text()='African American or Black']").waitForDisplayed({ reverse: true });
        browser.pause('500');
        el.gender().click();
        this.switchContextTo('native', device);
        el.male().waitForDisplayed();
        el.male().click();
        this.switchContextTo('native', device);
        browser.scrollAndClick('.className("android.view.View")', '.text("ADD TO CASE")');
        this.switchContextTo('web', device);
        browser.$$('.text-input')[13].setValue('Case Mobile Test');
        this.switchContextTo('native', device);
        driver.hideKeyboard();
        el.firstCase().waitForDisplayed();
        el.firstCase().click();
        this.switchContextTo('web', device);
        browser.$('//*[@formcontrolname="personTypeId"]/../..').click();
        $("//*[contains(text(),'" + D.personType + "')]").waitForDisplayed();
        this.switchContextTo('native', device);
        browser.scrollAndClick('.className("android.view.View")', '.textContains("' + D.personType + '")');

        // $("//*[contains(text(),'"+D.personType+"')]").click()
        return this;
    }

    fillRequiredFieldIOS (firstName, lastName, license, device) {
        AllureReporter.addStep('Fill all required fields business name, first/last name, reace menu..etc');
        this.switchContextTo('native', device);
        this.businessName.setValue('busi' + firstName);
        this.firstName.setValue(firstName);
        this.lastName.setValue(lastName);
        this.alias.setValue('Au' + lastName);
        driver.hideKeyboard();
        this.switchContextTo('web', device);
        browser.pause('500');
        this.switchContextTo('native', device);
        this.driverLicense.setValue(license);
        this.switchContextTo('web', device);
        this.raceMenu.click();
        this.switchContextTo('native', device);
        this.raceItem(D.raceType).waitForDisplayed();
        browser.pause('500');
        this.raceItem(D.raceType).click();
        this.switchContextTo('web', device);
        $("//span[text()='African American or Black']").waitForDisplayed({ reverse: true });
        browser.pause('500');
        this.gender.click();
        this.switchContextTo('native', device);
        this.male.waitForDisplayed();
        this.male.click();
        this.switchContextTo('web', device);
        this.addressType.forceClick();
        this.homeAddress.waitForEnabled();
        this.homeAddress.forceClick();
        this.address1.setValue('any address ' + D.randomString);
        this.city.setValue('any city' + D.randomString);
        this.state.forceClick();
        this.genericEle(D.state).waitForDisplayed();
        this.genericEle(D.state).click();
        this.postalCode.setValue('post# ' + D.randomString2);
        browser.$$('.text-input')[13].setValue('Case Mobile Test');
        this.switchContextTo('native', device);
        this.firstCase.waitForDisplayed();
        this.firstCase.click();
        this.switchContextTo('web', device);
        this.PersonType.forceClick();
        // browser.$('//*[@formcontrolname="personTypeId"]/../..').click();
        browser.$("//*[contains(text(),'" + D.personType + "')]").waitForDisplayed();
        browser.$("//*[contains(text(),'" + D.personType + "')]").click();
        return this;
    }

    clicksaveButton (device) {
        AllureReporter.addStep('Click on save button');
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        this.switchContextTo('native', device);
        el.saveButton().isEnabled();
        this.switchContextTo('web', device);
        // browser.scrollAndClick('className("android.view.View").index(1)','text("SAVE")')
        $("//button//span[text()='Save']").click();
        return this;
    }

    personIsAdded (device) {
        AllureReporter.addStep('Verify person is added, by redirecting to basic info page');
        this.switchContextTo('native', device);
        el.basicInfo().waitForDisplayed();
        return this;
    }

    clickEditIcon (platform, device) {
        AllureReporter.addStep('Click on edit icon');
        this.switchContextTo('native', device);
        try {
            el.editIcon().waitForDisplayed();
            el.editIcon().click();
        } catch (error) {
            if (platform === 'Android') {
                mob.$('android=.text("Duplicate People Found")').waitForDisplayed();
                mob.$('android=.text("PROCEED ANYWAY")').click();
            } else {
                mob.$('~Duplicate People Found').waitForDisplayed();
                mob.$('~Proceed Anyway').click();
            }
            el.editIcon().waitForDisplayed();
            el.editIcon().click();
        }
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        return this;
    }

    fillPhoneNumber (number, device) {
        AllureReporter.addStep('Fill phone number');
        this.switchContextTo('web', device);
        el.phoneNumber().setValue(number);
        this.switchContextTo('native', device);
        driver.hideKeyboard();
        browser.pause(500);
        return this;
    }

    phone (number) { return $("//*[contains(text(),'" + number + "')]"); }

    personIsEdited (number, device) {
        AllureReporter.addStep('Verify person has been edited');
        this.switchContextTo('native', device);
        el.basicInfo().waitForDisplayed();
        this.switchContextTo('web', device);
        $("//*[contains(text(),'" + number + "')]").isDisplayed();
        return this;
    }
}


