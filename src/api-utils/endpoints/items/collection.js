const S = require('../../../test/utils/settings');
const D = require('../../../test/utils/data');
const generic_request = require('../../generic-api-requests');
const body = require('./payload');

exports.add_new_item = async function (caseObject, locationSuffix = null, propertyToSave = 'newItem') {

    let locationObject = locationSuffix ? JSON.parse(S.selectedEnvironment.newLocation.locations[0]) : S.selectedEnvironment.locations[0]

              await  generic_request.POST(
                    '/api/items',
                    body.generate_POST_request_payload_for_creating_new_item(caseObject, locationObject),
                    "New ITEM created via API with ID_______",
                    propertyToSave,
                )

    return this;
};


exports.add_custom_form_data_to_existing_item = async function (newItem) {
    //cy.getLocalStorage("newItem").then(newItem => {
        let existingItem = Object.assign(JSON.parse(newItem));

     await   generic_request.PUT(
            '/api/items/' + existingItem.id,
            body.generate_PUT_request_payload_for_editing_existing_item(existingItem, true),
            'Adding custom form to the existing item via API with ID_______' + existingItem.id
        );

    return this;
};

exports.add_item_to_case = function (existingCaseId) {
    cy.getLocalStorage("newItem").then(newItem => {
        newItem = JSON.parse(newItem);

        generic_request.PUT(
            '/api/items/' + existingCaseId + '/additems/',
            [newItem.id],
            'Added item to the case with id ' + existingCaseId)
    });
};

exports.edit_newly_added_item = function (removeCustomFormData = false) {
    cy.getLocalStorage("newItem").then(newItem => {
        let existingItem = Object.assign(JSON.parse(newItem), D.editedItem);
        let editCustomFormData = !removeCustomFormData;

        generic_request.PUT(
            '/api/items/' + existingItem.id,
            body.generate_PUT_request_payload_for_editing_existing_item(existingItem, editCustomFormData),
            'Editing existing item via API with ID_______' + existingItem.id
        );
    });
    return this;
};

exports.get_item_history = function (item) {
    cy.getLocalStorage("headers").then(headers => {
        cy.request({
            url: S.api_url + '/api/items/itemHistory?itemId=' + item.id + '&orderBy=TimeStamp&orderMethodAsc=false&skip=0&top=25',
            method: "GET",
            json: true,
            headers: JSON.parse(headers),
        }).then(response => {
            let seqOrgItemHistoryId = JSON.stringify(response.body.data[0].seqOrgItemHistoryId);
            cy.setLocalStorage("seqOrgItemHistoryId", seqOrgItemHistoryId);
            cy.log("Item History ID: " + seqOrgItemHistoryId);
        });
    });
};

