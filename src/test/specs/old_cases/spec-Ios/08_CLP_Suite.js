import p from '../../../pages/search-case-page';
import m from '../../../pages/menu';
import D from '../../../utils/data-provider';
import F from '../../../pages/API_Integration';
import AllureReporter from '@wdio/allure-reporter';

describe('Search case page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('akamel+2@trackerproducts.com');
        browser.APILogin('akamel+1@trackerproducts.com', 'Test123123!');
    });

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    });

    context('01.Enable CLP and verify the following', () => {
        it('1.1 Enabling CLP for recent case should retrun status code 200', async () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            await F.getLastCreatedCaseId();
            console.log(F.firstCaseId);
            console.log(F.CaseId);
            await F.enableCLPForRecentCase(F.CaseId);
        });

        it('1.2 RO only user should not be able to edit a restricted case', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            m.clickBurgerIcon()
                .openSearchCase();
            p.fillUserFieldWithPersonName()
                .typeCaseNumber(F.firstCaseId)
                .clickOnSearchButton()
                .openResitrictedCase(F.firstCaseId);
            //  .caseIsRestrictedAndInAccessible(F.firstCaseId)
            expect(p.editIcon).not.toBeDisplayed();
        });

        it('1.3 RO only user should not be able to add person to a restricted case', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            m.navigateBack()
                .clickBurgerIcon()
                .openSearchCase();
            p.fillUserFieldWithPersonName()
                .typeCaseNumber(F.firstCaseId)
                .clickOnSearchButton()
                .openResitrictedCase(F.firstCaseId)
                .clickOnPeopleIcon()
                .clickOnAddPerson();
            expect(p.errorMessage).toBeDisplayed();
        });
    });

    context('02.Disable CLP and verify basic user can not access it', () => {
        it('02.1 Disable CLP for recent case should retrun status code 200', async () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            await F.getLastCreatedCaseId();
            console.log(F.firstCaseId);
            console.log(F.CaseId);
            await F.disableCLPForRecentCase(F.CaseId);
        });

        it('02.2 RO only user should not be able to add  a restricted case', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            m.navigateBack()
                .clickBurgerIcon()
                .openSearchCase();
            p.fillUserFieldWithPersonName()
                .typeCaseNumber(F.firstCaseId)
                .clickOnSearchButton()
                .openResitrictedCase(F.firstCaseId)
                .clickOnItemIcon();
            //  .caseIsRestrictedAndInAccessible(F.firstCaseId)
            expect(p.addIcon).toBeDisplayed();
        });
    });

    it('03.Should not be able to access data from different office', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        browser.fetchDataFromDifferentOffice();
    });
});
