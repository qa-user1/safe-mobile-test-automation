import BasePage from '../pages/basePage';
import D from '../utils/data';
import S from '../utils/settings';
import C from '../utils/constants';
import { assert } from 'chai';

let el,
    offenseType = (text) => mob.$$('ion-col*=' + text)[1],
    caseOfficer = e => mob.$('//*[@class="tags-container"]'),
    caseOfficerField = e => mob.$('//*[@formcontrolname="caseOfficers"]//input'),
    title = (text) => mob.$('//ion-title//*[text()="' + text + '"]'),
    addItemButton = e => mob.$$('//button//*[@name="close"]')[3],
    editCase = e => mob.$('//page-case-basic//button[@color="primary"]//*[@name="close"]'),
    offenseTypeField = e => mob.$('//page-case-basic//*[@formcontrolname="offenseType"]'),
    offenseTypeOption = (text) => mob.$('//*[contains(text(),"' + text + '")]/ancestor::button'),
    offenseDate = e => mob.$('//page-case-basic//*[@formcontrolname="offenseDate"]'),
    closedDate = e => mob.$('//*[@formcontrolname="closedDate"]'),
    caseNumber = e => mob.$('//page-case-basic//*[@formcontrolname="caseNumber"]'),
    offenseLocation = e => mob.$('//page-case-basic//*[@formcontrolname="offenseLocation"]//input'),
    offenseDescription = e => mob.$('//page-case-basic//*[@formcontrolname="offenseDescription"]//textarea'),
    optionOnUserTypeahead = e => mob.$('//user-multi-type-ahead//ion-list//button[1]'),
    statusToggleButton = e => mob.$('//*[@formcontrolname="active"]'),
    OfficeDropdownIcon = e => mob.$('//*[@class="select-icon"]'),
    closeOfficeDropdown = e => mob.$$('//*[contains(text(),"Cancel")]/ancestor::button')[1],
    status = status => mob.$('//ion-label[contains(text(), "'+ status + '")]'),
    okAlertButton = e => mob.$('//*[@ion-button="alert-button"]//*[contains(text(), "OK")]')

export default class CaseViewPage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/caseViewPage-selectors');
        } else {
            el = require('./elementSelectors/iOS/caseViewPage-selectors');
        }

        super();
    }

    clickAddItemButton () {
        this.waitLoaderToDisappear()
        addItemButton().click()
        return this;
    }

    clickEditCaseButton () {
        this.waitLoaderToDisappear()
        editCase().click()
        return this;
    }

    editCaseNumber (text) {
        this.waitLoaderToDisappear()
        if (text === null){}
          else {
            this.clearAndEnterValue(caseNumber(), text)}
        return this;
    }

    editOffenseType (option) {
        this.waitLoaderToDisappear()
        offenseTypeField().waitForDisplayed()
        offenseTypeField().waitForEnabled()
        offenseTypeField().click()
        offenseTypeOption(option).waitForDisplayed()
        offenseTypeOption(option).waitForEnabled()
        offenseTypeOption(option).waitForClickable()
        this.pause(0.5)
        mob.$('//*[contains(text(),"' + option + '")]/ancestor::button').click()
        offenseTypeOption(option).waitForDisplayed({reverse:true})
        return this;
    }

    editOffenseDescription (text) {
        this.waitLoaderToDisappear()
        this.clearAndEnterValue(offenseDescription(), text)
        return this;
    }

    removeCaseOfficer () {
        this.waitLoaderToDisappear()
        this.clickRemoveButton(0)
        return this;
    }

    editCaseOfficer (object) {
        this.waitLoaderToDisappear()
        this.clickRemoveButton(0)
        this.selectOfficer(object)
        return this;
    }

    changeStatus (currentStatus){
        //workaround added in if-else block for iOS: clicking on the other field helps to turn on/off toggle button
        this.pause(1)
        statusToggleButton().click()
        if(currentStatus === 'Open') {
            if(S.isIOS()){
                caseOfficerField().click()
            }
            this.confirmAlert()
        }
        else if(S.isIOS()) {
            OfficeDropdownIcon().click()
            this.pause(1)
            closeOfficeDropdown().click()
        }
        return this;
    }

    confirmAlert (){
        okAlertButton().waitForDisplayed()
        this.pause(3)
        okAlertButton().click()
        return this;
    }

    selectOffenseDate () {
        mob.$('//*[@formcontrolname="offenseDate"]').click();
        this.pause(3)
        mob.$('//*[@class="picker-toolbar-button"]//button').click();
        this.pause(0.9)
        return this;
    }


    selectClosedDate () {
        this.pause(3)
        mob.$('//*[@formcontrolname="closedDate"]').click();
        this.pause(2)
         mob.$('//span[@class="button-inner"][contains(text(), "Done")]').click();
        this.pause(0.9)
        //   mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    editAllValues (caseObject) {
        this.waitLoaderToDisappear()
        this.editOffenseType(caseObject.offenseType);
        this.editCaseNumber(caseObject.caseNumber);
        if(caseObject.offenseDate) this.selectOffenseDate();
        this.editCaseOfficer(caseObject.caseOfficerObject);
        if(caseObject.offenseDescription) this.editOffenseDescription(caseObject.offenseDescription);
        if(caseObject.tags[0]) this.addTag(caseObject.tags[0].name);
        if(caseObject.offenseLocation) this.editAddress('offenseLocation', caseObject.offenseLocation);

        return this;
    }


    verifyCaseOfficers (officer, multipleOfficers = false) {
        if (multipleOfficers){
            this.verifyText(caseOfficer(),officer.officerNameAndEmail + ' ' + officer.userGroup);
        }
        else {
            this.verifyText(caseOfficer(), officer.officerNameAndEmail);
        }
      return this;
    }

    verifyStatus (text) {
        this.verifyElementByText(text);
        return this;
    }

    verifyAllValues (caseInfo) {
        this.verifyTextOnMultipleElements(
            //review note
            [
                caseInfo.status,
             //   caseInfo.closedDate, - field does not exist on Case View - card #14463
                caseInfo.orgName,
                caseInfo.officeName,
                caseInfo.caseNumber,
               // caseInfo.offenseType,
                caseInfo.caseOfficerFullName,
                caseInfo.offenseLocation,
                caseInfo.offenseDescription,
                caseInfo.offenseDate,
                caseInfo.reviewDate
            ]
        );

        return this;
    }

    verifyClosedDateIsNotDisplayed () {
        this.verifyElementIsNotVisible(closedDate())
        return this;
    }


    verifyThatNewlyCreatedCaseHasNoListedPeople (text) {
        assert.isTrue(el.Badge(text).isDisplayed());
        assert.strictEqual(el.Badge(text).getText(), text);
        return this;
    }

    verifyThatNewlyCreatedCaseHasNoListedItems (text) {
        assert.isTrue(el.Badge(text).isDisplayed());
        assert.strictEqual(el.Badge(text).getText(), text);
        return this;
    }

    verifyThatNewlyCreatedCaseHasNoMediaContent () {
        assert.isNotTrue(el.cardContent().isDisplayed());
        return this;
    }
}
