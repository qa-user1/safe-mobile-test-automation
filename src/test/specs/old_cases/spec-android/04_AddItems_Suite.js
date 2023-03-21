import D from '../../../utils/data-provider';
import AllureReporter from '@wdio/allure-reporter';
const ui = require('../../../pages/ui-spec');
const p = ui.addItems;
const A = ui.addCase;
const m = ui.menuPage;

describe('Add items test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('android', D.domainInfo.apac, D.adminCredentials.admin1);
    }, 1);

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    }, 1);

    it.only('01. Add an item to last created case', () => {
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
        browser.expectListOfElementsToBeDisplayed([p.itemHeader, p.genericEle(D.custodyReasons), p.genericEle(D.makeValue), p.genericEle(D.modelValue), p.genericEle(D.SnValue)]);
    });

    it('02. Item should be editable', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        browser.openLastCreatedCase();
        A.selectLastCreatedCase()
            .clickOnItemIcon();
        p.editFirstListedItem();
        expect(p.genericEle(D.custodyReasons)).toBeDisplayed();
    });

    it('03. Should be able to duplicate item', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        browser.openLastCreatedCase();
        A.selectLastCreatedCase()
            .clickOnItemIcon();
        p.openLastCreatedItem()
            .duplicateItem();
    });

    it('04. Google Map - should be removed from Mobile App', () => {
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
