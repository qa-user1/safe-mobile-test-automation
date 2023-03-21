import D from '../utils/data';
import AllureReporter from '@wdio/allure-reporter';
import BasePage from './basePage';
let el;
export default class DiscrepancyReportsPage  extends BasePage {
    constructor (platform) {
        super();

        if (platform === 'Android') {
            el = require('./elementSelectors/android/discrepancyReportsPage-selectors')
        } else {
            el = require('./elementSelectors/iOS/discrepancyReportsPage-selectors')
        }
    }

    clickAddButton (device) {
        AllureReporter.addStep('CLick on add button');
        this.switchContextTo('web', device);
        el.addReportIcon().click();
        this.switchContextTo('native', device);
        el.addNewReportPage().waitForDisplayed();
        return this;
    }

    typeReportName (reportName, device) {
        AllureReporter.addStep('Type report name');
        this.switchContextTo('web', device);
        el.enterDiscrepancyReportName().setValue(reportName);
        return this;
    }

    selectStorageLocation (platform, device) {
        AllureReporter.addStep('Type storage location');
        this.switchContextTo('web', device);
        el.storageLocation().setValue('sh');
        mob.hideKeyboard();
        this.switchContextTo('native', device);
        if (platform === 'Android') {
            mob.$('android=.textContains(\"' + D.storage + '\")').waitForDisplayed({ timeout: 12000 });
            mob.$('android=.textContains(\"' + D.storage + '\")').click();
        } else {
            mob.$(`~archive ${D.storage}`).waitForDisplayed({ timeout: 12000 });
            mob.$(`~archive ${D.storage}`).click();
        }
                return this;
    }

    clickStartButton (device) {
        AllureReporter.addStep('Click on start button');
        this.switchContextTo('native', device);
        el.startButton().click();
       // el.discrepancyReportsPage().waitForDisplayed(); only for android
        return this;
    }

    waitForReportToBeLoaded (device) {
        AllureReporter.addStep('Wait for all reports to be loaded');
        this.switchContextTo('native', device);
        el.scanningItem().waitForDisplayed({ timeout: 5000 });
        return this;
    }

    clickRunStartButton (platform, device) {
        AllureReporter.addStep('CLick on run start button');
        this.switchContextTo('native', device);
        el.runReport().waitForDisplayed();
        el.runReport().click();
        if (platform === 'Android') {
        el.createdReport().waitForDisplayed(); }
        else {
            this.switchContextTo('web', device);
            el.createdReport().waitForDisplayed();
        }
        return this;
    }

    searchByName (reportName, device) {
        AllureReporter.addStep('Search for report by name');
        this.switchContextTo('web', device);
        el.searchIcon().setValue(reportName);
        browser.$("//*[text()='Report - " + D.randomString + "']").waitForDisplayed();
        this.switchContextTo('native', device);
        return this;
    }

    clickOnEditIcon (device) {
        AllureReporter.addStep('Click on edit icon');
        this.switchContextTo('native', device);
        el.editIcon().click();
        return this;
    }
    // only for ios

    numberOfItems (device) {
        return $$('.summariesCount')[3].getText();
    }

    // DicrepancyFoundItemsIsMatchingReportPreview (device) {
    //     $$('.label-md')[23].waitForDisplayed();
    //     return $$('.label-md')[23].getText();
    // }
}
