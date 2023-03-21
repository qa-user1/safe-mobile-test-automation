import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';
import helper from '../utils/helper';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser, externalUser

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);
    externalUser = S.getUserData((S.userAccounts.org2Admin))

});

describe('Search Case', () => {

    before(() => {
        ui.login.logIn(admin);
    });

    afterEach(() => {
        ui.app.cleanUp()
    });

    context('C.S_1 Case Officer(s)', () => {

    context('C.S_1.1 equals (or)', () => {
        context('C.S_1.1.1/2 User A saved as Case Officer', () => {
        before(async () => {
            await api.auth.get_tokens(admin2)
            await api.org_settings.enable_all_Case_fields();
            D.generateNewDataSet();
            await api.cases.add_new_case(D.newCase.caseNumber);
        });
        it('C.S_1.1.1 User A & User B selected in Search criteria -> Case Officer(s) field',  () => {

            const userA = admin,
                  userB = powerUser

            ui.searchCase.closeSearchParametersScreen()
            ui.menu.navigateTo(C.menu.searchCase);
            ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                         .selectUser(userA.firstName)
                         .selectUser(userB.firstName)
                         .clickButton(C.buttons.search)
            ui.searchCase.verifySearchResult(D.newCase)

        });

        it('C.S_1.1.2 UserGroup A selected in Search criteria -> Case Officer(s) field',  () => {

            const userGroupA = S.selectedEnvironment.admin_userGroup.name

            ui.searchCase.closeSearchParametersScreen()
            ui.menu.navigateTo(C.menu.searchCase);
            ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                .selectUserGroup(userGroupA)
                .clickButton(C.buttons.search)
                .verifyCountOfResult('(No Cases)')

        });
        });

        context('C.S_1.1.3 UserGroup A saved as Case Officer', () => {
        before(async () => {
            await api.auth.get_tokens(admin2)
            await api.org_settings.enable_all_Case_fields();
            D.generateNewDataSet();
            D.newCase.caseOfficerGroupIds = [S.selectedEnvironment.admin_userGroup.id]
            D.newCase.caseOfficerId = []
            await api.cases.add_new_case(D.newCase.caseNumber);
        });
        it('C.S_1.1.3 UserGroup A, UserGroup B & User A selected in Search criteria -> Case Officer(s) field',  () => {

            const userA = admin,
                  userGroupA = S.selectedEnvironment.admin_userGroup.name,
                  userGroupB = S.selectedEnvironment.power_userGroup.name

            ui.searchCase.closeSearchParametersScreen()
            ui.menu.navigateTo(C.menu.searchCase);
            ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                .selectUserGroup(userGroupA)
                .selectUserGroup(userGroupB)
                .selectUser(userA.firstName)
                .clickButton(C.buttons.search)
            D.newCase.caseOfficerFullName = userGroupA
            ui.searchCase.verifySearchResult(D.newCase)

        });
        });

        context('C.S_1.1.4 UserGroup A & User A saved as Case Officers', () => {
        before(async () => {
            await api.auth.get_tokens(admin2)
            await api.org_settings.enable_all_Case_fields();
            D.generateNewDataSet();
            D.newCase.caseOfficerGroupIds =  [S.selectedEnvironment.admin_userGroup.id]
            await api.cases.add_new_case(D.newCase.caseNumber);
        });
        it('C.S_1.1.4 UserGroup A is selected in Search criteria -> Case Officer(s) field',  () => {

            const userA = admin,
                userGroupA = S.selectedEnvironment.admin_userGroup.name

            ui.searchCase.closeSearchParametersScreen()
            ui.menu.navigateTo(C.menu.searchCase);
            ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                .selectUserGroup(userGroupA)
                .clickButton(C.buttons.search)
            D.newCase.caseOfficerFullName = userGroupA + ',' + userA.name
            ui.searchCase.verifySearchResult(D.newCase)

        });
    });
    });

        context('C.S_1.2 equals (and)', () => {
            context('C.S_1.2.1 User A saved as Case Officer', () => {
            before(async () => {
                await api.auth.get_tokens(admin2)
                await api.org_settings.enable_all_Case_fields();
                D.generateNewDataSet();
                await api.cases.add_new_case(D.newCase.caseNumber);
            });
            it('C.S_1.2.1 User A & User B selected in Search criteria -> Case Officer(s) field',  () => {

                const userA = admin,
                      userB = powerUser

                ui.searchCase.closeSearchParametersScreen()
                ui.menu.navigateTo(C.menu.searchCase);
                ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                    .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.equalsAnd)
                    .selectUser(userA.firstName)
                    .selectUser(userB.firstName)
                    .clickButton(C.buttons.search)
                    .verifyCountOfResult('(No Cases)')

            });
            });

            context('C.S_1.2.2 UserGroup A saved as Case Officer', () => {
            before(async () => {
                await api.auth.get_tokens(admin2)
                await api.org_settings.enable_all_Case_fields();
                D.generateNewDataSet();
                D.newCase.caseOfficerGroupIds =  [S.selectedEnvironment.admin_userGroup.id]
                D.newCase.caseOfficerId =  []
                await api.cases.add_new_case(D.newCase.caseNumber);
            });
            it('C.S_1.2.2 UserGroup A & User A are selected in Search criteria -> Case Officer(s) field',  () => {

                const userA = admin,
                      userGroupA = S.selectedEnvironment.admin_userGroup.name

                ui.searchCase.closeSearchParametersScreen()
                ui.menu.navigateTo(C.menu.searchCase);
                ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                    .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.equalsAnd)
                    .selectUserGroup(userGroupA)
                    .selectUser(userA.firstName)
                    .clickButton(C.buttons.search)
                    .verifyCountOfResult('(No Cases)')

            });
            });

            context('C.S_1.2.3 User A & User B saved as Case Officer', () => {
            before(async () => {
                await api.auth.get_tokens(admin2)
                await api.org_settings.enable_all_Case_fields();
                D.generateNewDataSet();
                D.newCase.caseOfficerGroupIds =  []
                D.newCase.caseOfficerId =  [admin.id, powerUser.id ]
                await api.cases.add_new_case(D.newCase.caseNumber);
            });
            it('C.S_1.2.3 User A & User B are selected in Search criteria -> Case Officer(s) field',  () => {

                const userA = admin,
                      userB = powerUser

                ui.searchCase.closeSearchParametersScreen()
                ui.menu.navigateTo(C.menu.searchCase);
                ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                    .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.equalsAnd)
                    .selectUser(userA.firstName)
                    .selectUser(userB.firstName)
                    .clickButton(C.buttons.search)
                D.newCase.caseOfficerFullName = userA.name + ',' + userB.name
                ui.searchCase.verifySearchResult(D.newCase)

            });
            });

            context('C.S_1.2.4 UserGroup A & User A saved as Case Officer', () => {
            before(async () => {
                await api.auth.get_tokens(admin2)
                await api.org_settings.enable_all_Case_fields();
                D.generateNewDataSet();
                D.newCase.caseOfficerGroupIds =  [S.selectedEnvironment.admin_userGroup.id]
                await api.cases.add_new_case(D.newCase.caseNumber);
            });
            it('C.S_1.2.4 UserGroup A & User A are selected in Search criteria -> Case Officer(s) field',  () => {

                const userA = admin,
                      userGroupA = S.selectedEnvironment.admin_userGroup.name

                ui.searchCase.closeSearchParametersScreen()
                ui.menu.navigateTo(C.menu.searchCase);
                ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                    .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.equalsAnd)
                    .selectUserGroup(userGroupA)
                    .selectUser(userA.firstName)
                    .clickButton(C.buttons.search)
                D.newCase.caseOfficerFullName = userGroupA + ',' + userA.name
                ui.searchCase.verifySearchResult(D.newCase)

            });
            });
        });


        context('C.S_1.3 not equals', () => {
            context('C.S_1.3.1/2/3 User A saved as Case Officer', () => {
                before(async () => {
                    await api.auth.get_tokens(admin2)
                    await api.org_settings.enable_all_Case_fields();
                    D.generateNewDataSet();
                    await api.cases.add_new_case(D.newCase.caseNumber);
                });
                it('C.S_1.3.1 User A & User B are selected in Search criteria -> Case Officer(s) field',  () => {

                    const userA = admin,
                          userB = powerUser

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUser(userA.firstName)
                        .selectUser(userB.firstName)
                        .clickButton(C.buttons.search)
                        .verifyCountOfResult('(No Cases)')

                });


                it('C.S_1.3.2 UserGroup A selected in Search criteria -> Case Officer(s) field',  () => {

                    const userA = admin,
                        userGroupA = S.selectedEnvironment.admin_userGroup.name

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUserGroup(userGroupA)
                        .clickButton(C.buttons.search)
                    ui.searchCase.verifySearchResult(D.newCase)

                });

                it('C.S_1.3.3 User A selected in Search criteria -> Case Officer(s) field',  () => {

                    const userA = admin

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUser(userA.firstName)
                        .clickButton(C.buttons.search)
                        .verifyCountOfResult('(No Cases)')

                });
            });

            context('C.S_1.3.4/5/6 UserGroup A saved as Case Officer', () => {
                before(async () => {
                    await api.auth.get_tokens(admin2)
                    await api.org_settings.enable_all_Case_fields();
                    D.generateNewDataSet();
                    D.newCase.caseOfficerGroupIds = [S.selectedEnvironment.admin_userGroup.id]
                    D.newCase.caseOfficerId = []
                    await api.cases.add_new_case(D.newCase.caseNumber);
                });
                it('C.S_1.3.4 UserGroup B & User A are selected in Search criteria -> Case Officer(s) field',  () => {

                    const userA = admin,
                          userGroupA = S.selectedEnvironment.admin_userGroup.name,
                          userGroupB = S.selectedEnvironment.power_userGroup.name

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUserGroup(userGroupB)
                        .selectUser(userA.firstName)
                        .clickButton(C.buttons.search)
                    D.newCase.caseOfficerFullName = userGroupA.name
                    ui.searchCase.verifySearchResult(D.newCase)

                });

                it('C.S_1.3.5 UserGroup A is selected in Search criteria -> Case Officer(s) field',  () => {

                    const userGroupA = S.selectedEnvironment.admin_userGroup.name

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUserGroup(userGroupA)
                        .clickButton(C.buttons.search)
                        .verifyCountOfResult('(No Cases)')

                });

                it('C.S_1.3.6 UserGroup B is selected in Search criteria -> Case Officer(s) field',  () => {

                    const userGroupA = S.selectedEnvironment.admin_userGroup.name,
                          userGroupB = S.selectedEnvironment.power_userGroup.name

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUserGroup(userGroupB)
                        .clickButton(C.buttons.search)
                    D.newCase.caseOfficerFullName = userGroupA.name
                    ui.searchCase.verifySearchResult(D.newCase)

                });
            });

            context('C.S_1.3.7 UserGroup A & User A saved as Case Officers', () => {
                before(async () => {
                    await api.auth.get_tokens(admin2)
                    await api.org_settings.enable_all_Case_fields();
                    D.generateNewDataSet();
                    D.newCase.caseOfficerGroupIds =  [S.selectedEnvironment.admin_userGroup.id]
                    await api.cases.add_new_case(D.newCase.caseNumber);
                });
                it('C.S_1.3.7 User A is selected in Search criteria -> Case Officer(s) field',  () => {

                    const userA = admin

                    ui.searchCase.closeSearchParametersScreen()
                    ui.menu.navigateTo(C.menu.searchCase);
                    ui.searchCase.enterCaseNumber(D.newCase.caseNumber)
                        .selectOptionNextToCaseOfficersField(C.searchCriteria.inputFields.notEquals)
                        .selectUser(userA.firstName)
                        .clickButton(C.buttons.search)
                        .verifyCountOfResult('(No Cases)')

                });
            });
        });


    });
    });




