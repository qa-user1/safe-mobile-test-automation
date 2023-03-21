import D from '../utils/data';
import C from '../utils/constants';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';
let el,
    searchParametersTitle = e => mob.$('//ion-title//*[contains(text(),"Search Parameters")]'),
    caseOfficersOption = e => mob.$('//div[@class="select-text"][contains(text(),"equals (or)")]'),
    options = text => mob.$('//button//span[contains(text(),"' + text + '")]')

export default class SearchCasePage  extends BasePage {

    constructor (platform) {
        super();

        if (platform === 'Android') {
            el = require('./elementSelectors/android/searchCasePage-selectors')
        } else {
            el = require('./elementSelectors/iOS/searchCasePage-selectors')
        }
    }

    closeSearchParametersScreen () {
        this.waitLoaderToDisappear();
        this.pause(0.6)
        while (searchParametersTitle().isDisplayed() === true)
        {
            this.clickBack(1);
        }
        return this;
    }

   enterCaseNumber (value) {
        this.waitLoaderToDisappear();
        this.enterValueToInputWithinElementWithPlaceholder(C.placeholders.search.caseNumber, value)
        return this;
   }

   selectOptionNextToCaseOfficersField (option){
        this.waitLoaderToDisappear()
        caseOfficersOption().waitForDisplayed()
        caseOfficersOption().waitForEnabled()
        caseOfficersOption().click()
        this.pause(0.4)
        options(option).waitForDisplayed()
        options(option).waitForEnabled()
        options(option).click()
        options(option).waitForDisplayed({reverse:true})

        return this;
   }

    verifyCountOfResult (value) {
        this.waitLoaderToDisappear();
        this.verifyBadgeIsDisplayed(value)
        return this;
    }
    verifySearchResult (caseInfo) {
        this.verifyTextOnMultipleElements(
            [
                caseInfo.status,
                caseInfo.caseNumber,
                caseInfo.caseOfficerFullName
            ]
        );
        return this;
    }


    //////////////////////////////////////////////////////////////

    resetSearchingParamsAndroid (device) {
        AllureReporter.addStep('Click on trash icon to reset searching params');
        this.switchContextTo('native', device);
        try {
            el.trashIcon().click();
            el.clearModal().waitForDisplayed();
            el.oKButton().waitForDisplayed();
            el.oKButton().click();
        } catch (error) {
            el.trashIcon().click();
            el.clearModal().waitForDisplayed();
            el.oKButton().waitForDisplayed();
            el.oKButton().click();
        }
        return this;
    }

    resetSearchingParamsIOS (device) {
        this.switchContextTo('native', device);
        el.trashIcon().click();
        if (el.clearModal().isDisplayed()) {
            el.oKButton().click();
        } else {
            el.trashIcon().click();
            el.clearModal().isDisplayed();
            el.oKButton().click();
        }
        return this;
    }

    fillUserFieldWithPersonName (device) {
        AllureReporter.addStep('Fill user field name');
        this.switchContextTo('native', device);
        el.selectUserField().setValue('amr');
        el.selectUserResult().waitForDisplayed();
        el.selectUserResult().click();
        return this;
    }

    clickOnItemIcon (device) {
        AllureReporter.addStep('Click on item icon');
        this.switchContextTo('native', device);
        el.itemsIcon().click();
        if (el.itemPage().isDisplayed() === false) {
            el.itemsIcon().click();
        }
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed() === true) {
            el.loadingWindow().waitForDisplayed({ reverse: true });
        }
        this.switchContextTo('native', device);
        el.itemPage().waitForDisplayed();
        return this;
    }

    typeCaseNumber (caseNumber, device) {
        AllureReporter.addStep('Type case number');
        this.switchContextTo('native', device);
        el.caseSearchInput().setValue(caseNumber);
        return this;
    }

    clickOnSearchButton (device) {
        AllureReporter.addStep('Click on search button');
        this.switchContextTo('web', device);
        el.searchButton().click();
        return this;
    }

    searchResultsAreLoaded (device) {
        AllureReporter.addStep('Verify case search result is loaded');
        this.switchContextTo('web', device);
        el.casesResultHeader().waitForDisplayed();
        this.switchContextTo('native', device);
        return this;
    }

    openResitrictedCase (restrictedCase, device) {
        AllureReporter.addStep('Try to open restricted case');
        this.switchContextTo('native', device);
        mob.$('android=.textContains("' + restrictedCase + '")').waitForDisplayed();
        mob.$('android=.textContains("' + restrictedCase + '")').click();
        return this;
    }

    restrictedCase (restrictedCase) { return $('android=.textContains("' + restrictedCase + '". This Case cannot be displayed, you do not have access to view this Case.")'); }

    caseIsRestrictedAndInAccessible (restrictedCase, device) {
        AllureReporter.addStep('Verify case cant not be displayed');
        this.switchContextTo('native', device);
        mob.$(`android=.textContains("${restrictedCase}. This Case cannot be displayed, you do not have access to view this Case.")`).waitForDisplayed();
        return this;
    }

    clickOnPeopleIcon (platform, device) {
        AllureReporter.addStep('Click on people tab');
        this.switchContextTo('native', device);
        el.peopleIcon().click();
        if (platform === 'Android') {
            this.switchContextTo('web', device);
            el.casePeopleHeader().waitForDisplayed();
        } else {
            el.casePeopleHeader().waitForDisplayed();
        }
        return this;
    }

    clickOnAddPerson (device) {
        AllureReporter.addStep('Click on add person icon');
        this.switchContextTo('native', device);
        el.addPersonIcon().click();
        this.switchContextTo('web', device);
        el.newPersonHeader().waitForDisplayed();
        el.errorMessage().waitForDisplayed();
        return this;
    }
}
