import p from '../../pages/Ios-fdf/addItemsPage';
import A from '../../pages/Ios-fdf/addCasePage';
import m from '../../pages/Ios-fdf/menu';
import AllureReporter from '@wdio/allure-reporter';

describe('Add items test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('IOS', 'akamel+1@trackerproducts.com');
    });

    afterEach(() => {
        browser.switchContextTo('web', 'mob');
        driver.refresh();
        driver.pause(1000);
    });

    it('01. Add an item to last created case', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddItemsTab();
        p.clickOnCategInfoButton()
            .fillRequiredFields()
            .fillRecoveredPersonName()
            .fillRequiredFieldForAddingNewItem()
            .selectRecovryDateAndFillItemDesc()
            .specifyCustodyReason()
            .typeStorageLocationName()
            .clickSaveButton();
        expect(p.itemHeader).toBeDisplayed();
    });

    it('02. Item should be editable', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        browser.openLastCreatedCase('ios');
        A.selectLastCreatedCase()
            .clickOnItemIcon();
        p.editFirstListedItem();
        expect(p.editedDesc).toBeDisplayed();
    });

    it('03. Google Map - should be removed from Mobile App', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openAddItemsTab();
        p.clickOnCategInfoButton()
            .fillRequiredFields()
            .fillRequiredFieldForAddingNewItem();
        expect(p.mapBox).not.toBeDisplayed();
    });
});
