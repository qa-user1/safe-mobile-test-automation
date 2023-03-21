import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import helper from '../utils/helper';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser,
    currentYear = helper.currentDate()

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

describe('Edit Case - Org Admin', () => {

    before(() => {
        ui.login.logIn(admin);
    });
    afterEach(() => {
        ui.app.cleanUp()
    });


    context('E.C_1 All fields enabled /  No Case Number Formatting  / Auto-Disposition ON', () => {
        before(async () => {
             await api.auth.get_tokens(admin2);
             await api.auto_disposition.edit(true);
             await api.org_settings.enable_all_Case_fields();
             await api.org_settings.set_Org_Wide_Case_Number_formatting(false, false, false);
             await api.org_settings.set_Office_Case_Number_formatting(false, false);
            D.generateNewDataSet();
            D.editedCase.closedDate = null
            await api.cases.add_new_case(D.newCase.caseNumber)
        });

            it('E.C_1.1 Edit Case with all fields and without case formatting', () => {
                D.editedCase.caseNumber = D.editedCase.offenseDescription = D.newCase.caseNumber + '_edited'
                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.clickEditCaseButton()
                     .editAllValues(D.editedCase)
                     .clickSave()
                     .verifyAllValues(D.editedCase);
        });
    });

    context('E.C_2 Case Number Formatting / Reduced number of fields / Auto-Disposition Off', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.auto_disposition.edit(false);
            await api.org_settings.disable_Case_fields();

    })
    context('E.C_2.1 Set Case Formatting - Org-wide Case pattern and prefix  / Custom Validation message', () => {
        before(async () => {
            D.generateNewDataSet(true);
            D.newCase.reviewDate = D.editedCase.reviewDate = D.editedCase.closedDate= null;
            await api.cases.add_new_case(D.newCase.caseNumber)
             await api.org_settings.set_Org_Wide_Case_Number_formatting('org-\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d',
                 currentYear, false, 'Validation message at Org level');
             await api.org_settings.set_Office_Case_Number_formatting(false, false);

        });

        it('E.C_2.1 Edit case that was saved without formatting / without or with changing Case Number', () => {

          let caseNumber  = helper.getRandomNo(6)

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.clickEditCaseButton()
            D.editedCase.caseNumber = null
            ui.caseView.editAllValues(D.editedCase)
                .clickSave()
                .verifyAllValues(D.editedCase)
                .clickEditCaseButton()
                .editCaseNumber('1x')
                .verifyMessage('Validation message at Org level')
                .verifyMessage(C.messages.caseNumberFormattingMessage)
                .verifyCaseNumberGuidelines("Format examples: 'org-")
            D.editedCase.caseNumber = 'org-' + currentYear + caseNumber
            ui.caseView.editCaseNumber(D.editedCase.caseNumber)
                .clickSave()
                .verifyAllValues(D.editedCase);
        });
    });

    context('E.C_2.2 Set Case Formatting - Office Case pattern and prefix / Custom validation message', () => {
        before(async () => {
            D.generateNewDataSet(true);
            D.newCase.reviewDate = D.editedCase.reviewDate = D.editedCase.closedDate= null;
            await api.cases.add_new_case(D.newCase.caseNumber)
            await api.org_settings.set_Org_Wide_Case_Number_formatting('', '', false);
            await api.org_settings.set_Office_Case_Number_formatting('\\d\\d\\d\\d\\d\\d\\d\\d',
                '12', 'Validation message at Office level');
        });

        it('E.C_2.2 Edit case that was saved without formatting / without or with changing Case Number', () => {
            let caseNumber = helper.getRandomNo(6)

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.clickEditCaseButton()
            D.editedCase.caseNumber = null
            ui.caseView.editAllValues(D.editedCase)
                .clickSave()
                .verifyAllValues(D.editedCase)
                .clickEditCaseButton()
                .editCaseNumber('1x')
                .verifyMessage('Validation message at Office level')
                .verifyMessage(C.messages.caseNumberFormattingMessage)
                .verifyCaseNumberGuidelines("Format examples: ")
            D.editedCase.caseNumber = '22' + caseNumber
            ui.caseView.editCaseNumber(D.editedCase.caseNumber)
                .clickSave()
                .verifyAllValues(D.editedCase);
        });
    });

    context('E.C_2.3 Auto Assigned Case Number', () => {

            before(async () => {
                D.generateNewDataSet(true);
                D.newCase.reviewDate = D.editedCase.reviewDate = D.editedCase.closedDate= null;
                await api.cases.add_new_case(D.newCase.caseNumber)
                await api.org_settings.set_Org_Case_Number_formatting(
                    false, true, true,
                    null, D.randomNo, 220);
                await api.org_settings.set_Office_Case_Number_formatting(false, false);
            });

        it('E.C_2.3 Case Number can be edited when Auto-assign Case Numbers is enabled for new cases', () => {
            D.editedCase.caseNumber = D.newCase.caseNumber + '_edited'
            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.clickEditCaseButton()
            ui.caseView.editAllValues(D.editedCase)
                .clickSave()
                .verifyAllValues(D.editedCase)
        });
    });
    });

    context('E.C_3 Reduce number of Case fields /  No Case Number Formatting', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.disable_Case_fields();
            await api.org_settings.set_Org_Wide_Case_Number_formatting(false, false, false);
            await api.org_settings.set_Office_Case_Number_formatting(false, false);
        });

        //TODO: edit methods and tests, include few more verifications when #14160 gets fixed
        context('E.C_3.1 Closing/Opening Case',() => {

        context('E.C_3.1.1 Auto-Disposition Off', () => {
            before(async () => {
                await api.auto_disposition.edit(false);
                D.generateNewDataSet(true);
                D.newCase.reviewDate = D.editedCase.reviewDate = D.editedCase.closedDate= null;
                await api.cases.add_new_case(D.newCase.caseNumber)
            });

        it ('E.C_3.1.1.1 Edit Case and change its status / Verify that closed Case can be opened ', () => {
            D.editedCase.caseNumber = D.newCase.caseNumber + '_edited'
            D.editedCase.status = 'Closed'

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.clickEditCaseButton()
                .changeStatus('Open')
                .verifyClosedDateIsNotDisplayed()
                .editAllValues(D.editedCase)
                .clickSave()
                .verifyAllValues(D.editedCase)
                .clickEditCaseButton()
                .changeStatus('Closed')
                .clickSave()
                .verifyStatus('Open');
        });
        });

        context('E.C_3.1.2 Auto-Disposition ON', () => {
            before(async () => {
                await api.auto_disposition.edit(true);
                D.generateNewDataSet(true);
                await api.cases.add_new_case(D.newCase.caseNumber)
            });

            it('E.C_3.1.2.1 Edit Case, change its status and fill in Closed Date', () => {
                D.editedCase.caseNumber = D.newCase.caseNumber + '_edited'
                D.editedCase.status = 'Closed'

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.clickEditCaseButton()
                    .changeStatus('Open')
                    .selectClosedDate()
                    .editAllValues(D.editedCase)
                    .clickSave()
                    .verifyAllValues(D.editedCase);
            });
        });
    });

    context('E.C_3.2 Custom Form', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.auto_disposition.edit(false);
        });
            beforeEach(async () => {
                D.generateNewDataSet();
                D.newCase.reviewDate = D.editedCase.reviewDate = D.editedCase.closedDate = null
                await api.cases.add_new_case(D.newCase.caseNumber)
            });

        it ('E.C_3.2.1 Add Custom form with all fields populated / Add User to User/User Group field', () => {
            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.customData)
                .addCustomForm(S.selectedEnvironment.caseCustomForm.name)
                .populateAllCustomFields(D.newCase)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newCase)
    });

        it ('E.C_3.2.2 Add Custom form with all fields populated / Add User Group to User/User Group field', () => {
            D.newCase.customUser.firstName = S.selectedEnvironment.admin_userGroup.name
            D.newCase.customUser.name = S.selectedEnvironment.admin_userGroup.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.customData)
                .addCustomForm(S.selectedEnvironment.caseCustomForm.name)
                .populateAllCustomFields(D.newCase)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newCase)
    });

        it ('E.C_3.2.3 Edit Custom form that has empty fields / Add User & User Group to User/User Group field', () => {
            let userGroupA = S.selectedEnvironment.admin_userGroup.name
            D.newCase.customUser.name = D.newCase.customUser.name +'\n' + S.selectedEnvironment.admin_userGroup.name

            ui.homePage.goToExistingCase(D.newCase.caseNumber);
            ui.caseView.selectTab(C.caseTabs.customData)
                .addCustomForm(S.selectedEnvironment.caseCustomForm.name)
                .saveCustomForm()
                .expandCustomForm()
                .populateAllCustomFields(D.newCase)
                .selectUserGroup(userGroupA)
                .saveCustomForm()
                .expandCustomForm()
                .verifyAllCustomValues(D.newCase)
    });

        it ('E.C_3.2.4 Edit Custom Form / Add Users or User Groups to User/User Group custom field', () => {
                let userGroupA = S.selectedEnvironment.admin_userGroup.name,
                    userGroupB = S.selectedEnvironment.power_userGroup.name,
                    userA = admin,
                    userB = powerUser

                ui.homePage.goToExistingCase(D.newCase.caseNumber);
                ui.caseView.selectTab(C.caseTabs.customData)
                    .addCustomForm(S.selectedEnvironment.caseCustomForm.name)
                    .selectUser(userA.firstName)
                    .selectUser(userB.firstName)
                    .saveCustomForm()
                D.newCase.customUser.name = userA.name +'\n' + userB.name
                ui.caseView.verifyValuesInUser_UserGroupField(D.newCase)
                    .clearUser_UserGroupField(2)
                    .selectUserGroup(userGroupA)
                    .selectUserGroup(userGroupB)
                    .saveCustomForm()
                D.newCase.customUser.name = userGroupA +'\n' + userGroupB
                ui.caseView.verifyValuesInUser_UserGroupField(D.newCase)
        });
    });
    });
})



