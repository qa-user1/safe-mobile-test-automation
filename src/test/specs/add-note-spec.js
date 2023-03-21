import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser, note

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
    note = D.getRandomNo(5)
});

if(S.isIOS()){
describe('Add Note - Org Admin', () => {

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
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
        });

        it('1.1 Add Note to Case', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.notes)
            ui.notes.clickAddNoteButton()
                .addNoteAndCategory(note, C.noteCategories.sensitive)
                .clickSave()
                .verifyValuesOnNoteGrid(note, C.noteCategories.sensitive, admin.name)
                .goToNoteHistory(note, C.noteCategories.sensitive)
                .verifyValuesOnNoteGrid(note, C.noteCategories.sensitive, admin.name)
        });
    });

    context('2. Item Note', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.disable_Item_fields();
        });
        beforeEach(async () =>   {
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.items.add_new_item(S.selectedEnvironment.newCase);
        });

        it('2.1 Add Note to Item and verify displaying Item Note on Item -> Notes tab', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.notes)
            ui.notes.clickAddNoteButton()
                .addNoteAndCategory(note, C.noteCategories.sensitive)
                .clickSave()
                .verifyValuesOnNoteGrid(note, C.noteCategories.sensitive, admin.name)
                .goToNoteHistory(note, C.noteCategories.sensitive)
                .verifyValuesOnNoteGrid(note, C.noteCategories.sensitive, admin.name)
        });

        it('2.2 Verify displaying Item Note on Case Notes tab when Show Item Notes checkbox is (not) selected', () => {

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                .selectItemsTab(C.itemTabs.notes)
            ui.notes.clickAddNoteButton()
                .addNoteAndCategory(note, C.noteCategories.sensitive)
                .clickSave()
                .verifyToastMessage('Saved')
                .clickBack(4)
            ui.caseView.selectTab(C.caseTabs.notes)
            ui.notes.verifyDisplayingItemNotesOnCaseNotesTab(true, note, C.noteCategories.sensitive)
                .clickShowItemsNotes()
                .verifyDisplayingItemNotesOnCaseNotesTab(false)

        });
    });

    context('3. Person Note', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.enable_all_Person_fields();
            D.generateNewDataSet()
            await api.cases.add_new_case(D.newCase.caseNumber);
            await api.people.add_new_person(true, S.selectedEnvironment.newCase)
        });

        it('3.1 Add Note to Person', () => {
            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                .selectPersonTab(C.peopleTabs.notes)
            ui.notes.clickAddNoteButton()
                .addNoteAndCategory(note, C.noteCategories.sensitive)
                .clickSave()
                .verifyValuesOnNoteGrid(note, C.noteCategories.sensitive, admin.name)
                .goToNoteHistory(note, C.noteCategories.sensitive)
                .verifyValuesOnNoteGrid(note, C.noteCategories.sensitive, admin.name)
                .closeNoteHistory()
            ui.personView.selectPersonTab(C.peopleTabs.history)
                .goToHistoryViewPage(true)
                .verifyValueOnHistoryPage(note)
        });
    });
});
}

