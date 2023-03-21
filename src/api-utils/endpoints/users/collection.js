const generic_request = require('../../generic-api-requests');
const body = require('./payload');
const C = require('../../../test/utils/constants');

exports.add_new_user = function (propertyToSave = 'newUser') {
    generic_request.POST(
        '/api/users',
        body.generate_POST_request_payload_for_Add_User(),
        'Adding new user via API with ID_______',
        propertyToSave,
    );
    return this;
};

exports.deactivate_users = function (arrayOfUsersIdsOrObjectsInStorage) {

    let userIds = []

    arrayOfUsersIdsOrObjectsInStorage.forEach((user, index, array) => {
        cy.getLocalStorage(user).then(user => {

            if (user) {
                userIds.push(JSON.parse(user).id)
            } else {
                userIds = arrayOfUsersIdsOrObjectsInStorage
            }

            if (index === (array.length - 1)) {
                generic_request.PUT(
                    '/api/users/DeactivateUsers',
                    userIds,
                    'Deactivating users via API with IDs_______' + userIds
                );
            }
        })
    })
    return this;
};

exports.deactivate_previously_created_user = function () {
    cy.getLocalStorage("newUserAccount").then(newUser => {
        newUser = JSON.parse(newUser)

        generic_request.PUT(
            '/api/users/DeactivateUsers',
            [newUser.id],
            'Deactivating previously created user via API with ID_______' + newUser.id
        );
    });
    return this;
};

exports.remove_external_users = function (arrayOfUsersIdsOrObjectsInStorage) {

    let userIds = []

    arrayOfUsersIdsOrObjectsInStorage.forEach((user, index, array) => {
        cy.getLocalStorage(user).then(user => {

            if (user) {
                userIds.push(JSON.parse(user).id)
            } else {
                userIds = arrayOfUsersIdsOrObjectsInStorage
            }

            if (index === (array.length - 1)) {
                generic_request.POST(
                    '/api/groups/removeExternal',
                    userIds,
                    'Removing external users via API with IDs_______' + userIds
                );
            }
        })
    })
    return this;
};

exports.get_current_user_settings = function (userId) {

    generic_request.GET(
        '/api/users/' + userId + '/userSettings',
        'Getting current user settings via API for user with ID_____' + userId,
        'currentUserSettings'
    );
    return this;
}

exports.update_current_user_settings = function (userId, dateTimeFormat = 'full', dateFormat = 'fullDate') {
    exports.get_current_user_settings(userId);

    cy.getLocalStorage('currentUserSettings').then(userSettings => {
        cy.getLocalStorage('orgSettings').then(orgSettings => {
            userSettings = JSON.parse(userSettings);
            orgSettings = JSON.parse(orgSettings);

            userSettings.dateFormat = dateFormat.name || dateFormat;
            userSettings.dateTimeFormat = dateTimeFormat.name || dateTimeFormat;

            cy.setLocalStorage("profile", JSON.stringify(
                {
                    "id": userSettings.id,
                    "organizationId": userSettings.organizationId,
                    "officeId": userSettings.officeId,
                    "dateFormat": userSettings.dateFormat,
                    "dateTimeFormat": userSettings.dateTimeFormat,
                    "useDateFormatOnly": userSettings.useDateFormatOnly,
                    "idle": orgSettings.idle,
                    "timeout": orgSettings.timeout,
                    "isAdmin": userSettings.isAdmin,
                    "showNewUserPopup": true,
                    "signatureConfig": orgSettings.signatureConfiguration,
                    "organizationType": 1
                }))

            generic_request.PUT(
                '/api/users/' + userSettings.id + '/updateownprofile',
                userSettings,
                'Updating current settings via API',
                'currentUserSettings'
            );

        })
    })

    C.currentDateTimeFormat = C.dateTimeFormats[dateTimeFormat.name] || C.dateTimeFormats[dateTimeFormat]
    C.currentDateFormat = C.dateFormats[dateFormat.name] || C.dateFormats[dateFormat]

    return this;
}

exports.update_password = async function (currentPassword, newPassword) {
    await generic_request.POST(
        '/api/users/updatePassword',
        body.generate_POST_request_payload_for_Update_Password(currentPassword, newPassword),
        'Updating password via API'
    );
}



