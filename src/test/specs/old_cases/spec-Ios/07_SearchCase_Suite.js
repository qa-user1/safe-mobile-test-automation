import p from '../../../pages/search-case-page';
import m from '../../../pages/menu';
import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';

describe('Search case page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('akamel+1@trackerproducts.com');
        m.clickBurgerIcon()
            .openSearchCase();
    });

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    });

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

    it('03. Searching parameters and data can shold be cleared', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        p.fillUserFieldWithPersonName()
            .typeCaseNumber('Case Mobile Test')
            .resetSearchingParams();
        expect(p.params).not.toBeDisplayed();
    });
});
