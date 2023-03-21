import p from '../../../pages/desktopApp';
import D from '../../../utils/data-provider';
import { assert } from 'chai';
import AllureReporter from '@wdio/allure-reporter';

describe('Cross platform testing', () => {
    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    }, 1);

    before(() => {
        p.CreateDomain(Apac, D.domainInfo.apac, D.adminCredentials.admin1);
        p.loginToWebApp(D.adminCredentials.admin2);
    }, 1);

    it('01. Login page is loaded properly on desktop browser', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        chromeDesktop.$('h2=Welcome').waitForDisplayed();
    });

    it('02. Cases created on mobile app should be visible on web APP', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.clickBurgerIcon()
            .openAddCaseTab()
            .fillCaseNumberAndOffenseType()
            .submitCase()
            .fillCaseOfficerName('Amr Kamel', 'person Amr Kamel (akamel+1@trackerproducts.com)')
            .enterAddressAndTag()
            .fillDescriptionAndOffenseDate()
            .saveTheTemplate()
            .caseIsSuccessfullyCreated()
            .searchForLastCreatedCase();
        assert.isTrue(p.theNewCase.isDisplayed());
    });

    it('03. Cases created on web app should be visible on mobile APP', () => {
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
