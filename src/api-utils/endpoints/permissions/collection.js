const generic_request = require('../../generic-api-requests');
const body = require('./payload');

exports.set_VIEW_permissions_for_an_existing_Permission_group = function (group, shouldEnable) {
    generic_request.POST(
        '/api/security/organizations/bulksave',
        body.generate_POST_request_payload_for_bulk_saving_VIEW_PERMISSIONS(group, shouldEnable),
        "Permissions updated via API")
};

exports.set_CREATE_permissions_for_an_existing_Permission_group = function (group, shouldEnable) {
    generic_request.POST(
        '/api/security/organizations/bulksave',
        body.generate_POST_request_payload_for_bulk_saving_CREATE_PERMISSIONS(group, shouldEnable),
        "Permissions updated via API")
};

exports.set_UPDATE_permissions_for_an_existing_Permission_group = function (group, shouldEnable) {
    generic_request.POST(
        '/api/security/organizations/bulksave',
        body.generate_POST_request_payload_for_bulk_saving_UPDATE_PERMISSIONS(group, shouldEnable),
        "Permissions updated via API")
};

exports.set_DELETE_permissions_for_an_existing_Permission_group = function (group, shouldEnable) {
    generic_request.POST(
        '/api/security/organizations/bulksave',
        body.generate_POST_request_payload_for_bulk_saving_DELETE_PERMISSIONS(group, shouldEnable),
        "Permissions updated via API")
};

exports.update_ALL_permissions_for_an_existing_Permission_group = function (group, createEnabled, viewEnabled, updateEnabled, deleteEnabled) {
    exports.set_CREATE_permissions_for_an_existing_Permission_group(group, createEnabled);
    exports.set_VIEW_permissions_for_an_existing_Permission_group(group, viewEnabled);
    exports.set_UPDATE_permissions_for_an_existing_Permission_group(group, updateEnabled);
    exports.set_DELETE_permissions_for_an_existing_Permission_group(group, deleteEnabled);
    return this;
};

exports.assign_Org_Admin_permissions_to_user = function (userObjectOrId, office1_ID, group1_ID, office2_ID = null, group2_ID = null, office3_ID = null, group3_ID = null) {

    cy.getLocalStorage(userObjectOrId).then(user => {
        let userId = user? JSON.parse(user).id : userObjectOrId;

        generic_request.POST(
            '/api/groups/userperms',
            body.generate_POST_request_payload_for_assigning_office_based_permissions(userId, true, office1_ID, group1_ID, office2_ID, group2_ID, office3_ID, group3_ID),
            "Assigning office-based permissions via API")
    })
};

exports.assign_office_based_permissions_to_user = function (userObjectOrId, office1_ID, group1_ID, office2_ID = null, group2_ID = null, office3_ID = null, group3_ID = null) {

    cy.getLocalStorage(userObjectOrId).then(user => {
        let userId = user ? JSON.parse(user).id : userObjectOrId;
        generic_request.POST(
            '/api/groups/userperms',
            body.generate_POST_request_payload_for_assigning_office_based_permissions(userId, false, office1_ID, group1_ID, office2_ID, group2_ID, office3_ID, group3_ID),
            "Assigning office-based permissions via API")
    })
};

exports.assign_user_to_User_Group = function (user, group) {

    generic_request.PUT(
        '/api/usergroups/editUserGroup',
        body.generate_PUT_request_payload_for_assigning_user_to_User_Group(user, group),
        "Assigning user to User Group via API")
};
