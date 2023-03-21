import D from '../utils/data';
import S from '../utils/settings';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';
import C from '../utils/constants';
let el,
    caseField = placeholder => mob.$('//*[@placeholder="' + placeholder + '"]/input')


export default class AddPersonPage  extends BasePage {
    constructor () {
        super();

        if (S.isAndroid()) {
            el = require('./elementSelectors/android/addPersonPage-selectors')
        } else {
            el = require('./elementSelectors/iOS/addPersonPage-selectors')
        }
    }


    populateAllPersonFields (personObject) {
        if (personObject.businessName) this.addBusinessName(personObject.businessName)
        this.addFirstName(personObject.firstName);
        if (personObject.middleName) this.addMiddleName(personObject.middleName);
        this.addLastName(personObject.lastName);
        if (personObject.alias) this.addAlias(personObject.alias);
        if (personObject.driverLicence) this.addDriverLicence(personObject.driverLicence);
        if (personObject.race) this.addRace(personObject.race);
        if (personObject.gender) this.addGender(personObject.gender);
        if (personObject.mobilePhone) this.addMobilePhone(personObject.mobilePhone);
        if (personObject.otherPhone) this.addOtherPhone(personObject.otherPhone);
        if (personObject.email) this.addEmail(personObject.email);

        return this;
    }

                  // ****************** Add To Case ******************

    selectPersonType (personType) {
        this.clickElementByAttribute(C.personFields.personType)
        this.click(personType, true)
        return this;
    }

    selectCase (text) {
        this.selectCaseNumber(text)
    }

    selectCaseAndPersonType (Case, type) {
        this.selectCase(Case)
        this.selectPersonType(type)
        return this;
    }

    clickAddPersonButton () {
        this.setNativeContextIfNeeded(true)
        this.waitAndClick(el.addPersonButton(), true)
        this.returnToWebContext(true)
        return this;
    }


    verifyCaseNumberFieldIsPopulated (caseNumber) {
        this.verifyElementByText(caseNumber);
        return this;
    }

    verifySaveButtonIsEnabled () {
        this.verifyButtonIsEnabled(C.buttons.save)
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


