import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import helper from '../utils/helper';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser, newCaseNumber,
    currentYear = helper.currentDate()


before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
});

describe('Add Case - Org Admin', async () => {

    before(() => {
        ui.login.logIn(admin);
    });
    afterEach(() => {
        ui.app.cleanUp()
    });

    // TODO include when bug gets fixed - #11903
    context('A.C_1  No Case Number Formatting', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.org_settings.set_Org_Wide_Case_Number_formatting(false, false, false);
            await api.org_settings.set_Office_Case_Number_formatting(false, false);
        });
    xit('A.C_1. Validation messages - existing Case Number, less than 3 characters, etc.', () => {
        ui.menu.navigateTo(C.menu.addCase);
        ui.addCase.enterCaseNumber('12')
            .verifyElementByText(C.validation_msgs.addCase.minimum3Characters)
            .enterCaseNumber(S.selectedEnvironment.oldCase.caseNumber)
            .verifyElementByText(C.validation_msgs.addCase.alreadyExists);
        ui.menu.navigateTo(C.menu.homePage);
    });
    });

    context('A.C_2 All fields enabled /  No Case Number Formatting  / Auto-Disposition ON', () => {
        let caseNumber =  helper.getRandomNo(6)
        before(async () => {
             await api.auth.get_tokens(admin2);
             await api.auto_disposition.edit(true);
             await api.org_settings.enable_all_Case_fields();
             await api.org_settings.set_Org_Wide_Case_Number_formatting(false, false, false);
             await api.org_settings.set_Office_Case_Number_formatting(false, false);
            D.generateNewDataSet();
        });

        after(async () => {
            await api.cases.fetch_current_case_data(D.newCase.caseNumber)
            await console.log('DDDDDDD ' + JSON.stringify(S.selectedEnvironment.currentCase))
            let currentCase = JSON.stringify(S.selectedEnvironment.currentCase)
            currentCase = JSON.parse(currentCase).cases[0]
           // await console.log('VVVVV ' + currentCase.id)
            await api.people.add_new_person(true, S.selectedEnvironment.currentCase)

        });

            it.only('A.C_2 Add Case with all fields, including Review Date, and without case formatting',() => {
                ui.menu.navigateTo(C.menu.addCase);
                 ui.addCase
                     .verifyCaseNumber('')
                     .populateAllFields(D.newCase)
                     .clickSave();
                    ui.caseView.verifyAllValues(D.newCase);
            });
    });

    context('A.C_3 Case Number Formatting / Reduced number of fields / Auto-Disposition Off', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.auto_disposition.edit(false);
            await api.org_settings.disable_Case_fields();
    })
    context('A.C_3.1 Case Formatting - Org-wide Case pattern and prefix  / Custom Validation message', () => {
        before(async () => {
             await api.org_settings.set_Org_Wide_Case_Number_formatting('org-\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d',
                 currentYear, false, 'Validation message at Org level');
             await api.org_settings.set_Office_Case_Number_formatting(false, false);
            D.generateNewDataSet(true);
            D.newCase.reviewDate = null;
        });

        it('A.C_3.1 Add Case with Org pattern and prefix and without Review Date', () => {
          let caseNumber  = D.newCase.caseNumber = helper.getRandomNo(6)
          //  D.newCase.caseOfficerFullName = admin.name + ' ' + admin.email;

           ui.menu.navigateTo(C.menu.addCase);
            ui.addCase.verifyCaseNumber('org-' + currentYear +'______')
                .enterCaseNumber('te')
                .verifyMessage('Validation message at Org level')
                .verifyMessage(C.messages.caseNumberFormattingMessage)
                .verifyCaseNumberGuidelines("Format examples: 'org-")
            D.newCase.caseNumber = 'org-' + currentYear + caseNumber
            ui.addCase.populateAllFields(D.newCase)
                .verifyCaseNumber(D.newCase.caseNumber)
                 .clickSave();
             ui.caseView.verifyAllValues(D.newCase);
        });
    });

    context('A.C_3.2 Case Formatting - Office Case pattern and prefix / Custom validation message', () => {
        before(async () => {
            await api.org_settings.set_Org_Wide_Case_Number_formatting('', '', false);
            await api.org_settings.set_Office_Case_Number_formatting('\\d\\d\\d\\d\\d\\d\\d\\d',
                '12', 'Validation message at Office level');
            D.generateNewDataSet(true);
            D.newCase.reviewDate = null;
        });

        it('A.C_3.2 Add Case with Office pattern and prefix / External user as case officer', () => {
            let caseNumber  = D.newCase.caseNumber = helper.getRandomNo(6)
            D.newCase.caseOfficerFullName = D.newCase.externalOfficer.fullName;
            D.newCase.caseOfficerObject.firstName = D.newCase.externalOfficer.firstName;

            ui.menu.navigateTo(C.menu.addCase);
            ui.addCase.verifyCaseNumber('12______')
                .enterCaseNumber('t')
                .verifyMessage('Validation message at Office level')
                .verifyMessage(C.messages.caseNumberFormattingMessage)
                .verifyCaseNumberGuidelines("Format examples: ")
            D.newCase.caseNumber = '12' + caseNumber
            ui.addCase.populateAllFields(D.newCase)
            ui.addCase.verifyCaseNumber(D.newCase.caseNumber)
                 .clickSave();
             ui.caseView.verifyAllValues(D.newCase);
        });
    });

    context('A.C_3.3 Case Formatting - Org Case pattern  / Office prefix / Default Validation message', () => {
        before(async () => {
            await api.org_settings.set_Org_Wide_Case_Number_formatting('\\w\\w\\d\\d\\d\\d\\d\\d',
                '', false);
            await api.org_settings.set_Office_Case_Number_formatting(null, 'AT');
            D.generateNewDataSet(true);
            D.newCase.reviewDate = null;
        });

        it('A.C_3.3 Add Case with Org pattern and Office prefix', () => {

            let caseNumber  = D.newCase.caseNumber = helper.getRandomNo(6)

            ui.menu.navigateTo(C.menu.addCase);
            ui.addCase.verifyCaseNumber('AT______')
                .enterCaseNumber('tes')
                .verifyMessage(C.messages.caseNumberFormattingMessage)
                .verifyCaseNumberGuidelines("Format examples: ")
            D.newCase.caseNumber = 'AT' + caseNumber
            ui.addCase.populateAllFields(D.newCase)
                .clickSave()
            D.newCase.caseNumber = 'AT' + caseNumber
            ui.caseView.verifyAllValues(D.newCase);
        });
    });

    context('A.C_3.4 Case Formatting - Org Case prefix  / Office pattern / Default Validation message', () => {
        before(async () => {
            await api.org_settings.set_Org_Wide_Case_Number_formatting('', 'org',
                false);
            await api.org_settings.set_Office_Case_Number_formatting('\\w\\w\\w-\\d\\d\\d\\d\\d\\d\\d\\d',
                null);
            D.generateNewDataSet(true);
            D.newCase.reviewDate = null;
        });

        it('A.C_3.4.1 Add Case with Org prefix and Office pattern', () => {
            D.newCase.caseOfficerFullName = admin.name;
            let caseNumber  = D.newCase.caseNumber = helper.getRandomNo(8)

            ui.menu.navigateTo(C.menu.addCase);
            ui.addCase.verifyCaseNumber('org-________')
                .enterCaseNumber('xxxx')
                .verifyMessage(C.messages.caseNumberFormattingMessage)
                .verifyCaseNumberGuidelines("Format examples: ")
            D.newCase.caseNumber = 'org' + caseNumber
            ui.addCase.populateAllFields(D.newCase)
            ui.addCase.clickSave()
            D.newCase.caseNumber = 'org' + '-' + caseNumber
            ui.caseView.verifyAllValues(D.newCase);
        });

        it('A.C_3.4.2 Verify that Org prefix can be overridden', () => {
         let caseNumber = helper.getRandomNo(8)
            D.newCase.caseNumber = 'ATC' + caseNumber
            D.newCase.caseOfficerFullName = admin.name;

          ui.menu.navigateTo(C.menu.addCase);
          ui.addCase.verifyCaseNumber('org-________')
            .enterCaseNumber(helper.getRandomString(4))
            .verifyMessage(C.messages.caseNumberFormattingMessage)
            .verifyCaseNumberGuidelines("Format examples: ")
            .populateAllFields(D.newCase)
            .clickSave()
            D.newCase.caseNumber = 'ATC-' + caseNumber
          ui.caseView.verifyAllValues(D.newCase);
    });
});

    context('A.C_3.5 Auto Assigned Case Number', () => {

            before(async () => {
                await api.org_settings.set_Org_Case_Number_formatting(
                    false, true, true,
                    null, D.randomNo, 220);
                await api.org_settings.set_Office_Case_Number_formatting(false, false);
                D.generateNewDataSet(true);
                D.newCase.reviewDate = null;
            });

        it('A.C_3.5 Add Case with Auto Assigned Case Number', () => {
            D.newCase.caseNumber = D.randomNo + 220
            ui.menu.navigateTo(C.menu.addCase);
            //TODO include verification for disabled Case Number field when #14110 gets fixed
            ui.addCase.verifyCaseNumberFieldShowsAutoAssignedPlaceholder(C.placeholders.addCase.autoAssignedCaseNumber)
                      .populateAllFields(D.newCase)
                      .clickSave()
            ui.caseView.verifyAllValues(D.newCase);
        });
    });
    });

    context('A.C_4 Required Custom Forms / Reduced number of fields / Auto-Disposition Off', () => {
        before(async () => {
            await api.auth.get_tokens(admin2);
            await api.auto_disposition.edit(false);
            await api.org_settings.set_Org_Wide_Case_Number_formatting(false, false, false);
            await api.org_settings.set_Office_Case_Number_formatting(false, false);
            await api.org_settings.disable_Case_fields();
        })

        beforeEach(async () => {
            D.generateNewDataSet(true);
            D.newCase.reviewDate = null;
        })

        context('A.C_4.1 Optional custom fields', () => {
        it ('A.C_4.1 Add Case with required Custom form / Add User to User/User Group field', () => {
            D.newCase.offenseType = S.selectedEnvironment.offenseType2.name
            ui.menu.navigateTo(C.menu.addCase);
            ui.addCase
                .verifyCaseNumber('')
                .populateAllFields(D.newCase)
                .verifyButtonIsEnabled(C.buttons.save)
                .verifyCustomFormIsDisplayed()
                .populateAllCustomFields(D.newCase)
                .clickSave();
            ui.caseView.verifyAllValues(D.newCase)
                     .selectTab(C.caseTabs.customData)
                     .expandCustomForm()
                     .verifyAllCustomValues(D.newCase);
        });
        });

        context('A.C_4.2 Required custom fields', () => {
        it('A.C_4.2 Add Case with required Custom Form / Add User & User Group to User/User Group field', () => {
                    //TODO add validation for highlighted required fields when #14136 & #12750 get fixed
                    let userGroupA = S.selectedEnvironment.admin_userGroup.name
                    D.newCase.offenseType = S.selectedEnvironment.offenseType3.name
                    D.newCase.customUser.name = D.newCase.customUser.name +'\n' + S.selectedEnvironment.admin_userGroup.name

                    ui.menu.navigateTo(C.menu.addCase);
                    ui.addCase
                        .verifyCaseNumber('')
                        .populateAllFields(D.newCase)
                        .verifyCustomFormIsDisplayed()
                        .verifyButtonIsDisabled(C.buttons.save)
                        .populateAllCustomFields(D.newCase)
                        .selectUserGroup(userGroupA, true)
                        .clickSave();
                    ui.caseView.verifyAllValues(D.newCase)
                        .selectTab(C.caseTabs.customData)
                        .expandCustomForm()
                        .verifyAllCustomValues(D.newCase);
        });
        });
    })
})


