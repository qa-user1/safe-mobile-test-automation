const D = require('../../../test/utils/data');
const S = require('../../../test/utils/settings');
const generic_request = require('../../generic-api-requests');
const items = require('../items/collection');
const people = require('../people/collection');
const body = require('./payload');

exports.get_current_org_settings = async function (organizationId) {

    organizationId = organizationId || S.selectedEnvironment.orgSettings.id;

    await generic_request.GET(
        '/api/organizations/' + organizationId ,
        'Fetching the current Org Settings via API ',
        'orgSettings');
};

exports.update_org_settings_by_specifying_property_and_value = async function (property, value) {
  await  exports.get_current_org_settings();

   /* cy.getLocalStorage("orgSettings").then(orgSettings => {*/
      let  organizationSettings = JSON.parse(S.selectedEnvironment.orgSettings);
        S.selectedEnvironment.orgSettings = organizationSettings;
        organizationSettings[property] = value

        generic_request.PUT(
            '/api/organizations/' + organizationSettings.id,
            organizationSettings,
            "Org Settings updated via API",
            'orgSettings');
    return this
};

// exports.update_org_settings = async function (useCLP, itemBelongsToShowsAllPeople, touchScreenSignature) {
//     await exports.get_current_org_settings();
//     await generic_request.PUT(
//         '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
//         body.generate_request_payload_for_editing_Org(S.selectedEnvironment.orgSettings, useCLP, itemBelongsToShowsAllPeople, touchScreenSignature),
//         'Org Settings updated via API',
//         'orgSettings');
//
//     return this;
// };
//

exports.set_Signature_Configuration = async function (
    defaultSignatureDevice,
    isNoSignatureSelected,
    touchScreenSignatureDeviceSelected,
    topazSignatureDeviceSelected) {

    await exports.get_current_org_settings();

    await generic_request.PUT(
        '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
        body.generate_request_payload_for_setting_Signature_configuration(
            S.selectedEnvironment.orgSettings,
            defaultSignatureDevice,
            isNoSignatureSelected,
            topazSignatureDeviceSelected,
            touchScreenSignatureDeviceSelected),
        'Signature configuration is updated via API');
};

exports.set_Default_Org_Level_Case_Number_Prefix = async function (
    isFormattingRequired,
    isDefaultCaseNumberPrefix,
    isAutoIncrementCaseNumberOn) {

    await exports.get_current_org_settings();

    await generic_request.PUT(
        '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
        body.generate_request_payload_for_setting_Case_Number_Formatting(
            S.selectedEnvironment.orgSettings,
            isFormattingRequired,
            isDefaultCaseNumberPrefix,
            isAutoIncrementCaseNumberOn),
        'Case Number Formatting updated via API');
};

exports.set_Org_Wide_Case_Number_formatting = async function (
    orgWidePattern,
    orgWidePrefix,
    autoAssignedNumbers,
    validationMessage) {

    await exports.get_current_org_settings();
    await generic_request.PUT(
        '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
        body.generate_request_payload_for_setting_Case_Number_Formatting_for_Org(
            S.selectedEnvironment.orgSettings,
            orgWidePattern,
            orgWidePrefix,
            autoAssignedNumbers,
            validationMessage),
        'Org-Wide Case Number Formatting updated via API');
};

exports.set_Office_Case_Number_formatting = async function (officePattern, officePrefix, validationMessage) {
    await exports.get_current_org_settings();

    await generic_request.PUT(
        '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
        body.generate_request_payload_for_setting_Case_Number_Formatting_for_Office(
            S.selectedEnvironment.orgSettings,
            S.selectedEnvironment.office_1,
            officePattern,
            officePrefix,
            validationMessage
            ),
        'Case Number Formatting for Offices updated via API');
};


//
exports.set_Org_Case_Number_formatting = async function (
    isFormattingRequired,
    isDefaultCaseNumberPrefix,
    isAutoIncrementCaseNumberOn,
    formattingPattern,
    defaultPrefix,
    nextCaseNumber) {

  await  exports.get_current_org_settings();

    await    generic_request.PUT(
            '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
            body.generate_request_payload_for_setting_Case_Number_Formatting(
                S.selectedEnvironment.orgSettings,
                isFormattingRequired,
                isDefaultCaseNumberPrefix,
                isAutoIncrementCaseNumberOn,
                formattingPattern,
                defaultPrefix,
                nextCaseNumber,
                ),
            "Case Number Formatting updated via API");
};

exports.set_Next_Case_Number = async function (nextCaseNumber) {

    S.selectedEnvironment.orgSettings.nextCaseNumber = nextCaseNumber;

       await generic_request.PUT(
            '/api/organizations/' + S.selectedEnvironment.orgSettings.id,
            body.generate_request_payload_for_setting_Case_Number_Formatting(
                S.selectedEnvironment.orgSettings,
                null,
                null,
                null),
            "Case Number Formatting updated via API");
    };

//
// exports.set_Case_Level_Permissions_on_Org_Settings = async function (useCLP) {
//     people.add_new_person(D.setNewRandomNo());
//     items.add_new_item(false);
//     exports.update_org_settings(useCLP);
//     return this;
// };

exports.enable_all_Case_fields = async function () {
    await generic_request.POST(
        '/api/organizations/0/fields',
        [],
        'Enabled all Case fields in Org Settings via API');
};

exports.disable_Case_fields = async function (fieldsToEnable) {
    await generic_request.POST(
        '/api/organizations/0/fields',
        body.generate_request_payload_for_disabling_Case_fields(fieldsToEnable),
        'Disabled all configurable Case fields in Org Settings via API');
};

 exports.enable_all_Item_fields = async function (fieldsToDisable, optionalFields) {
    await generic_request.POST(
         '/api/organizations/1/fields',
        body.generate_request_payload_for_setting_visible_and_required_Item_fields(fieldsToDisable, optionalFields),
         'Enabled all Item fields in Org Settings via API');
     return this;
 };

 exports.disable_Item_fields = async function (fieldsToEnable) {
     await generic_request.POST(
         '/api/organizations/1/fields',
         body.generate_request_payload_for_disabling_Item_fields(fieldsToEnable),
         'Disabled all configurable Item fields in Org Settings via API');
     return this;
 };

 exports.enable_all_Person_fields = async function () {
     await generic_request.POST(
         '/api/organizations/2/fields',
         [],
         'Enabled all Person fields in Org Settings via API');
     return this;
 };

 exports.disable_Person_fields = async function (fieldsToKeepEnabled) {
     await generic_request.POST(
         '/api/organizations/2/fields',
         body.generate_request_payload_for_disabling_Person_fields(fieldsToKeepEnabled),
         'Disabled all configurable Person fields in Org Settings via API');
     return this;
 };




