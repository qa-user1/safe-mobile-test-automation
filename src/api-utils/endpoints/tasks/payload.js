const S = require('../../../test/utils/settings.js');
const C = require('../../../test/utils/constants.js');
const D = require('../../../test/utils/data.js');
const userAccounts = require('../../../test/utils/user-accounts.js');

exports.generate_POST_request_payload_for_creating_new_task = function (user, group, taskObject) {
    let taskData = taskObject ? Object.assign({}, taskObject) : Object.assign({}, D.newTask),
        assignedUserIds = user ? [taskData.userId] : [],
        userGroupIds = group ? [taskData.groupId] : [];

    let body = {
        assignedUserIds: assignedUserIds,
        creatorId: S.selectedUser.id,
        dueDate: taskData.dueDate,
        message: taskData.message,
        taskAttachments: [],
        title: taskData.title,
        userGroupIds: userGroupIds,
        //"taskAttachments": [{"taskId": null, "entityId": entityId, "entityType": 0}]
    };
    return body;
};
