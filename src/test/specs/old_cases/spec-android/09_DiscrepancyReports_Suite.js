import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';
const ui = require('../../../pages/ui-spec');
const p = ui.discrepancyReport;
const m = ui.menuPage;

describe('Discrepancy reports Page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('android', D.domainInfo.apac, D.adminCredentials.admin1);
        m.clickBurgerIcon()
            .openDiscrepancyReportsPage();
    }, 1);

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
        browser.switchContextTo('native');
    }, 1);

    it('01. Should be able to add new discrepancy report', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.clickAddButton()
            .typeReportName(`Report - ${D.randomString}`)
            .selectStorageLocation()
            .clickStartButton()
            .waitForReportToBeLoaded();
        expect(p.scanningItem).toBeDisplayed();
        p.clickRunStartButton();
        expect(p.createdReport).toBeDisplayed();
    });

    it('02. Should be able to search by name for last created report', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.searchByName(`Report - ${D.randomString}`);
        expect($('android=.text("Report - ' + D.randomString + '")')).toBeDisplayed();
    });

    xit('03. Should be able to add note for an item in the discrepancy report', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
    });

    it('04. Should be finite loading on Discrepancy Reports search box', () => {
        p.searchByName(`Report - ${D.randomString}`);
        expect(p.loadingSpinner).not.toBeDisplayed();
    });
});
