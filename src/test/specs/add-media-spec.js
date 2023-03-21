import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
const helper = require('../utils/helper');
let admin, admin2, powerUser, currentDate

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

describe('Add Task', () => {
    before(() => {
        ui.app.uploadFileToEmulator()
        currentDate = helper.setDate(C.currentDateAndTimeFormat_withoutYear)
        ui.login.logIn(admin);
    });

    afterEach(() => {
        ui.app.cleanUp()
    });

    context('1. Add Media - Org Admin', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.auto_disposition.edit(false);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.disable_Item_fields();
            D.generateNewDataSet(true);
            D.newCase.reviewDate = D.editedCase.reviewDate = D.editedCase.closedDate= null;
            await api.cases.add_new_case(D.newCase.caseNumber)
            await api.items.add_new_item(S.selectedEnvironment.newCase)
            await api.people.add_new_person(true, S.selectedEnvironment.newCase)
        });

        it('1.1 Add Media to Case and verify that media can be downloaded', () => {
            D.newMedia.category = D.newMedia.description = ''

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.media)
            ui.mediaPage.clickAddMediaButton()
                .uploadImageFromFiles(currentDate)
                .verifyDataOnMediaGrid('8.71 kb')
                .openMediaDetailsPage()
                .verifyDataOnMediaDetailsPage(D.newMedia)
                .clickButton('Download')
                .verifyMessage('File has been downloaded to camera roll')
        });

        it('1.2 Add Media to Item and verify that media can be downloaded', () => {
            D.newMedia.category = D.newMedia.description = ''

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.items)
            ui.itemView.goToItemViewPage()
                       .selectItemsTab(C.itemTabs.media)
            ui.mediaPage.clickAddMediaButton()
                .uploadImageFromFiles(currentDate)
                .verifyDataOnMediaGrid('8.71 kb')
                .openMediaDetailsPage()
                .verifyDataOnMediaDetailsPage(D.newMedia)
                .clickButton('Download')
                .verifyMessage('File has been downloaded to camera roll')
        });

        it('1.3 Add Media to Person and verify that media can be downloaded', () => {
            D.newMedia.category = D.newMedia.description = D.newMedia.primaryCase = ''

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.people)
            ui.personView.goToPersonViewPage()
                         .selectPersonTab(C.peopleTabs.media)
            ui.mediaPage.clickAddMediaButton()
                .uploadImageFromFiles(currentDate)
                .verifyDataOnMediaGrid('8.71 kb')
                .openMediaDetailsPage()
                .verifyDataOnMediaDetailsPage(D.newMedia)
                .clickButton('Download')
                .verifyMessage('File has been downloaded to camera roll')
        });
})

});


