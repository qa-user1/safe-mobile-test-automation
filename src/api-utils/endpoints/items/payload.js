const S = require('../../../test/utils/settings.js');
const D = require('../../../test/utils/data.js');

exports.generate_POST_request_payload_for_creating_new_item = function (specificCaseObject, locationObject, newPerson) {

    let itemData = Object.assign({}, D.newItem);

    let caseNumber = specificCaseObject? specificCaseObject.caseNumber : itemData.caseNumber;
    let primaryCaseId = specificCaseObject? JSON.parse(specificCaseObject).id : itemData.primaryCaseId;
    let person = (newPerson && newPerson.id) ? newPerson : S.selectedEnvironment.person;
    let locationId = locationObject? locationObject.id : itemData.locationId;

    let body = {
        caseNumber: caseNumber,
        description: itemData.description,
        active: itemData.active,
        categoryId: itemData.categoryId,
        recoveredById: person.id,
        recoveryLocation: itemData.recoveryLocation,
        locationId: locationId,
        recoveryDate: itemData.recoveryDateInIsoFormat,
        createdDate: itemData.createdDate,
        barcodes: itemData.barcodes,
        formData: itemData.formData,
        cases: itemData.cases,
        people: [person],
        make: itemData.make,
        model: itemData.model,
        serialNumber: itemData.serialNumber,
        primaryCaseId: primaryCaseId,
        custodyReasonId: itemData.custodyReasonId,
        peopleIds: [person.id]
    };
    if (itemData.tags && itemData.tags[0].name) body.tags = itemData.tags


    console.log('New item created with data ' + JSON.stringify(body));
    return body;
};

exports.generate_PUT_request_payload_for_editing_existing_item = function (itemObject, addCustomFormData) {

    let formData = addCustomFormData ?

        [{
            data: `{
        "${S.selectedEnvironment.caseCustomForm.checkboxListId}":{"1":true},
        "${S.selectedEnvironment.itemCustomForm.radioButtonListId}":"2",
        "${S.selectedEnvironment.itemCustomForm.selectListId}":"3",
        "${S.selectedEnvironment.itemCustomForm.number}":${itemObject.customNumber},
        "${S.selectedEnvironment.itemCustomForm.password}":"${itemObject.customPassword}",
        "${S.selectedEnvironment.itemCustomForm.textbox}":"${itemObject.customTextbox}",
        "${S.selectedEnvironment.itemCustomForm.email}":"${itemObject.customEmail}",
        "${S.selectedEnvironment.itemCustomForm.textarea}":"${itemObject.customTextarea}",
        "${S.selectedEnvironment.itemCustomForm.checkbox}":${itemObject.customCheckbox},
        "${S.selectedEnvironment.itemCustomForm.date}":"${itemObject.createdDateIsoFormat}"}`,
            dateFields: [],
            entityId: itemObject.id,
            formId: S.selectedEnvironment.itemCustomForm.id,
            formName: S.selectedEnvironment.itemCustomForm.name,
            visibilityId: 1
        }] : [];

    itemObject.formData = formData;

    let body = {};
    Object.assign(body, itemObject);

    console.log('REQUEST BODY IS ' + JSON.stringify(body));

    return body;
};

