import assert from 'chai';
import D from '../utils/data';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';
let el;
export default class DesktopAppPage extends BasePage {
    constructor (platform) {
        super();

        if (platform === 'Android') {
            el = require('./elementSelectors/android/desktopApp-selectors')
        } else {
            el = require('./elementSelectors/iOS/desktopApp-selectors')
        }
    }

    CreateDomain (domainInfo) {
        AllureReporter.addStep('Create pentest/apac domain');
        el.welcomeHeader().waitForDisplayed();
        el.settingsButton().waitForDisplayed({ timeout: 20000 });
        el.settingsButton().click();
        el.addButton().waitForDisplayed();
        el.addButton().click();
        el.addDomainHeader().waitForDisplayed();
        el.domainName().waitForEnabled();
        el.domainName().setValue(domainInfo.domainName);
        el.domainUrl().clearValue();
        el.domainUrl().setValue(domainInfo.domainUrl);
       // mob.hideKeyboard();
        el.domainMediaUrl().clearValue();
        el.domainMediaUrl().setValue(domainInfo.domainMediaUrl);
        el.trueIcon().waitForEnabled();
        el.trueIcon().click();
        return this;
    }

    LoginWith (credentials, device) {
        AllureReporter.addStep('Fill user credential and click on login button on mobile app');
        this.switchContextTo('web', device);
        mob.refresh();
        this.switchContextTo('native', device);
        el.email().setValue(credentials.email);
        mob.hideKeyboard();
        el.password().setValue(credentials.password);
        try {
            mob.hideKeyboard();
        } catch (error) {
            console.log('keyboard wasnt already present');
        }
        el.LoginButton().waitForEnabled();
        el.LoginButton().click();
        browser.pause(1000);
        this.switchContextTo('web', device);
        try {
            el.userLoggedInAlert().waitForDisplayed({ timeout: 10000 });
            this.switchContextTo('native', device);
            browser.pause(1000);
            el.okButton().click();
            el.homePageHeader().waitForDisplayed();
        } catch (error) {
            console.log('No user alert modal');
        }

        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            browser.waitUntil(() => {
                return el.loadingWindow().map(() => el.loadingWindow().waitForDisplayed({ reverse: true })).length > 1;
            });
            this.switchContextTo('native', device);
            el.homePageHeader().waitForDisplayed();
        }
        // try {
        //     this.switchContextTo('web', device)
        //     el.photoErrorToastMsg().isEnabled()
        //     el.photoErrorToastMsg().waitForDisplayed({reverse:true})
        // } catch (error) {
        //     console.log(error)
        // }
        return this;
    }

    clickBurgerIcon (device) {
        AllureReporter.addStep('Click on burger icon on mobile app');
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        this.switchContextTo('native', device);
        try {
            el.burgerIcon().waitForDisplayed({ timeout: 20000 });
            el.burgerIcon().click();
        } catch (error) {
            el.burgerIcon().waitForDisplayed({ timeout: 20000 });
            el.burgerIcon().click();
        }
        return this;
    }

    fillCaseNumberAndOffenseType (device) {
        AllureReporter.addStep('Fill case number and select offense type on mobile app');
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        this.switchContextTo('native', device);
        el.caseNumberField().setValue(D.caseName);
        try {
            mob.hideKeyboard();
        } catch (error) {
            console.log('keyboard wasnt already present');
        }
        el.offenseTypeMenuButton().click();
        el.offenseItem().waitForEnabled();
        el.offenseItem().click();
        return this;
    }

    submitCase (device) {
        AllureReporter.addStep('Click on submit button on mobile app');
        this.switchContextTo('native', device);
        el.startButton().waitForEnabled();
        el.startButton().click();
        return this;
    }

    fillCaseOfficerName (name, officerName, device) {
        AllureReporter.addStep('Fill case officer name on mobile app');
        this.switchContextTo('native', device);
        mob.$('android=.text("Basic Info")').waitForDisplayed({ timeout: 20000 });
        el.caseOfficerName().setValue(name);
        mob.hideKeyboard();
        el.amrCaseOfficer(officerName).waitForDisplayed();
        el.amrCaseOfficer(officerName).click();
        return this;
    }

    enterAddressAndTag (device) {
        this.switchContextTo('web', device);
        // offenseLocation().click()
        el.OffenseLocation().click();
        try {
            el.enterAddressHeader().waitForDisplayed();
        } catch (e) {
            el.OffenseLocation().click();
        }
        this.switchContextTo('native', device);
        el.searchAddressPlaceholder().setValue('sarajevo');
       mob.hideKeyboard();
        el.addressSearchResult().waitForDisplayed();
        el.addressSearchResult().click();
        el.caseOfficerName().waitForDisplayed();
        this.switchContextTo('web', device);
        el.tagFIeld().waitForEnabled();
        el.tagFIeld().setValue(D.caseInformation.CaseTag);
       mob.hideKeyboard();
        return this;
    }

    fillDescriptionAndOffenseDate (device) {
        AllureReporter.addStep('Fill case descrion and offense date on mobile app');
        this.switchContextTo('native', device);
        el.offenseDescription().setValue('Created for testing purposes code: ' + D.randomString);
       mob.hideKeyboard();
        el.offenseDate().click();
        el.offenseDate().click();
        el.doneButton().waitForDisplayed();
        el.doneButton().click();
        return this;
    }

    saveTheTemplate (device) {
        AllureReporter.addStep('Click on save button');
        this.switchContextTo('web', device);
        el.saveButton().waitForEnabled();
        el.saveButton().click();
        return this;
    }

    caseIsSuccessfullyCreated (device) {
        AllureReporter.addStep('Verify case is successfully created on mobile app');
        this.switchContextTo('native', device);
        el.basicInfoHeader().waitForDisplayed();
        el.caseStatus().waitForDisplayed();
        return this;
    }

    openAddCaseTab (platform) {
        AllureReporter.addStep('Navigate to add case page');
        this.switchContextTo('native', platform);
        el.addCaseLink().click();
        if (platform === 'Android') {
            this.switchContextTo('web', platform);
        }
        el.newCaseHeader().waitForDisplayed();
        return this;
    }

    loginToWebApp (credentials) {
        AllureReporter.addStep('Log in web app');
        chromeDesktop.setTimeout({ pageLoad: 70000 });
        el.loginPageTitle().waitForDisplayed();
        el.emailInput().setValue(credentials.email);
        el.passwordInput().setValue(credentials.password);
        el.loginButton().click();
        try {
            el.loginConfirmationModal().waitForDisplayed({ timeout: 7000 });
            chromeDesktop.pause(1000);
            el.yesButton().click();
            el.dashboardHeader().waitForDisplayed();
        } catch (error) {
            el.dashboardHeader().waitForDisplayed();
        }
        return this;
    }

    theNewCase = e => chromeDesktop.$("//input[contains(@title,'" + D.generatedCaseName + "')]");

    searchForLastCreatedCase () {
        AllureReporter.addStep('Search for last created case on we app');
        el.searchField().setValue(D.caseName);
        chromeDesktop.$("//span[text()='" + D.caseName + "']").waitForDisplayed({ timeout: 8000 });
        // chromeDesktop.$("//span[text()='"+D.caseName+"']").isDisplayed(),true
        // expect(chromeDesktop.$("//span[text()='"+D.caseName+"']")).toBeDisplayed()
        // assert.isTrue(chromeDesktop.$("//span[text()='"+D.caseName+"']").isDisplayed())
        chromeDesktop.keys('Enter');
        chromeDesktop.$("//span[text()='Basic Info']").waitForDisplayed();
        el.theNewCase().waitForDisplayed({ timeout: 10000 });
        return this;
    }

    typeCaseNumberAndSelectCaseType () {
        AllureReporter.addStep('Type case number and select case type on web app');
        el.caseNumberInput().setValue(D.caseName2);
        el.caseTypeDropMenu().click();
        el.caseType().waitForDisplayed();
        el.caseType().click();
        return this;
    }

    clickNext () {
        AllureReporter.addStep('Click on next button on web app');
        el.nextButton().waitForEnabled();
        el.nextButton().click();
        return this;
    }

    savedCaseNotification = e => chromeDesktop.$('div=Added new Case: Case Mobile Test - ' + D.generatedCaseName2 + '');

    fillAllRequiredField () {
        AllureReporter.addStep('Fill all required field and click save on web app');
        el.caseOfficerPlaceHolder().setValue('amr');
        el.officerName().waitForDisplayed();
        el.officerName().click();
        el.offenseLocation().setValue('sara');
        el.addressResult().waitForDisplayed();
        el.addressResult().click();
        el.datePicker().click();
        el.todayDate().waitForDisplayed();
        el.todayDate().click();
        el.tags().setValue('automation');
        el.offenseDesc().setValue('Created for automation purposes');
        el.SaveButton().click();
        //el.savedCaseNotification().waitForDisplayed();
        return this;
    }

    openHomePageTab (device) {
        AllureReporter.addStep('Navigate to home page on mobile ap');
        this.switchContextTo('native', device);
        el.homeIcon().click();
        el.homePageHeader().waitForDisplayed();
        return this;
    }

    typeLastCreatedCaseNumber (device) {
        AllureReporter.addStep('Type last created case on search field and verify case is found');
        this.switchContextTo('web', device);
        el.caseSearch().waitForDisplayed();
        el.caseSearch().setValue('Case Mobile Test - ' + D.generatedCaseName2 + '');
        this.switchContextTo('native', device);
        el.caseFound().waitForDisplayed();
        return this;
    }
}
