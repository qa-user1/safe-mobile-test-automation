import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import BasePage from '../pages/basePage';
import { assert } from 'chai';

let el,
    transactionNote = e => mob.$('//*[@formcontrolname="notes"]//textarea'),
    noSignatureCheckbox = e => mob.$('//ion-checkbox[@color="energized"]'),
    signatureButton = e => mob.$('//ion-item//ion-label//button[@color="energized"]'),
    completeTransaction = (page) => mob.$('//page-'+ page + '//ion-header//ion-navbar//ion-buttons//button'),
    checkOutReason = e => mob.$('//*[@formcontrolname="reasonId"]'),
    disposalMethod = e => mob.$('//*[@formcontrolname="methodId"]'),
    transferredFromField = e => mob.$('//user-type-ahead//ion-input[@formcontrolname="name"]'),
    transferredFromInputField = e => mob.$('//user-type-ahead//*[@formcontrolname="name"]//input'),
    firstOptionOnUserSingleTypeahead = e => mob.$('//user-type-ahead//ion-list//button[1]')


export default class TransactionsPage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
               el = require('./elementSelectors/android/itemPage-selectors');

        } else {
            el = require('./elementSelectors/iOS/itemPage-selectors');
        }
        super();
    }

    addTransactionNote (object) {
        this.waitLoaderToDisappear()
        if(S.isAndroid()){
            this.hideKeyboard()
        }
        this.enterValue(transactionNote(), object)
        return this;
    }

    clickNoSignatureCheckbox () {
        this.waitLoaderToDisappear()
        noSignatureCheckbox().click()
        return this;
    }

    addSignature () {
        this.waitLoaderToDisappear()
         this.pause(0.3)
        signatureButton().click()
        this.tap(el.signatureCanvas())
        this.clickButton(C.buttons.done)
        return this;
    }

    selectChekOutReason (option) {
        this.waitLoaderToDisappear()
        this.waitAndClick(checkOutReason());
        mob.$('//*[text()="' + option + '"]').waitForDisplayed();
        mob.$('//*[text()="' + option + '"]').waitForEnabled();
        mob.$('//*[text()="' + option + '"]').waitForClickable();
        mob.$('//*[text()="' + option + '"]').click();
        mob.$('//*[@role="dialog"]').waitForDisplayed({reverse:true});
        return this;
    }

    selectDisposalMethod (option) {
        this.waitLoaderToDisappear()
        this.waitAndClick(disposalMethod());
        mob.$('//*[text()="' + option + '"]').waitForDisplayed();
        mob.$('//*[text()="' + option + '"]').waitForEnabled();
        mob.$('//*[text()="' + option + '"]').waitForClickable();
        mob.$('//*[text()="' + option + '"]').click();
        mob.$('//*[@role="dialog"]').waitForDisplayed({reverse:true});
        return this;
    }

    selectExpectedReturnDate () {
        mob.$('//*[@formcontrolname="expectedReturnDate"]').click();
        this.pause(0.2)
        this.clickButton(C.buttons.done);
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    selectActualDisposedDate () {
        mob.$('//*[@formcontrolname="actualDisposedDate"]').click();
        this.pause(0.2)
        this.clickButton(C.buttons.done);
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    populateTransactionFields (transaction, requiredFieldsOnly = false) {
        this.waitLoaderToDisappear()
     if(transaction === C.transactions.move){
        this.selectStorageLocation(D.transactionData.storageLocation)
     }
     else if(transaction === C.transactions.checkOut){
        this.selectPerson(C.placeholders.personField, D.transactionData.custodian)
        this.selectChekOutReason(D.transactionData.chOutReason)
        if(requiredFieldsOnly === false) {this.selectExpectedReturnDate()}
     }
     else if(transaction === C.transactions.dispose){
        this.selectDisposalMethod(D.transactionData.disposalMethod)
        if(requiredFieldsOnly === false){
        this.selectUser_onlyUserField(D.transactionData.witness.firstName)
        this.selectActualDisposedDate()}
     }
     else if(transaction === C.transactions.transfer){
            this.selectPerson(C.placeholders.personField, D.transactionData.custodian)
     }
     else {
        this.selectPerson(C.placeholders.personField, D.transactionData.returnedBy)
        this.selectStorageLocation(D.transactionData.storageLocation)
     }
     if(requiredFieldsOnly === false) this.addTransactionNote(D.transactionData.transactionNote)

        return this;
    }

    completeTransaction (transactionModal) {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        completeTransaction(transactionModal).click()
        return this;
    }

    editValueInTransferredFromField (text) {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        this.clearAndEnterValue(transferredFromInputField(), text.firstName)
        this.pause(0.5)
        this.waitAndClick(firstOptionOnUserSingleTypeahead())
        return this;
    }

    verifyTextOnTransactionHeader (text) {
        this.waitLoaderToDisappear()
        this.pause(0.1)
        this.verifyByText(text)
        return this;
    }

    verifyValueInTransferredFromField (text) {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        this.verifyValueOnInputField(transferredFromInputField(), text)
        return this;
    }

    verifyNoSignatureIsCheckedByDefault (isChecked) {
        this.waitLoaderToDisappear()
        this.pause(0.3)
        this.verifyCheckboxIsSelected(isChecked)
        return this;
    }
}
