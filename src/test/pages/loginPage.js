import S, { isAndroid } from '../utils/settings';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';

let el,
    emailInput = e => mob.$('//*[@formcontrolname="email"]//input'),
    passwordInput = e => mob.$('//*[@formcontrolname="password"]//input'),
    backIcon = e => mob.$('.back-button')

export default class LoginPage extends BasePage {
    constructor () {
        super();

        if (S.isAndroid()) {
            el = require('./elementSelectors/android/loginPage-selectors');
        } else {
            el = require('./elementSelectors/iOS/loginPage-selectors');
        }
    }

    clickOnSAMLCheckBox (device) {
        AllureReporter.addStep('Enable SAML checkbox');
        this.switchContextTo('web', device);
        el.samlCheckBox().click();
        return this;
    }

    createDomain () {
        this._________WEB_CONTEXT_________()
        //this.waitElementToBeVisible(el.welcomeHeader());
        this.clickButton('Settings')
      //  this.waitAndClick(el.settingsButton());
        this._________NATIVE_CONTEXT_________();
        this.waitAndClick(el.addButton());
        this.waitElementToBeVisible(el.addDomainHeader());
        this.enterValue(el.domainName(), S.domain);
        this.enterValue(el.domainUrl(), S.api_url);
        this.enterValue(el.domainMediaUrl(), S.media_api_url);
        this.waitAndClick(el.trueIcon());
        return this;
    }

    logIn (credentials) {
        if (!S.isDebuggingMode()) {
            if (S.isAndroid()) {
                this._________WEB_CONTEXT_________()
                this.cleanUp()
                this.enterValue(emailInput(), credentials.email);
                this.enterValue(passwordInput(), credentials.password);
                this.pause(0.3)
                this.clickButton('Login');
            }
            else {
                this._________NATIVE_CONTEXT_________();
                this.clickElementIfVisible(el.backButton());
                this.enterValue(el.emailInput(), credentials.email);
                this.enterValue(el.passwordInput(), credentials.password);
                this.waitAndClick(el.loginButton());
            }
         /*   try {
                this.waitElementToBeVisible(el.userLoggedInAlert(), true, false, 5000);
                this.waitAndClick(el.okButton());
                this.waitElementToBeVisible(el.homePageHeader());
            } catch (error) {
                console.log('No user alert modal');
            }*/
            this._________WEB_CONTEXT_________();
        }
        return this;
    }

    openDomainList () {
        el.domainHolder().click();
        browser.pause(500);
        if (el.domainList([0]).isDisplayed() === true) {
            console.log('list appeared');
        } else {
            el.domainHolder().click();
            el.domainList([0]).waitForDisplayed();
            // el.domainList().isDisplayed(); IOS
        }
        return this;
    }

    switchDomain (device) {
        el.settingsButton().click();
        el.settingsPage().waitForDisplayed();
        this.openDomainList();
        el.developmentRadioButton().click();
        el.okButton().click();

        return this;
    }

    domainIsSwitched (device) {
        this.switchContextTo('web', device);
        if (el.unhandeldError().isDisplayed() === true) {
            this.switchContextTo('native', device);
            el.okButton();
        }
        this.switchContextTo('native', device);
        el.DomainButton().click();
        this.switchContextTo('web', device);
        el.DomainList().waitForDisplayed();
        el.penTestRadiobutton().click();
        this.switchContextTo('native', device);
        el.okButton().click();
        this.switchContextTo('web', device);
        return this;
    }

    deleteDomain (device) {
        this.switchContextTo('web', device);
        browser.pause(2000);
        if (el.unhandeldError().isDisplayed() === true) {
            browser.pause(1000);
            this.switchContextTo('native', device);
            el.okButton();
        }
        el.settingsButton().click();
        this.switchContextTo('web', device);
        el.DeleteButton().waitForDisplayed();
        this.switchContextTo('native', device);
        el.DeleteButton().click();
        //  el.okButton().click();
        return this;
    }

    domainIsRemoved (device) {
        if (el.unhandeldError().isDisplayed() === true) {
            browser.pause(1000);
            this.switchContextTo('native', device);
            el.okButton();
        }
        browser.pause(1000);
        this.switchContextTo('web', device);
        return this;
    }

    clickOnForgetPassLink (device) {
        this.switchContextTo('native', device);
        el.forgetPassLink().waitForDisplayed();
        el.forgetPassLink().click();
        el.passwordResetPage().waitForDisplayed();
        return this;
    }

    recaptchaModelIsVisible (device) {
        this.switchContextTo('web', device);
        el.recaptchaModal().waitForDisplayed();
        return this;
    }

    loginWithCred (credentials, device) {
        this.switchContextTo('native', device);
        el.emailInput().setValue(credentials.email);
        mob.hideKeyboard();
        if (credentials.password !== '') {
            el.passwordInput().setValue(credentials.password);
            mob.hideKeyboard();
            el.loginButton().waitForEnabled();
            el.loginButton().click();
            el.errorNotification().waitForDisplayed({ timeout: 10000 });
        } else {
            console.log('no password input');
        }
        return this;
    }

    Login (credentials, device) {
        this.switchContextTo('native', device);
        el.emailInput().setValue(credentials.email);
        //mob.hideKeyboard();
        el.passwordInput().setValue(credentials.password);
        // mob.hideKeyboard();
        el.loginButton().waitForEnabled();
        el.loginButton().click();
        return this;
    }

    loginWithCredIOS (credentials, device) {
        AllureReporter.addStep('Fill user credential');
        this.switchContextTo('native', device);
        el.emailInput().setValue(credentials.email);
        driver.hideKeyboard();
        if (credentials.password !== '') {
            el.passwordInput().setValue(credentials.password);
            driver.hideKeyboard();
            el.loginButton().waitForEnabled();
            el.loginButton().click();
            this.switchContextTo('web', device);
            try {
                el.errorNotification().waitForDisplayed({ timeout: 1000 });
            } catch (error) {
                this.switchContextTo('native', device);
                el.loginButton().click();
                this.switchContextTo('web', device);
                el.errorNotification().waitForDisplayed({ timeout: 10000 });
            }
        } else {
            console.log('Password exists');
        }
        return this;
    }
}
