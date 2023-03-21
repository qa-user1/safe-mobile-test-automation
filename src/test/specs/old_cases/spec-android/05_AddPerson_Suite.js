import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';
const ui = require('../../../pages/ui-spec');
const p = ui.addPerson;
const m = ui.menuPage;

describe('Add person test suite', () => {
    before(() => {
        console.log(D.driverLicense);
        browser.createdDomainAndLogin('android', D.domainInfo.apac, D.adminCredentials.admin1);
    });

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    });

    it('01. Add person page is loading properly', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddPerson();
        expect(m.addNewPersonHeader).toBeDisplayed();
    });

    it('02. Adding new person with valid data', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddPerson();
        p.fillRequiredField(D.randomString)
            .clickSaveButton()
            .personIsAdded();
        expect(p.basicInfo).toBeDisplayed();
        D.expectListOfElementsToBeDisplayed([p.license(D.driverLicense)]);
    });

    it('03. Person can be edited after being submitted', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddPerson();
        p.fillRequiredField(D.randomString2)
            .clickSaveButton()
            .clickEditIcon()
            .fillPhoneNumber('0056597878')
            .clickSaveButton()
            .personIsEdited('0056597878');
        expect(p.phone('0056597878')).toBeDisplayed();
    });
});
