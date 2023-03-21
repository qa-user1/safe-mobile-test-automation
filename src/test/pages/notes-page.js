import BasePage from '../pages/basePage';
import S from '../utils/settings';
import C from '../utils/constants';
import D from '../utils/data';
import helper from '../utils/helper';
import { assert } from 'chai';

let el,
    addNote = e => mob.$('//page-notes-list//button[@color="primary"]//*[@name="close"]'),
    noteCategoryField = e => mob.$('//*[@formcontrolname="noteCategoryId"]'),
    noteTextField = e => mob.$('//*[@formcontrolname="text"]//textarea'),
    noteAddedBy = user => mob.$('//b//user-view[contains(text(),"' + user + '")]'),
    noteCategory = category => mob.$('//note-category[contains(text(),"' + category + '")]'),
    noteText = text => mob.$('//*[contains(text(),"' + text + '")]'),
    noteHistoryButton = e => mob.$('//*[@name="timer-outline"]'),
    editNoteButton = e => mob.$('//*[@name="create-outline"]'),
    deleteNoteButton = e => mob.$('//*[@name="trash"]'),
    closeNoteHistory = e => mob.$('//button//span//ion-icon[@name="close"]'),
    showItemNotesCheckbox = e => mob.$('//ion-checkbox[@color="primary"]'),
    itemNoteBadge = e => mob.$('//ion-badge[@color="primary"]'),
    contentOnNoteHistory = text => mob.$('//page-notes-history//ion-card-content//*[contains(text(),"' + text + '")]'),
    deletedNote = e => mob.$('.deleted_note')




export default class NotePage extends BasePage {
    constructor () {
        super();
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/notes-selectors');
        } else {
            el = require('./elementSelectors/iOS/notes-selectors');
        }
    }

    goTo(noteList) {
        this.waitLoaderToDisappear()
        this.clickElmByPartialTextWeb(noteList)
        return this;
    }

    clickAddNoteButton () {
        this.pause(0.2)
        this.waitLoaderToDisappear()
        addNote().click()
        return this;
    }

    enterNoteText (value) {
        this.pause(0.2)
        this.clearAndEnterValue(noteTextField(), value)
        return this;
    }

    selectNoteCategory (option) {
        this.waitLoaderToDisappear()
        this.waitAndClick(noteCategoryField());
        mob.$('//*[contains(text(),"' + option + '")]').waitForDisplayed();
        mob.$('//*[contains(text(),"' + option + '")]').waitForEnabled();
        mob.$('//*[contains(text(),"' + option + '")]').waitForClickable();
        mob.$('//*[contains(text(),"' + option + '")]').click();
        mob.$('//*[@role="dialog"]').waitForDisplayed({reverse:true});
        return this;
    }

    addNoteAndCategory(note, category) {
        this.enterNoteText(note)
        this.selectNoteCategory(category)
        return this;
    }

    goToNoteHistory(note, category) {
        this.pause(0.3)
        this._________NATIVE_CONTEXT_________();
        this.swipe(el.notesCategory(category), el.notesText(note))
        this._________WEB_CONTEXT_________();
        noteHistoryButton().click()
        return this;
    }

    clickEditNote(note, category) {
        this.pause(0.3)
        this._________NATIVE_CONTEXT_________();
        this.swipe(el.notesCategory(category), el.notesText(note))
        this._________WEB_CONTEXT_________();
        editNoteButton().click()
        return this;
    }

    clickDeleteNote(note, category) {
        this.pause(0.3)
        this._________NATIVE_CONTEXT_________();
        this.swipe(el.notesCategory(category), el.notesText(note))
        this._________WEB_CONTEXT_________();
        deleteNoteButton().click()
        return this;
    }

    closeNoteHistory() {
        this.waitLoaderToDisappear()
        this.waitAndClick(closeNoteHistory())
        return this;
    }

    isShowItemsNotesSelected(isSelected) {
        this.waitLoaderToDisappear()
        this.verifyCheckboxIsSelected(isSelected)
        return this;
    }

    clickShowItemsNotes() {
        this.waitLoaderToDisappear()
        this.waitAndClick(showItemNotesCheckbox())
        return this;
    }

    verifyValuesOnNoteGrid (note, category, user) {
        this.pause(0.2)
        this.verifyProvidedTextOnMultipleElements([
            [noteText(note), note],
            [noteCategory(category), category],
            [noteAddedBy(user), user],
        ])
        return this;
    }

    verifyDisplayingDeletedNote (isDisplayed) {
        this.pause(0.5)
        assert.strictEqual(deletedNote().isDisplayed(), isDisplayed)
        return this;
    }

    verifyEditedAndInitialValuesInNoteHistory (note, editedNote,  category, editedCategory, createdBy, editedBy) {
        this.pause(0.2)
            this.verifyProvidedTextOnMultipleElements([
                [contentOnNoteHistory(note), note],
                [contentOnNoteHistory(category), category],
                [contentOnNoteHistory(createdBy), createdBy],
                [contentOnNoteHistory(editedNote), editedNote],
                [contentOnNoteHistory(editedCategory), editedCategory],
                [contentOnNoteHistory(editedBy), editedBy],
            ])
        return this;
    }

    verifyDisplayingItemNotesOnCaseNotesTab(isShowItemNotesSelected, note, category) {
        this.verifyCheckboxIsSelected(isShowItemNotesSelected)
        if(isShowItemNotesSelected){
            this.verifyElementIsVisible(itemNoteBadge())
            this.verifyProvidedTextOnMultipleElements([
                [noteText(note), note],
                [noteCategory(category), category],
            ])
        }
       else {
            this.verifyElementIsNotVisible(itemNoteBadge())
        }
        return this;
    }
}
