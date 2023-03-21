import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';
const ui = require('../../../pages/ui-spec');
const page = ui.device;
const platform = 'Android';

describe('Home page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin(platform, D.domainInfo.apac, D.adminCredentials.admin1);
    }, 1);

    it('01. Verify all recent cases are listed', () => {
        AllureReporter.addSeverity('medium');
        AllureReporter.addStory('As a user, I should be able to view all recent cases in home page');
        AllureReporter.addDescription('Recent cases will be listed down');
        page(platform).menuPage.clickBurgerIcon(mob)
        page(platform).menuPage.openHomePageTab(mob)
        //page(platform).homePage.allRecentCasesAreListed(mob);   //have to add steps: navigate to Case ->
                                                                         // Case is displayed in the recent case list
    });

    it('02. User picture and name in a sidebar', () => {
        AllureReporter.addSeverity('minor');
        AllureReporter.addStory('As a user, I should be able to see my profile picture and my name');
        AllureReporter.addDescription('Upon opening side bar, user should be able to see his profile picture and name ');
        page(platform).menuPage.clickBurgerIcon(mob)
        page(platform).menuPage.openSideBar(mob)
        page(platform).menuPage.verifyThatCorrectUsernameIsDisplayed(D.userInfo.username)
    });
});
