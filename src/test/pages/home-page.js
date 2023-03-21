import { assert, expect } from 'chai';
import BasePage from './basePage';
import S from '../utils/settings';
import C from '../utils/constants';
let el;

export default class HomePage  extends BasePage {
    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/homePage-selectors');
        } else {
            el = require('./elementSelectors/iOS/homePage-selectors');
        }
        super();
    }

    goToExistingCase (caseNumber){
        this.clickMenu()
        this.waitAndClick(el.homeIcon(), true)
        this.selectCaseNumber(caseNumber)
        return this;
    }

    selectLastCreatedCase (device) {
        AllureReporter.addStep('Select last create case');
        this.switchContextTo('native', device);
        browser.waitUntil(() => {
            return el.caseList().map((caseList) => el.caseList().isDisplayed()).length > 1;
        });
        el.caseList[0].click();
        el.basicInfoHeader().waitForDisplayed();
        this.switchContextTo('web', device);
        if (el.loadingWindow().isDisplayed === true) {
            browser.waitUntil(() => {
                return el.caseList().map((caseList) => el.caseList().waitForDisplayed({ reverse: true })).length > 1;
            });
        }
    }

    allRecentCasesAreListed (device) {
        AllureReporter.addStep('All recent cases are listed');
        this.switchContextTo('native', device);
        el.caseList([0]).waitForDisplayed();
        return this;
    }

    openSideBar (device) {
        AllureReporter.addStep('Open side bar menu');
        this.switchContextTo('native', device);
        el.burgerIcon().click();
        el.homeIcon().waitForDisplayed();
        return this;
}
}
