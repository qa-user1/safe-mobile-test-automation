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

describe('Edit Task', () => {

    before(() => {
        ui.login.logIn(admin);
    });

    afterEach(() => {
        ui.app.cleanUp()
    });

    context('E.T_1 Edit Task - Org Admin', () => {
        before(async () => {
            D.getNewTaskData(null, null)
            await api.auth.get_tokens(admin2);
            await api.tasks.add_new_task()
        });

        it('E.T_1.1 Edit all Tasks fields', () => {
            D.getEditedTaskData(externalUser, null);

            ui.menu.navigateToTasks();
            ui.taskView.openTaskDetailsPage(D.newTask)
                .clickEditButton()
                .editAllValues(D.editedTask)
                .clickSave();
            D.editedTask.user = S.userAccounts.org2Admin.name + ' (' + S.userAccounts.org2Admin.email + ')'
            D.editedTask.createdBy = S.userAccounts.orgAdmin2.name
            ui.taskView.verifyAllValues(D.editedTask);
        });
    });

    context('E.T_2 Verify edited values are not displayed after clicking Cancel button', () => {

        context('E.T_2.1 Create Task with required fields only', () => {
        before(async () => {
            D.getNewTaskData(null, null)
            await api.auth.get_tokens(admin2);
            await api.tasks.add_new_task()
        });

      it('E.T_2.1 Edit all fields and click Cancel button ', () => {
        D.getEditedTaskData(externalUser, null);

        ui.menu.navigateToTasks();
        ui.taskView.openTaskDetailsPage(D.newTask)
            .clickEditButton()
            .editAllValues(D.editedTask)
            .clickCancel();
          D.newTask.createdBy = S.userAccounts.orgAdmin2.name
        ui.taskView.verifyAllValues(D.newTask);
    });
    });

        context('E.T_2.2 Create Task assigned to User and User Group', () => {
            before(async () => {
                D.getNewTaskData(powerUser, S.selectedEnvironment.admin_userGroup)
                await api.auth.get_tokens(admin2);
                await api.tasks.add_new_task(powerUser, S.selectedEnvironment.admin_userGroup)
            });

        it('E.T_2.2 Edit Users and groups field and click Cancel button', () => {
            D.getEditedTaskData(externalUser, S.selectedEnvironment.power_userGroup);
            D.newTask.createdBy = S.userAccounts.orgAdmin2.name
            D.newTask.user = S.userAccounts.powerUser.name + ' (' + S.userAccounts.powerUser.email + ')'

            ui.menu.navigateToTasks();
            ui.taskView.openTaskDetailsPage(D.newTask)
                .clickEditButton()
                .clearUsersAndGroupsField()
                .clickCancel()
            ui.taskView.verifyAllValues(D.newTask);
            ui.taskView.clickEditButton()
                .clearUsersAndGroupsField()
                .addUser(D.editedTask.user)
                .addGroup(D.editedTask.group)
                .clickCancel()
               .verifyAllValues(D.newTask);
        });
    });
    });


});


