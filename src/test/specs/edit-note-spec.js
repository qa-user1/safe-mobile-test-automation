import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser,
    note = D.getRandomNo(5)

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

if(S.isIOS()){
describe('Edit Note - Org Admin', () => {
//TODO: include verification for edited note's values right after editing when #13441 gets fixed

    before(() => {
        ui.login.logIn(admin);
    });

     afterEach(() => {
            ui.app.cleanUp()
        });

    context('1. Case Note', () => {

        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.enable_all_Case_fields();
        });
        beforeEach(async () => {
            D.generateNewDataSet()
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.notes.add_note(S.selectedEnvironment.newCase, note)
        });

        it('1.1 Edit Case Note', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.notes)
            ui.notes.clickEditNote(note, C.noteCategories.misc)
                .addNoteAndCategory(note +'_edited', C.noteCategories.sensitive)
                .clickSave()
                .goToNoteHistory(note + '_edited', C.noteCategories.sensitive)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note + '_edited',
                    C.noteCategories.misc,
                    C.noteCategories.sensitive,
                    createdBy,
                    editedBy)
                .closeNoteHistory()
                .verifyValuesOnNoteGrid(note + '_edited', C.noteCategories.sensitive, editedBy)
        });

        it('1.2 Delete Case Note', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.notes)
            ui.notes.clickDeleteNote(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(false)
                .goTo('Deleted')
                .verifyDisplayingDeletedNote(true)
                .verifyValuesOnNoteGrid(note, C.noteCategories.misc, editedBy)
                .goToNoteHistory(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(true)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note,
                    C.noteCategories.misc,
                    C.noteCategories.misc,
                    createdBy,
                    editedBy)
        });
    });

    context('2. Item Note', () => {

        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.disable_Item_fields();
        });
        beforeEach(async () => {
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.items.add_new_item(S.selectedEnvironment.newCase);
            await api.notes.add_note(S.selectedEnvironment.newItem, note)
        });

        it('2.1 Edit Item Note', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.notes)
            ui.notes.clickEditNote(note, C.noteCategories.misc)
                .addNoteAndCategory(note +'_edited', C.noteCategories.sensitive)
                .clickSave()
                .goToNoteHistory(note + '_edited', C.noteCategories.sensitive)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note + '_edited',
                    C.noteCategories.misc,
                    C.noteCategories.sensitive,
                    createdBy,
                    editedBy)
                .closeNoteHistory()
                .verifyValuesOnNoteGrid(note + '_edited', C.noteCategories.sensitive, editedBy)
        });

        it('2.2 Verify Item Note can be edited from Case Notes tab', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.notes)
            ui.notes.verifyDisplayingItemNotesOnCaseNotesTab(true, note, C.noteCategories.misc)
                .clickEditNote(note, C.noteCategories.misc)
                .addNoteAndCategory(note +'_edited', C.noteCategories.sensitive)
                .clickSave()
                .goToNoteHistory(note + '_edited', C.noteCategories.sensitive)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note + '_edited',
                    C.noteCategories.misc,
                    C.noteCategories.sensitive,
                    createdBy,
                    editedBy)
                .closeNoteHistory()
                .verifyValuesOnNoteGrid(note + '_edited', C.noteCategories.sensitive, editedBy)

        });

        it('2.3 Delete Item Note', () => {
            let createdBy = admin2.name,
                editedBy = admin.name


            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                       .selectItemsTab(C.itemTabs.notes)
            ui.notes.clickDeleteNote(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(false)
                .goTo('Deleted')
                .verifyDisplayingDeletedNote(true)
                .verifyValuesOnNoteGrid(note, C.noteCategories.misc, editedBy)
                .goToNoteHistory(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(true)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note,
                    C.noteCategories.misc,
                    C.noteCategories.misc,
                    createdBy,
                    editedBy)
        });

        it('2.4 Verify Item Note can be deleted from Case Notes tab', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.notes)
            ui.notes.verifyDisplayingItemNotesOnCaseNotesTab(true, note, C.noteCategories.misc)
                .clickDeleteNote(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(false)
                .goTo('Deleted')
                .verifyDisplayingDeletedNote(true)
                .verifyValuesOnNoteGrid(note, C.noteCategories.misc, editedBy)
                .goToNoteHistory(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(true)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note,
                    C.noteCategories.misc,
                    C.noteCategories.misc,
                    createdBy,
                    editedBy)
        });
    });

    context('3. Person Note', () => {

        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Person_fields();
        });
        beforeEach(async () => {
            D.generateNewDataSet()
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.people.add_new_person(true, S.selectedEnvironment.newCase)
            await api.notes.add_note(S.selectedEnvironment.newPerson, note)
        });

        it('3.1 Edit Person Note', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.notes)
            ui.notes.clickEditNote(note, C.noteCategories.misc)
                .addNoteAndCategory(note +'_edited', C.noteCategories.sensitive)
                .clickSave()
                .goToNoteHistory(note + '_edited', C.noteCategories.sensitive)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note + '_edited',
                    C.noteCategories.misc,
                    C.noteCategories.sensitive,
                    createdBy,
                    editedBy)
                .closeNoteHistory()
                .verifyValuesOnNoteGrid(note + '_edited', C.noteCategories.sensitive, editedBy)
            ui.personView.selectPersonTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyValueOnHistoryPage(note + '_edited')
        });

        it('3.2 Delete Person Note', () => {
            let createdBy = admin2.name,
                editedBy = admin.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.notes)
            ui.notes.clickDeleteNote(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(false)
                .goTo('Deleted')
                .verifyDisplayingDeletedNote(true)
                .verifyValuesOnNoteGrid(note, C.noteCategories.misc, editedBy)
                .goToNoteHistory(note, C.noteCategories.misc)
                .verifyDisplayingDeletedNote(true)
                .verifyEditedAndInitialValuesInNoteHistory(
                    note,
                    note,
                    C.noteCategories.misc,
                    C.noteCategories.misc,
                    createdBy,
                    editedBy)
        });
    });
});
}

