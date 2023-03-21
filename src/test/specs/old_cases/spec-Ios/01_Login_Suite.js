import AllureReporter from '@wdio/allure-reporter';
const ui = require('../../../pages/ui-spec');
const page = ui.device;
const platform = 'iOS';

describe('Landing Page test suite', () => {
    afterEach(() => {
        ui.app.switchContextTo('web', mob);
        //driver.refresh();
        ui.app.switchContextTo('native', mob);
    });

    xit('01. Verify login page is loaded properly', () => {
        const contexts = driver.getContexts();
        console.log('all _________WEB_CONTEXT_________. ' + contexts);
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('By opening safe App intro page should be loaded with the required input fields');
        AllureReporter.addDescription('Page will be loaded with welcoming header in the top');
        AllureReporter.addStep('Page should be loaded, and welcome header will be visible');
        p.welcomeHeader().waitForDisplayed();
    });

    xit('02. View logged in button should be disabled by default', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('As a user i should see view logged in user button is disabled when no credential');
        AllureReporter.addDescription('No credential will be sent, appium will get button attribute and verify its disabled');
        AllureReporter.addStep('Check if logged user button is disabled');
        p.loggedUserButton.isDisplayed();
        expect(p.loggedUserButton).toBeDisabled();
    });

    xit('03. Should be able to navigate to settings page', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('As a user i should be able to navigate to settings page');
        AllureReporter.addDescription('Settings page should be loaded properly and shows the selected domain details, Add and Delete button');
        AllureReporter.addStep('Click on settings icon');
        p.settingsButton.click();
        AllureReporter.addStep('Setting page has been reloaded, All parameters are visible');
        expect(p.settingsPage).toBeDisplayed();
    });

    xit('04. Should be able to add new domain', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('By opening safe App intro page should be loaded with the required input fields');
        AllureReporter.addDescription('Page will be loaded with welcoming header in the top');
        AllureReporter.addStep('Page should be loaded, and welcome header will be visible');
        p.createPentestDomain('PenTest');
        browser.pause(2000);
        expect(p.DomainName('PenTest')).toBeDisplayed();
    });

    xit('05. Domain settings wont be saved if user click cancel', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('As i user i should be able to switch to another domain by selecting another and click cancel');
        AllureReporter.addDescription('When user click on domain list, a dialog will appear with list of domain, if user click cancel, nothing will change');
        AllureReporter.addStep('Click on settings icon');
        p.settingsButton.click();
        AllureReporter.addStep('Setting page has been reloaded, All parameters are visible');
        p.settingsPage.waitForDisplayed();
        p.DomainName('PenTest').waitForDisplayed();
        AllureReporter.addStep('Open domain list');
        p.openDomainList()
            .localHostRadioButton.click();
        AllureReporter.addStep('Click cancel button');
        p.cancelButton.click();
        AllureReporter.addStep('Identify which domain is selected');
        expect(p.selectedDomain).toHaveText('PenTest');
    });

    xit('06. User should be able to switch domains', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('As a user i should be able to switch between different domain and verify that domain is successfully changed by showing toast message');
        AllureReporter.addDescription('When user switch from one domain to another, toast message will pop up indicating the the switching was successful');
        AllureReporter.addStep('Click on settings icon');
        page(platform).login.switchDomain(mob)
        // p.settingsButton.click();
        // AllureReporter.addStep('Setting page has been reloaded, All parameters are visible');
        // p.settingsPage.waitForDisplayed();
        // p.DomainName('PenTest').waitForDisplayed();
        // p.openDomainList();
        // p.developmentRadioButton.click();
        // p.okButton.click();
        // p.domainIsSwitched();
        //expect(p.domianChangedToastMsg).toBeDisplayed();
       // expect(p.domainPlaceHolder).toHaveText('PenTest');
    });

    it('07. User should be able to delete an existed domain', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('As a user i should be able to delete any exited domain');
        AllureReporter.addDescription('When user delete an exited domian, user wouldnt be able to see it again in domain list');
        AllureReporter.addStep('Click on settings icon');
        // p.settingsButton.click();
        // AllureReporter.addStep('Setting page has been reloaded, All parameters are visible');
        // p.settingsPage.waitForDisplayed();
        AllureReporter.addStep('Click on delete button then ok');
        page(platform).login.deleteDomain(mob);
        AllureReporter.addStep('Domain is successfully removed');
      //  p.domainIsRemoved();
       // expect($('//*[text()="PenTest"]')).not.toBeExisting();
    });

    it('08. Forget password link, should redirects user to proper page', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('As a user i should be able to reset my password by clicking forgot user link');
        AllureReporter.addDescription('When user click on forgot password link, user will be directed to another page where he should enter his email');
        AllureReporter.addStep('Click on forget password link');
        p.clickOnForgetPassLink();
        expect(p.resetButton).toBeDisabled();
    });

    xit('09. Reset password button, should be enbaled when typing email', () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('As a user i should reset my password by typing the account email');
        AllureReporter.addDescription('When user type his email, and solve google security question he would be able to reset his password');
        p.clickOnForgetPassLink()
            .emailPlaceHolder.setValue('anything@email.com');
        p.recaptchaModelIsVisible();
        expect(p.recaptchaModal).toBeExisting();
    });

    xit('10. Should not be able to login with invalid credential', () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('As a user i should reset i shouldnt be able to login with invalid email');
        AllureReporter.addDescription('When user try to login with invalid email, toast message will pop up with proper information');
        p.loginWithCred('invalidEmail@trackerproducts.com', 'test123');
        expect(p.errorNotification).toBeDisplayed();
    });

    xit('11. Login button is disabled when no password in entered', () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('As a user i should not be able to click on login button when no password is provided');
        AllureReporter.addDescription('Login button will be disabled if no password was entered');
        p.loginWithCred('invalidEmail@trackerproducts.com', '');
        expect(p.loginButton).toBeDisabled();
    });

    xit('12. User should be able to enable SAML', () => {
        p.settingsButton.click();
        p.settingsPage.waitForDisplayed();
        p.clickOnSAMLCheckBox();
        expect(p.guidInput).toBeDisplayed();
    });
});
