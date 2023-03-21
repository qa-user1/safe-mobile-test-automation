const S = require('../../../test/utils/settings.js');
const C = require('../../../test/utils/constants.js');

function shouldFieldBeEnabled (fieldsToEnable, field) {
    return fieldsToEnable ? fieldsToEnable.includes(field) : false;
}

function shouldFieldBeDisabled (fieldsToDisable, field) {
    return fieldsToDisable ? fieldsToDisable.includes(field) : false;
}

function shouldFieldBeOptional (optionalFields, field) {
    return optionalFields ? optionalFields.includes(field) : false;
}

exports.generate_request_payload_for_disabling_Case_fields = function (fieldsToEnable) {

    let body = [];

    if (!shouldFieldBeEnabled(fieldsToEnable, C.caseFields.offenseLocation)) {
        body.push({
                'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseLocation,
                'entityType': 0,
                'name': 'CASE_OFFENSE_LOCATION',
                'recordType': 0,
            },
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseLocation,
                'entityType': 0,
                'name': 'CASE_OFFENSE_LOCATION',
                'recordType': 1,
            });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.caseFields.offenseDescription)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseDescription,
            'entityType': 0,
            'name': 'CASE_OFFENSE_DESCRIPTION',
            'recordType': 1,
        });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.caseFields.tags)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.case.tags,
                'entityType': 0,
                'name': 'GENERAL.TAGS',
                'recordType': 1,
            });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.caseFields.offenseDate)) {
        body.push({
                'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseDate,
                'entityType': 0,
                'name': 'CASE_OFFENSE_DATE',
                'recordType': 0,
            },
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseDate,
                'entityType': 0,
                'name': 'CASE_OFFENSE_DATE',
                'recordType': 1,
            });
    }

    return body;
};

exports.generate_request_payload_for_setting_Case_fields_as_not_required = function () {
    let body = [
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseLocation,
            'entityType': 0,
            'name': 'CASE_OFFENSE_LOCATION',
            'recordType': 0,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.case.offenseLocation,
            'entityType': 0,
            'name': 'CASE_OFFENSE_DATE',
            'recordType': 0,
        },
    ];
    return body;
};

exports.generate_request_payload_for_setting_visible_and_required_Item_fields = function (fieldsToDisable, optionalFields) {
    let body = [];

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.custodyReason)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.custodyReason,
                'entityType': 1,
                'name': 'ITEM_CUSTODY_REASON',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.recoveredBy)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredBy,
                'entityType': 1,
                'name': 'ITEM_RECOVERED_BY',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.make)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.make,
                'entityType': 1,
                'name': 'ITEM_MAKE',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.model)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.model,
                'entityType': 1,
                'name': 'ITEM_MODEL',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.serialNumber)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.serialNumber,
                'entityType': 1,
                'name': 'ITEM_SERIAL_NUMBER',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.additionalBarcodes)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.barcodes,
                'entityType': 1,
                'name': 'ITEM_BARCODES',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.tags)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.tags,
                'entityType': 1,
                'name': 'GENERAL.TAGS',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.itemBelongsTo)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.itemBelongsTo,
                'entityType': 1,
                'name': 'PEOPLE.ITEM_BELONGS_TO',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.expectedReturnDate)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.expectedReturnDate,
                'entityType': 1,
                'name': 'ITEM.EXPECTED_RETURN_DATE',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.actualDisposedDate)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.actualDisposedDate,
                'entityType': 1,
                'name': 'ITEMS.DISPOSAL.ACTUAL_DISPOSED_DATE',
                'recordType': 1,
            },
        );
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.recoveryDate)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveryDate,
                'entityType': 1,
                'name': 'ITEM_RECOVERY_DATE',
                'recordType': 1,
            });
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.recoveryLocation)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredAt,
                'entityType': 1,
                'name': 'ITEM_RECOVERED_AT',
                'recordType': 1,
            });
    }

    if (shouldFieldBeDisabled(fieldsToDisable, C.itemFields.description)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.description,
                'entityType': 1,
                'name': 'ITEM_DESCRIPTION',
                'recordType': 1,
            });
    }

    if (shouldFieldBeOptional(optionalFields, C.itemFields.recoveryDate)) {
        body.push(
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveryDate,
                'entityType': 1,
                'name': 'ITEM_RECOVERY_DATE',
                'recordType': 0,
            });
    }

    if (shouldFieldBeOptional(optionalFields, C.itemFields.recoveryLocation)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredAt,
            'entityType': 1,
            'name': 'ITEM_RECOVERED_AT',
            'recordType': 0,
        });
    }

    if (shouldFieldBeOptional(optionalFields, C.itemFields.description)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.item.description,
            'entityType': 1,
            'name': 'ITEM_DESCRIPTION',
            'recordType': 0,
        });
    }

    return body;
};

exports.generate_request_payload_for_disabling_Item_fields = function (fieldsToEnable) {
    let body = [
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.make,
            'entityType': 1,
            'name': 'ITEM_MAKE',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.model,
            'entityType': 1,
            'name': 'ITEM_MODEL',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.serialNumber,
            'entityType': 1,
            'name': 'ITEM_SERIAL_NUMBER',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.barcodes,
            'entityType': 1,
            'name': 'ITEM_BARCODES',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.tags,
            'entityType': 1,
            'name': 'GENERAL.TAGS',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.itemBelongsTo,
            'entityType': 1,
            'name': 'PEOPLE.ITEM_BELONGS_TO',
            'recordType': 1,
        },
    ];

    if (!shouldFieldBeEnabled(fieldsToEnable, C.itemFields.recoveryDate)) {
        body.push({
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveryDate,
                'entityType': 1,
                'name': 'ITEM_RECOVERY_DATE',
                'recordType': 0,
            },
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveryDate,
                'entityType': 1,
                'name': 'ITEM_RECOVERY_DATE',
                'recordType': 1,
            });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.itemFields.recoveryLocation)) {
        body.push({
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredAt,
                'entityType': 1,
                'name': 'ITEM_RECOVERED_AT',
                'recordType': 0,
            },
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredAt,
                'entityType': 1,
                'name': 'ITEM_RECOVERED_AT',
                'recordType': 1,
            });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.itemFields.description)) {
        body.push({
                'orgFieldId': S.selectedEnvironment.fieldIds.item.description,
                'entityType': 1,
                'name': 'ITEM_DESCRIPTION',
                'recordType': 0,
            },
            {
                'orgFieldId': S.selectedEnvironment.fieldIds.item.description,
                'entityType': 1,
                'name': 'ITEM_DESCRIPTION',
                'recordType': 1,
            });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.itemFields.recoveredBy)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredBy,
            'entityType': 1,
            'name': 'ITEM_RECOVERED_BY',
            'recordType': 1,
        });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.itemFields.custodyReason)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.item.custodyReason,
            'entityType': 1,
            'name': 'ITEM_CUSTODY_REASON',
            'recordType': 1,
        });
    }

    return body;
};

exports.generate_request_payload_for_setting_Item_fields_as_not_required = function () {
    let body = [
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.recoveredAt,
            'entityType': 1,
            'name': 'ITEM_RECOVERED_AT',
            'recordType': 0,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.item.description,
            'entityType': 1,
            'name': 'ITEM_DESCRIPTION',
            'recordType': 0,
        },
        {
            'orgFieldId': 37,
            'entityType': 1,
            'name': 'ITEM_RECOVERY_DATE',
            'recordType': 0,
        },
    ];
    return body;
};

exports.generate_request_payload_for_disabling_Person_fields = function (fieldsToEnable) {
    let body = [
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.middleName,
            'entityType': 2,
            'name': 'GENERAL.MIDDLENAME',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.alias,
            'entityType': 2,
            'name': 'GENERAL.ALIAS',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.driverLicense,
            'entityType': 2,
            'name': 'GENERAL.DRIVERLICENCE',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.race,
            'entityType': 2,
            'name': 'GENERAL.RACE',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.gender,
            'entityType': 2,
            'name': 'GENERAL.GENDER',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.mobilePhone,
            'entityType': 2,
            'name': 'GENERAL.MOBILE_PHONE',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.otherPhone,
            'entityType': 2,
            'name': 'GENERAL.OTHER_PHONE',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.deceased,
            'entityType': 2,
            'name': 'GENERAL.DECEASED',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.juvenile,
            'entityType': 2,
            'name': 'GENERAL.JUVENILE',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.email,
            'entityType': 2,
            'name': 'GENERAL.EMAIL',
            'recordType': 1,
        },
        {
            'orgFieldId': S.selectedEnvironment.fieldIds.person.address,
            'entityType': 2,
            'name': 'GENERAL.ADDRESS',
            'recordType': 1,
        }];

    if (!shouldFieldBeEnabled(fieldsToEnable, C.personFields.businessName)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.person.businessName,
            'entityType': 2,
            'name': 'GENERAL.BUSINESSNAME',
            'recordType': 1,
        });
    }

    if (!shouldFieldBeEnabled(fieldsToEnable, C.personFields.dateOfBirth)) {
        body.push({
            'orgFieldId': S.selectedEnvironment.fieldIds.person.dob,
            'entityType': 2,
            'name': 'GENERAL.DOB',
            'recordType': 1,
        });
    }

    return body;
};

exports.generate_request_payload_for_editing_Org = function (
    orgSettings,
    useCLP = true,
    itemBelongsToShowsAllPeople = true,
    touchScreenSignature = false,
) {
    let body = Object.assign({}, orgSettings);

    let defaultSignatureDevice = touchScreenSignature ? 0 : 2;
    let noSignature = !touchScreenSignature;

    body.useCaseLevelPermissions = useCLP;
    body.itemBelongsToShowsAllPeople = itemBelongsToShowsAllPeople;

    body.signatureConfiguration.defaultSignatureDevice = defaultSignatureDevice;
    body.signatureConfiguration.noSignatureDeviceSelected = noSignature;
    body.signatureConfiguration.topazSignatureDeviceSelected = false;
    body.signatureConfiguration.touchScreenSignatureDeviceSelected = touchScreenSignature;
    body.personViewConfiguration.formattingString = '';

    //     {
    //     "caseNumberConfiguration": {
    //         "id": orgSettings.id,
    //         "isFormattingRequired": false,
    //         "formattingPattern": null,
    //         "isDefaultCaseNumberPrefix": false,
    //         "defaultCaseNumberPrefix": null
    //     },
    //     "caseNumberOfficeConfigurations": [],
    //     "itemFieldsSet": null,
    //     "organizationOrganizationFields": null,
    //     "personTypes": null,
    //     "personViewConfiguration": null,
    //     "tasksSettingsConfiguration": null,
    //     "id": orgSettings.id,
    //     "guid": orgSettings.guid,
    //     "name": orgSettings.name,
    //     "createDateTime": "2020-12-04T14:35:05.783+00:00",
    //     "updatedDateTime": null,
    //     "isDeleted": null,
    //     "eulaOverride": true,
    //     "isAutoDispositionOn": true,
    //     "isLocationScanOn": false,
    //     "itemBelongsToShowsAllPeople": itemBelongsToShowsAllPeople,
    //     "organizationType": 1,
    //     "signatureConfigurationId": 617,
    //     "signatureConfiguration": {
    //         "id": 617,
    //         "defaultSignatureDevice": 2,
    //         "topazSignatureDeviceSelected": false,
    //         "touchScreenSignatureDeviceSelected": false,
    //         "noSignatureDeviceSelected": true
    //     },
    //     "incomingItems": null,
    //     "loanedItems": null,
    //     "people": [],
    //     "projects": null,
    //     "users": [],
    //     "userGroups": [],
    //     "orgAdmins": [],
    //     "importedNotes": [],
    //     "importedPeople": [],
    //     "importedUsers": [],
    //     "importedItems": [],
    //     "importedCases": [],
    //     "mediaCategories": [],
    //     "noteCategories": [],
    //     "whitelists": [],
    //     "clientConnections": null,
    //     "flatImports": [],
    //     "itemCategories": [],
    //     "offenseTypes": [],
    //     "custodyReasons": [],
    //     "checkOutReasons": [],
    //     "disposalMethods": [],
    //     "announcements": [],
    //     "categoryForms": null,
    //     "reports": null,
    //     "offenseTypeForms": null,
    //     "personTypeForms": null,
    //     "autoDispositionSettings": [],
    //     "mediaAllowedTypes": [],
    //     "samlSettings": null,
    //     "activeDirectoryConfigId": null,
    //     "activeDirectoryConfig": null,
    //     "customItemsViewId": null,
    //     "customItemsView": null,
    //     "customCasesViewId": null,
    //     "customCasesView": null,
    //     "customPeopleViewId": null,
    //     "customPeopleView": null,
    //     "verificationFields": null,
    //     "isExpectedReturnDateNotificationsEnabled": false,
    //     "expectedReturnDateNotificationsDays": null,
    //     "nextItemId": orgSettings.nextItemId,
    //     "nextOrgItemHistoryId": orgSettings.nextOrgItemHistoryId,
    //     "cals": orgSettings.cals,
    //     "license": orgSettings.license,
    //     "photoId": null,
    //     "photoOrganization": null,
    //     "active": true,
    //     "private": false,
    //     "idle": orgSettings.idle,
    //     "timeout": orgSettings.timeout,
    //     "offices": null,
    //     "isElasticSearchOn": true,
    //     "useContainers": false,
    //     "useCaseLevelPermissions": useCLP,
    //     "isAutoIncrementCaseNumberOn": orgSettings.isAutoIncrementCaseNumberOn,
    //     "nextCaseNumber": orgSettings.nextCaseNumber,
    //     "isGoogleAuthenticatorOn": false,
    //     "isItemAddWithCheckedOutStatusOn": false
    // }

    return body;
};

exports.generate_request_payload_for_setting_Signature_configuration = function (
    orgSettings,
    defaultSignatureDevice,
    isNoSignatureSelected,
    topazSignatureDeviceSelected,
    touchScreenSignatureDeviceSelected

) {
    let body = Object.assign({}, orgSettings);

    let signatureConfiguration = {
        defaultSignatureDevice: defaultSignatureDevice,
        id: 622,
        noSignatureDeviceSelected: isNoSignatureSelected,
        topazSignatureDeviceSelected: false,
        touchScreenSignatureDeviceSelected: touchScreenSignatureDeviceSelected
    };

    body.signatureConfiguration = signatureConfiguration;
    return body;
};

exports.generate_request_payload_for_setting_Case_Number_Formatting_for_Org = function (
    orgSettings,
    orgWidePattern,
    orgWidePrefix,
    autoAssignedNumbers,
    validationMessage
) {
    let body = Object.assign({}, orgSettings);
    let isFormattingRequired = orgWidePattern !== false;
    let isDefaultCaseNumberPrefix = orgWidePrefix !== false;

    let caseNumberConfiguration = {
        id: orgSettings.id,
        isFormattingRequired: isFormattingRequired,
        formattingPattern: orgWidePattern.toString(),
        examplePattern: null,
        isDefaultCaseNumberPrefix: isDefaultCaseNumberPrefix,
        defaultCaseNumberPrefix: orgWidePrefix.toString(),
        formattingValidationMessage: validationMessage
    };

    body.caseNumberConfiguration = caseNumberConfiguration;
    body.isAutoIncrementCaseNumberOn = autoAssignedNumbers;
    return body;
};

exports.generate_request_payload_for_setting_Case_Number_Formatting_for_Office = function (
    orgSettings,
    office,
    officePattern,
    officePrefix,
    validationMessage) {
    let body = Object.assign({}, orgSettings);
    let caseNumberOfficeConfigurations =  [{
        officeId: office.id,
        formattingPattern: officePattern,
        defaultCaseNumberPrefix: officePrefix,
        formattingValidationMessage: validationMessage
    }];

    body.caseNumberOfficeConfigurations = caseNumberOfficeConfigurations;

    if (!officePattern && !officePrefix){
        body.caseNumberOfficeConfigurations = undefined
    }
    return body;
};

exports.generate_request_payload_for_setting_Case_Number_Formatting = function (
    orgSettings,
    isFormattingRequired,
    isDefaultCaseNumberPrefix,
    isAutoIncrementCaseNumberOn,
    formattingPattern,
    defaultPrefix,
    nextCaseNumber
) {

    let body = Object.assign({}, orgSettings)

    body.caseNumberConfiguration.isFormattingRequired = isFormattingRequired;
    body.caseNumberConfiguration.formattingPattern = formattingPattern || ''

    body.caseNumberConfiguration.isDefaultCaseNumberPrefix = isDefaultCaseNumberPrefix;
    body.caseNumberConfiguration.defaultCaseNumberPrefix = defaultPrefix || ''

    body.isAutoIncrementCaseNumberOn = isAutoIncrementCaseNumberOn;
    body.nextCaseNumber = nextCaseNumber || orgSettings.nextCaseNumber

    return body
};



