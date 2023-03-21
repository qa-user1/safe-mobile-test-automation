import D from '../utils/data';
import C from '../utils/constants';
import S from '../utils/settings';

const ui = require('../pages/ui-spec');
const api = require('../../api-utils/api-spec');
let admin, admin2, powerUser;

before(async () => {
    admin = S.getUserData(S.userAccounts.orgAdmin);
    admin2 = S.getUserData(S.userAccounts.orgAdmin2);
    powerUser = S.getUserData(S.userAccounts.powerUser);

});

describe('Add Task', () => {
    before(() => {
        ui.login.logIn(admin);
    });

    afterEach(() => {
        ui.app.cleanUp()
    });

    context('A.T_1 Add Task - Org Admin', () => {

        it('A.T_1.1 Add Task with required fields only / Verify Task cannot be added with empty required fields ', () => {
            D.getNewTaskData(null, null);

            ui.menu.navigateToTasks();
            ui.addTask.clickAddButton()
                .enterSpaceToTitleAndMessageFields()
                .verifyButtonIsDisabled(C.buttons.save)
                .enterTitle(D.newTask)
                .enterMessage(D.newTask)
                .clickSave();
            ui.taskView.verifyValuesOnTaskGrid(D.newTask)
                .openTaskDetailsPage(D.newTask)
                .verifyAllValues(D.newTask);
        });


        it('A.T_1.2 Add Task assigned to User and check if the same User is shown on User typeahead', () => {
            D.getNewTaskData(powerUser, null);

            ui.menu.navigateToTasks();
            ui.addTask.clickAddButton()
                  .populateAllFields(D.newTask)
                  .verifyAlreadySelectedValueIsNotShownOnTypeahead(C.placeholders.usersAndGroups, D.newTask.user)
                  .clickSave();
            ui.taskView.verifyValuesOnTaskGrid(D.newTask)
                      .openTaskDetailsPage(D.newTask)
            D.newTask.user = S.userAccounts.powerUser.name + ' (' + S.userAccounts.powerUser.email + ')'
            ui.taskView.verifyAllValues(D.newTask);
    });

        it('A.T_1.3 Add Task assigned to User Group and check if the same User Group is shown on User group typeahead', () => {
            D.getNewTaskData(null, S.selectedEnvironment.admin_userGroup);

            ui.menu.navigateToTasks();
            ui.addTask.clickAddButton()
                .populateAllFields(D.newTask)
                .verifyAlreadySelectedValueIsNotShownOnTypeahead(C.placeholders.usersAndGroups, D.newTask.group)
                .clickSave();
            ui.taskView.verifyValuesOnTaskGrid(D.newTask)
                .openTaskDetailsPage(D.newTask)
                .verifyAllValues(D.newTask);
        });
})

});


