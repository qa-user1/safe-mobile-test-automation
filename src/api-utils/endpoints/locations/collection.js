const generic_request = require('../../generic-api-requests');
const body = require('./payload');
const helper = require('../../../test/utils/helper');
const D = require('../../../test/utils/data');
const S = require('../../../test/utils/settings');

exports.get_storage_locations = async function (parentLocationId = 0) {
    await generic_request.GET(
        '/api/locations/childrenOrRoots?parentLocationId=' + parentLocationId,
        'Fetching storage locations via API ',
        'newLocation'
    )

};

exports.get_all_accessible_storage_locations = function () {
    generic_request.GET(
        '/api/locations/typeahead?accessibleOnly=true&hideOverlay=true&search=%2F',
        'Fetching accessible storage locations via API ',
        'locations',
        'locations',
    )
};

exports.add_storage_location = async function (locationSuffix, parentLocSuffix) {

    let newLocation = Object.assign({}, D.getStorageLocationData(locationSuffix)[0])

        newLocation.parentId = (parentLocSuffix && (S.selectedEnvironment.newLocation.locations[0] !== 'null')) ? S.selectedEnvironment.newLocation.locations[0].id : 0;

      await  generic_request.POST(
            '/api/locations',
            [newLocation],
            'Adding location via API ' + newLocation.name,
            'newLocation'
        )
  await  exports.get_and_save_new_location_data_to_local_storage(locationSuffix, newLocation.parentId)
};

exports.delete_empty_storage_locations = function () {

    let locationId = null;

    exports.get_storage_locations();
    cy.getLocalStorage('locations').then(locationsArray => {
        JSON.parse(locationsArray).forEach(loc => {
            if (loc.count === 0) {
                locationId = loc.id

                generic_request.DELETE(
                    '/api/locations/' + locationId,
                    null,
                    'Deleting location(s) via API '
                )
            }
        })
    })
};

exports.update_location = async function (locationName, propertyName, propertyValue) {
    let log,
        specificLocation = S.selectedEnvironment.newLocation.locations[0]
    await exports.get_storage_locations();

        let loc = JSON.parse(specificLocation)
        loc[propertyName] = propertyValue
        await generic_request.PUT(
            '/api/locations/' + loc.id,
            loc,
            log
        )
    S.selectedEnvironment.newLocation.locations[0] = JSON.stringify(loc)
};


exports.get_and_save_new_location_data_to_local_storage = async function (locationSuffix, parentLocId) {

    let newLocation = Object.assign({}, D.getStorageLocationData(locationSuffix)[0])

    await exports.get_storage_locations(parentLocId);

    let locationsArray = S.selectedEnvironment.newLocation.locations
        locationsArray.forEach(loc => {
            if (loc.name.includes(newLocation.name)) {
                D.getStorageLocationData(locationSuffix)[0] = loc
                S.selectedEnvironment[locationSuffix] = loc
                S[locationSuffix] = loc
                S.selectedEnvironment.newLocation.locations[0] = JSON.stringify(loc)
            }
        })
};

exports.get_and_save_any_location_data_to_local_storage = function (fullOrPartialLocationName, parentLocId) {

    exports.get_storage_locations(parentLocId);
    cy.getLocalStorage('locations').then(locationsArray => {
        JSON.parse(locationsArray).forEach(loc => {

            if (loc.name.includes(fullOrPartialLocationName)) {
                S.selectedEnvironment[fullOrPartialLocationName] = loc
                cy.setLocalStorage(fullOrPartialLocationName, JSON.stringify(loc))
            }
        })
    })
};


