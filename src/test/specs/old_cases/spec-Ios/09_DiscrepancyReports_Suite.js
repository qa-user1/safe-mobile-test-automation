import p from '../../pages/Ios-fdf/discrepancyReportsPage';
import m from '../../pages/Ios-fdf/menu';
import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';

describe('Discrepancy reports Page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('IOS', 'akamel+1@trackerproducts.com');
    });

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
        driver.pause(1000);
    });

    context('Discrepancy report Functionalities', () => {
        it('01. Should be able to add new discrepancy report', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            m.clickBurgerIcon()
                .openDiscrepancyReportsPage();
            p.clickAddButton()
                .typeReportName(`Report - ${D.randomString}`)
                .selectStorageLocation()
                .clickStartButton()
                .waitForReportToBeLoaded();
            expect(p.scanningItem).toBeDisplayed();
            p.clickRunStartButton();
            expect(p.createdReport).toBeDisplayed();
        });

        it('02. Should be able to search by name for last created repory', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            m.clickBurgerIcon()
                .openDiscrepancyReportsPage();
            p.searchByName(`Report - ${D.randomString}`);
            expect($(`~Report - ${D.randomString}`)).toBeDisplayed();
        });
    });

    it('03. Should be finite loading on Discrepancy Reports search box', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openDiscrepancyReportsPage();
        p.searchByName(`Report - ${D.randomString}`);
        expect(p.loadingSpinner).not.toBeDisplayed();
    });
});
