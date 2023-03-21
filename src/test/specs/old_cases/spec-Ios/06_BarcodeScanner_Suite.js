import p from '../../pages/Ios-fdf/barcodeScannerPage';
import m from '../../pages/Ios-fdf/menu';
import AllureReporter from '@wdio/allure-reporter';

describe('Barcode scanner page test suite', () => {
    before(() => {
        browser.createdDomainAndLogin('akamel+1@trackerproducts.com');
    });

    afterEach(() => {
        browser.switchContextTo('web');
        driver.refresh();
    });

    it('01. User is able to navigate to barcode scanner tab', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openBarcodeScanner();
        expect(m.scannerPageHeader).toBeDisplayed();
    });

    it('02. Saving button will be disabled when no input', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openBarcodeScanner();
        p.clickOnBarcodeIcon()
            .saveButtonIsDisplayed();
        expect(p.saveButton).not.toBeEnabled();
    });

    it('03. Saving button is enabled when when entering barcode', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openBarcodeScanner();
        p.clickOnBarcodeIcon()
            .enteringBarcodeValue();
        expect(p.saveButton).toBeEnabled();
    });

    it('04. Search for an item with invalid barcode', () => {
        AllureReporter.addSeverity('critical');
        AllureReporter.addStory('');
        AllureReporter.addDescription('');
        m.clickBurgerIcon()
            .openBarcodeScanner();
        p.clickOnBarcodeIcon()
            .enteringInvalidBarcodeValue()
            .clickSaveButton()
            .itemIsNotFound();
        expect(p.itemNotFound).toBeDisplayed();
    });

    context('Verify the actions below', () => {
        it('05. Search for an item with existing barcode', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            m.clickBurgerIcon()
                .openBarcodeScanner();
            p.clickOnBarcodeIcon()
                .enteringBarcodeValue()
                .clickSaveButton()
                .itemIsFound();
            expect(p.itemFound).toBeDisplayed();
            expect(p.itemBarcode).toBeDisplayed();
        });

        it('06. Actions buttons are enabled once item is selected', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            p.selectDesiredBarcode();
            expect(p.trashIcon).toBeEnabled();
        });

        it('07. Actions buttons are disabled when no item is selected', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            p.actionButtons();
            expect(p.trashIcon).not.toBeEnabled();
        });

        it('08. item can be moved to different location', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            p.selectDesiredBarcode()
                .clickEditIcon()
                .selectMoveItemOption()
                .typeLocationName()
                .typeNote()
                .clickOnSignatureButton()
                .writeRequiredSignature()
                .clickDoneButton()
                .signatureIsApplied()
                .saveChange()
                .itemIsSuccessfllyMoved();
            expect(p.barcodeId).toBeDisplayed();
        });

        it('09. Barcode item can be deleted', () => {
            AllureReporter.addSeverity('critical');
            AllureReporter.addStory('');
            AllureReporter.addDescription('');
            p.selectItemAndClickDelete()
                .barcodeIdIsRemoved();
            expect(p.barcodeID).not.toBeDisplayed();
        });
    });
});
