const generic_request = require('../../generic-api-requests');
const body = require('./payload');
const S = require('../../../test/utils/settings');
const D = require('../../../test/utils/data');

exports.check_out_item = async function () {

         let   newItem = JSON.parse(S.selectedEnvironment.newItem)

        await    generic_request.POST(
                '/api/CheckOuts',
                body.generate_POST_request_payload_for_CheckOut(newItem),
                'Checking out item via API '
            )
    return this;
};

exports.dispose_item = async function () {

     let   newItem = JSON.parse(S.selectedEnvironment.newItem);

     await   generic_request.POST(
            '/api/disposals',
            body.generate_POST_request_payload_for_Disposal(newItem),
            'Disposing item via API '
        )
   return this;
};

exports.undispose_item = function () {
    cy.getLocalStorage("newItem").then(newItem => {
        newItem = JSON.parse(newItem);

        generic_request.POST(
            '/api/Disposals/Undispose',
            body.generate_POST_request_payload_for_Undisposal(newItem),
            'Undisposing item via API '
        )
    });
};

exports.move_item = function () {
    cy.getLocalStorage("newItem").then(newItem => {
        newItem = JSON.parse(newItem);

        generic_request.POST(
            '/api/Moves',
            body.generate_POST_request_payload_for_Move(newItem),
            'Moving item via API '
        )
    });
};
