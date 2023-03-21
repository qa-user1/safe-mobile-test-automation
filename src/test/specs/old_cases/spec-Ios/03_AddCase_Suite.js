import ui from '../../../pages/ui-spec';
import api from '../../../../api-utils/api-spec';
import AllureReporter from '@wdio/allure-reporter';
import { assert } from 'chai';
import D from '../../../utils/data-provider';
import S from '../../../utils/settings';
const page = ui.device;
const platform = 'iOS';

describe('Add Case test suite', () => {

    // before(() => {
    //     driver.pause(3000)
    //     api.auth.get_tokens(D.userCredentials.admin1)
    //     browser.createdDomainAndLogin(platform, S.domainInfo.apac, D.userCredentials.admin1);
    // }, 1);

    afterEach(() => {
        ui.app.switchContextTo('web', mob);
        driver.refresh();
        driver.pause(3000);
    });

    it.only('01. Should be able to add new case with valid data', async () => {

        await api.auth.get_tokens(D.userCredentials.admin1)
        page(platform).menuPage.clickBurgerIcon(mob)
        //     .openAddCaseTab(mob);
        // page(platform).addCase.fillCaseNumberAndOffenseType(mob)
        // page(platform).addCase.submitCase(mob)
        // page(platform).addCase.fillCaseOfficerName('MobileAutomation Admin', 'MobileAutomation Admin (smukaca+mobileadmin@trackerproducts.com)', platform, mob)
        // page(platform).addCase.enterAddressAndTag(platform, mob)
        // page(platform).addCase.fillDescriptionAndOffenseDate(platform, mob)
        // page(platform).addCase.saveTheTemplate(platform, mob)
        // page(platform).addCase.caseIsSuccessfullyCreated(platform, mob);

        //expect(p.caseName).toBeDisplayed();
    });





    it('02. Should not be able to add new case with invalid data', () => {
        AllureReporter.addSeverity('critical');
        page(platform).menuPage.clickBurgerIcon(mob)
            .openAddCaseTab(mob);
        page(platform).addCase.fillCaseNumberAndOffenseType(mob)
            .submitCase(mob)
            .fillCaseOfficerFieldWithInvalidName('invalid name', 'invalid name', platform, mob)
            .enterAddressAndTag(platform, mob)
            .fillDescriptionAndOffenseDate(platform, mob)
            .verifyThatSaveButtonIsNotEnabled();
    });

    it.only('03. Last created case should has no listed item by default', () => {
        AllureReporter.addSeverity('critical');
        browser.openLastCreatedCase('ios');
        page(platform).addCase.clickOnItemIconIOS()
        page(platform).addCase.verifyThatNewlyCreatedCaseHasNoItems()
    });

    it('04. Last created case should has no listed people by default', () => {
        AllureReporter.addSeverity('critical');
        browser.openLastCreatedCase('ios');
        page(platform).addCase.clickOnPeopleIcon(mob)
        .verifyThatNewlyCreatedCaseHasNoPeople();
    });

    it('05. Last created case should has no uploaded media by default', () => {
        AllureReporter.addSeverity('critical');
        browser.openLastCreatedCase('ios');
        page(platform).addCase.clickMediaIcon(mob)
            .verifyThatNewlyCreatedCaseHasNoMediaContent();

    });

    it('06. Last created case can be edited', () => {
        AllureReporter.addSeverity('critical');
        browser.openLastCreatedCase('ios');
        page(platform).addCase.selectLastCreatedCase(mob)
            .navigatoToBasicInfoTab(mob)
            .clickOnEditIcon(platform, mob)
            .editOffenseLocation(mob)
            .clearPreviousAddressAndNewOne(platform, mob)
            .clickSaveButton(mob)
            .verifyThatNewlyEnteredAddressIsDisplayed(mob);

    });



    xit('07. Media file can be added to any case', () => {
        AllureReporter.addSeverity('critical');
        browser.openLastCreatedCase('ios');
        page(platform).addCase.clickMediaIcon(mob)
            .clickUploadMediaIcon(mob)
            .clickOnUploadFIleButton(mob)
            .selectMediaFIleToBeUploaded(mob)
            .saveUploadMediaFIle(mob);
       // assert.isTrue(p.selectMediaFile.isDisplayed());
});
});
