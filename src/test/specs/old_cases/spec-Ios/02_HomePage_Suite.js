import AllureReporter from '@wdio/allure-reporter';
import D from '../../../utils/data-provider';
const ui = require('../../../pages/ui-spec');
const page = ui.device;
const platform = 'iOS';

describe('Home page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin(platform, D.domainInfo.apac, D.adminCredentials.admin1);
    }, 1);
    afterEach(() => {
        ui.app.switchContextTo('web', mob);
        driver.refresh();
        driver.pause(1000);
    });

    it('01. Verify all recent cases are listed', () => {
        AllureReporter.addSeverity('critical');
        page(platform).menuPage.clickBurgerIcon(mob);
        page(platform).menuPage.openHomePageTab(mob);
        page(platform).addCase.allRecentCasesAreListed(mob);
    });

    it('02. User picture and name in a sidebar', () => {
        AllureReporter.addSeverity('critical');
        page(platform).menuPage.clickBurgerIcon(mob);
        page(platform).menuPage.verifyThatCorrectUsernameIsDisplayed(D.userInfo.username);

    });
});
