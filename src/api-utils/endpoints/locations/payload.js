const S = require('../../../test/utils/settings.js');


exports.generate_POST_request_payload_for_Add_Locations = function (locationNameOrArray) {

    let body = Array.isArray(locationNameOrArray)? locationNameOrArray :
            [{
                "name": locationNameOrArray,
                "active": true,
                "parentId": null,
                "canStoreHere": true
            }]

    return body;
};
