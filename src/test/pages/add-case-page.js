import BasePage from '../pages/basePage';
import S from '../utils/settings';
import C from '../utils/constants';
import D from '../utils/data';
import helper from '../utils/helper';

let el,
    caseNumber = e => mob.$('//*[@formcontrolname="caseNumber"]'),
    offenseDate = e => mob.$('//*[@formcontrolname="offenseDate"]'),
    reviewDateField = e => mob.$('//*[@formcontrolname="reviewDate"]'),
    reviewDate = pastDate => mob.$('//button[contains(text(),"' + pastDate + '")]'),
    placeholder = text => mob.$('//*[@placeholder=" ' + text + ' "]')


export default class AddCasePage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/addCasePage-selectors');
        } else {
            el = require('./elementSelectors/iOS/addCasePage-selectors');
        }
        super();
    }

    enterCaseNumber (value) {
        this.pause(0.2)
        this.clearAndEnterValue(caseNumber(), value)
        return this;
    }


    verifyCaseNumber (value) {
        this.pause(0.4)
        this.waitLoaderToDisappear();
        this.verifyValueOnInputField(caseNumber(), value);
        return this;
    }

    verifyCaseNumberFieldShowsAutoAssignedPlaceholder (value) {
        this.waitLoaderToDisappear();
        this.verifyElementIsVisible(placeholder(value));
        return this;
    }


    selectOffenseType (offenseType) {
        this.waitAndClick(el.offenseTypeMenuButton(), true);
        this.waitAndClick(el.offenseItem(offenseType));
        return this;
    }

    selectCaseOfficer (userObject) {
        this.selectOfficer(userObject)
        return this;
    }

    enterDescription (text) {
        this.enterValueInElementWithPlaceholder(C.placeholders.addCase.offenseDescription, text);
        return this;
    }

    selectOffenseDate () {
        mob.$('//*[@formcontrolname="offenseDate"]').click();
        this.pause(0.2)
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed();
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForEnabled();
        mob.$('//*[@class="picker-toolbar-button"]//button').click();
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    selectReviewDate (date1, date2) {
        reviewDateField().click();

        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed();
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForEnabled();
        if (S.isAndroid()) date2 = helper.currentDate();
        this.swipeUp(date1, date2)
        mob.$('//*[@class="picker-toolbar-button"]//button').click();
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    verifyReviewDateIsNotVisible () {
        this.verifyElementIsNotVisible(el.reviewDate(), true, true);
        return this;
    }

    verifyReviewDateValue (value) {
        this.verifyPartialText(reviewDate(value), value, true, true);
        return this;
    }

    populateFieldsOnFirstForm (caseObject) {
        this.waitLoaderToDisappear()
        this.selectOptionOnFirstDropdown(caseObject.offenseType);
        this.enterCaseNumber(caseObject.caseNumber);
        this.clickStart();
        this.waitLoaderToDisappear()
        return this;
    }

    populateAllFields (caseObject) {
        this.waitLoaderToDisappear()
        this.selectOptionOnFirstDropdown(caseObject.offenseType);
        this.enterCaseNumber(caseObject.caseNumber);
         this.clickStart();

         this.waitLoaderToDisappear()
         if(caseObject.offenseDate) this.selectOffenseDate();
         this.selectCaseOfficer(caseObject.caseOfficerObject);
         if(caseObject.offenseDescription) this.enterDescription(caseObject.offenseDescription);
         if(caseObject.offenseLocation) this.enterAddress(C.placeholders.addCase.offenseLocation, caseObject.offenseLocation)
         if(caseObject.tags[0]) this.addTag(caseObject.tags[0].name);
        return this;
    }




    //////////////////////////////////////////////////

    allRecentCasesAreListed (platform) {
        this.switchContextTo('native', platform);
        el.caseList().waitForDisplayed(10000);
        return this;
    }

    navigateToBasicInfoTab (platform) {
        this.switchContextTo('native', platform);
        el.basicInfoIcon().click();
        el.basicInfoIcon().click();
        return this;
    }

    clickOnEditIcon (platform) {
        if (platform === 'iOS') {
            this.switchContextTo('web', platform);
            el.basicInfoHeader().waitForDisplayed();
            this.switchContextTo('native', platform);
        } else {
            this.switchContextTo('native', platform);
            el.basicInfoHeader().waitForDisplayed();
        }
        el.editIcon().waitForEnabled();
        el.editIcon().click();
        //el.caseName().waitForDisplayed();
        return this;
    }

    editDescription (description) {
        this.enterValue(el.editedOffenseDescription(), description);
        browser.pause(2000);
        return this;
    }

    editOffenseLocation (platform) {
        this.switchContextTo('native', platform);
        el.offenseLocationEdit().click();
        el.offenseLocationEdit().click();
        el.offenseLocationEdit().click();
        return this;
    }

    clearPreviousAddressAndNewOne (platform, location) {
        if (platform === 'Android') {
            this.switchContextTo('native', platform);
            el.addressHeader().waitForDisplayed();
            el.searchAddressPlaceholder().clearValue();
            el.searchAddressPlaceholder().setValue('frank');
            el.addressSearchResult(location.newLocationSearchResult).waitForDisplayed();
            //browser.$('android=.textContains("Frankfurt")').click();
            el.addressSearchResult(location.newLocationSearchResult).click();
        } else {
            this.switchContextTo('native', platform);
            el.addressHeader().waitForDisplayed();
            el.searchAddressPlaceholder().clearValue();
            el.searchAddressPlaceholder().setValue('frank');
            this.switchContextTo('web', platform);
            el.editedAddress().waitForDisplayed();
            el.editedAddress().click();
        }
        return this;
    }

    clickSaveButton (platform) {
        this.switchContextTo('web', platform);
        el.saveButtonEditPage().waitForDisplayed();
        el.saveButtonEditPage().waitForEnabled();
        el.saveButtonEditPage().click();
        return this;
    }

    clickUploadMediaIcon (platform) {
        this.switchContextTo('native', platform);
        el.uploadMediaIcon().waitForDisplayed();
        el.uploadMediaIcon().waitForEnabled();
        el.uploadMediaIcon().click();
        driver.pushFile('/sdcard/Download/tux.jpg', 'src/test/resources/tux.jpg');
        try {
            el.fileButtons.waitForDisplayed();
        } catch (error) {
            el.uploadMediaIcon().click();
            el.fileButtons().waitForDisplayed();
        }
        return this;
    }

    clickOnUploadFIleButton (platform) {
        this.switchContextTo('web', platform);
        el.fileButton().click();
        return this;
    }

    selectMediaFIleToBeUploaded (platform) {
        this.switchContextTo('native', platform);
        if (el.selectMediaFile().waitForDisplayed()) {
            el.selectMediaFile().click();
        } else {
            el.showRoot().click();
            el.downloadLocation().waitForDisplayed();
            el.downloadLocation().click();
            el.selectMediaFile().waitForDisplayed();
            el.selectMediaFile().click();
        }
        el.selectMediaFile().waitForDisplayed();
        return this;
    }

    saveUploadMediaFIle (platform) {
        this.switchContextTo('native', platform);
        el.trueIcon().waitForEnabled();
        el.checkmark().waitForDisplayed({ timeout: 5000 });
        el.trueIcon().click();
        el.caseMediaHeader().waitForDisplayed();
        return this;
    }

    verifyThatSaveButtonIsNotEnabled (platform) {
        this.switchContextTo('web', platform);
        assert.isNotTrue(el.saveButton().isClickable());
        return this;
    }

    verifyThatNewlyCreatedCaseHasNoPeople () {
        assert.isTrue(el.peopleBadge().isDisplayed());
        return this;
    }

    verifyThatNewlyCreatedCaseHasNoItems () {
        assert.isTrue(el.itemBadge().isDisplayed());
        return this;
    }

    verifyThatNewlyCreatedCaseHasNoMediaContent () {
        assert.isNotTrue(el.cardContent().isDisplayed());
        return this;
    }

    verifyThatNewlyEnteredAddressIsDisplayed (platform) {
        this.switchContextTo('native', platform);
        assert.strictEqual(el.offenseLocationEdit().getText(), 'Frankfurt, Germany');
        return this;
    }
}
