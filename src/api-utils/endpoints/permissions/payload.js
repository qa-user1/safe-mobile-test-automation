const S = require ('../../../test/utils/settings');

exports.generate_POST_request_payload_for_bulk_saving_VIEW_PERMISSIONS = function (group, shouldEnable) {

    let body =[
        {
            "id": group.startingIndexForViewPermissions,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 4,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions+1,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 5,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions + 2,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 7,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions + 3,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 9,
            "modelTypeId": 7,
            "grant": !shouldEnable,
        },
        {
            "id": group.startingIndexForViewPermissions + 4,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 36,
            "grant": shouldEnable
        },
        {
            "id": group.startingIndexForViewPermissions + 5,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 9,
            "modelTypeId": 36,
            "grant": !shouldEnable
        },
        {
            "id": group.startingIndexForViewPermissions + 6,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 27,
            "grant": shouldEnable
        },
        {
            "id": group.startingIndexForViewPermissions + 7,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 9,
            "modelTypeId": 27,
            "grant": !shouldEnable
        },
        {
            "id": group.startingIndexForViewPermissions + 8,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 11,
            "grant": shouldEnable
        },
        {
            "id": group.startingIndexForViewPermissions + 9,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 14,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions + 10,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,

            "modelTypeId": 10,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions + 11,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 6,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions + 12,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 32,
            "grant": shouldEnable,

        },
        {
            "id": group.startingIndexForViewPermissions + 13,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "accessTypeId": 1,
            "modelTypeId": 34,
            "grant": shouldEnable,

        }
    ]
    return body;
};

exports.generate_POST_request_payload_for_bulk_saving_CREATE_PERMISSIONS = function (group, shouldEnable) {
    let body = [
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 4,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 5,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 1
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 7,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 2
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 27,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 3
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 11,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 4
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 16,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 5
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 17,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 6
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 19,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 7
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 20,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 8
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 18,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 9
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 14,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 10
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 10,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 11
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 6,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 12
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 32,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 13
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 34,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 14
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 35,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 15
        },
        {
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "modelTypeId": 8,
            "accessTypeId": 4,
            "grant": shouldEnable,
            "id": group.startingIndexForCreatePermissions + 16
        }
    ]
    return body;
};

exports.generate_POST_request_payload_for_bulk_saving_UPDATE_PERMISSIONS = function (group, shouldEnable) {
    let body = [
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 4,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 1,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 5,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 2,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 7,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 3,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 11,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 4,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 14,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 5,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 10,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 6,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 6,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 7,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 32,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForUpdatePermissions + 8,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 3,
            "accessType": null,
            "modelTypeId": 34,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        }
    ]
    return body;
};

exports.generate_POST_request_payload_for_bulk_saving_DELETE_PERMISSIONS = function (group, shouldEnable) {
    let body = [
        {
            "entity": null,
            "id": group.startingIndexForDeletePermissions,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 5,
            "accessType": null,
            "modelTypeId": 7,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForDeletePermissions + 1,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 5,
            "accessType": null,
            "modelTypeId": 19,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForDeletePermissions + 2,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 5,
            "accessType": null,
            "modelTypeId": 14,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForDeletePermissions + 3,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 5,
            "accessType": null,
            "modelTypeId": 6,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        },
        {
            "entity": null,
            "id": group.startingIndexForDeletePermissions + 4,
            "entityId": S.selectedEnvironment.orgSettings.id,
            "groupId": group.id,
            "group": null,
            "accessTypeId": 5,
            "accessType": null,
            "modelTypeId": 8,
            "modelType": null,
            "grant": shouldEnable,
            "reqParams": null,
            "restangularized": true,
            "fromServer": true,
            "parentResource": {
                "route": "groups",
                "parentResource": {
                    "route": "organizations",
                    "parentResource": {
                        "route": "security",
                        "parentResource": null
                    }
                },
                "id": group.id
            },
            "restangularCollection": false
        }
    ];
    return body;
};

exports.generate_POST_request_payload_for_assigning_office_based_permissions = function (userId, isOrgAdmin, office1_ID, group1_ID, office2_ID = null, group2_ID = null, office3_ID = null, group3_ID = null) {
    let body = {
        "UserIds": [
            userId
        ],
        "OfficeToGroups": [
            {
                "officeId": office1_ID,
                "groupIds": [group1_ID]
            }
        ],
        "isOrgAdmin": isOrgAdmin,
        "ExternalUserIdsForRemoval": []
    };

    if (office2_ID){
        body.OfficeToGroups[1].officeId = office2_ID
        body.OfficeToGroups[1].groupIds = [group2_ID]
    }

    if (office3_ID){
        body.OfficeToGroups[1].officeId = office3_ID
        body.OfficeToGroups[1].groupIds = [group3_ID]
    }

    return body;
};


exports.generate_PUT_request_payload_for_assigning_user_to_User_Group = function (user, group) {
    let body = {
        id: group.id,
        name: group.name,
        description: 'for test automation',
        userIds: [user.id]
    }
    return body;
};


