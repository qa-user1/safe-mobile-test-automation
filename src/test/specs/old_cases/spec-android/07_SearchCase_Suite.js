import AllureReporter from '@wdio/allure-reporter';
import D from '../../../utils/data-provider';
const ui = require('../../../pages/ui-spec');
const p = ui.searchCase;
const m = ui.menuPage;

describe('Search case page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('android', D.domainInfo.apac, D.adminCredentials.admin1);
        m.clickBurgerIcon()
            .openSearchCase();
    }, 1);

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    }, 1);

    it('01. Search page should be loaded properly', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        expect(m.searchPageHeader).toBeDisplayed();
    });

    it('02. Should be able to search for any case', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.resetSearchingParams()
            .fillUserFieldWithPersonName()
            .typeCaseNumber('Case Mobile Test')
            .clickOnSearchButton()
            .searchResultsAreLoaded();
        expect(p.searchResults).toBeDisplayed();
    });

    it('03. Searching parameters and data should be cleared', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.fillUserFieldWithPersonName()
            .typeCaseNumber('Case Mobile Test')
            .resetSearchingParams();
        expect(p.params).not.toBeDisplayed();
    });
});
