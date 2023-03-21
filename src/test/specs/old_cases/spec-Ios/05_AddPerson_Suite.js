import 'mocha';
import p from '../../pages/Ios-fdf/addPersonPage';
import m from '../../pages/Ios-fdf/menu';
import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';

describe('Add person test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('IOS', 'akamel+1@trackerproducts.com');
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

    it.only('02. Adding new person with valid data', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddPerson();
        p.fillRequiredField(D.UserName, D.LastName, D.License)
            .clickSaveButton()
            .personIsAdded();
        expect(p.basicInfo).toBeDisplayed();
        browser.expectListOfElementsToBeDisplayed([p.genericEle('busi' + D.UserName), p.genericEle(D.LastName), p.genericEle(D.License), p.genericEle(D.raceType)]);
    });

    it('03. Person can be edited after being submitted', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddPerson();
        p.fillRequiredField(D.UserName2, D.LastName2, D.License2)
            .clickSaveButton()
            .clickEditIcon()
            .fillPhoneNumber(D.phoneNumber)
            .clickSaveButton()
            .personIsEdited(D.phoneNumber);
        browser.expectListOfElementsToBeDisplayed([p.genericEle('busi' + D.UserName2), p.genericEle(D.LastName2), p.genericEle(D.License2), p.genericEle(D.raceType), p.genericEle(D.phoneNumber)]);
    });
});
