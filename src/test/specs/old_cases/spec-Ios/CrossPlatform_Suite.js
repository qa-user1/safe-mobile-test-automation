import p from '../../../pages/desktopApp';
import A from '../../../pages/add-case-page';
import l from '../../../pages/loginPage';
import m from '../../../pages/menu';
import { assert } from 'chai';
import AllureReporter from '@wdio/allure-reporter';

require('mocha');

describe('Cross platform testing ', () => {
    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    });

    before(() => {
        browser.LoginToMobileApp('akamel+1@trackerproducts.com');
        p.loginToWebApp('akamel+3@trackerproducts.com');
    });

    it('displays the title on desktop browser', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        chromeDesktop.$('h2=Welcome').waitForDisplayed();
    });

    it('Cases created on mobile app should be visible on web APP', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.clickBurgerIcon()
            .openAddCaseTab()
            .fillCaseNumberAndOffenseType()
            .submitCase()
            .fillCaseOfficerName('Amr org admin', 'person Amr org admin (akamel+1@trackerproducts.com)')
            .enterAddressAndTag()
            .fillDescriptionAndOffenseDate()
            .saveTheTemplate()
            .caseIsSuccessfullyCreated()
            .searchForLastCreatedCase();
        assert.isTrue(p.theNewCase.isDisplayed());
    });

    it('Cases created on web app should be visible on mobile APP', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        chromeDesktop.url('/#/cases/add');
        p.typeCaseNumberAndSelectCaseType()
            .clickNext()
            .fillAllRequiredField();
        assert.isTrue(p.savedCaseNotification.isDisplayed());
        p.clickBurgerIcon()
            .openHomePageTab()
            .typeLastCreatedCaseNumber();
        assert.isTrue(p.caseFound.isDisplayed());
    });
});
