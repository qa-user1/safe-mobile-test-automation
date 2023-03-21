const generic_request = require('../../generic-api-requests');
const body = require('./payload');
const S = require('../../../test/utils/settings');

exports.add_note = async function (entity, note) {
    let entityObject = entity? JSON.parse(entity) : null,
        addNoteTo

    if (entity === S.selectedEnvironment.newCase) addNoteTo = 'cases'
    else if (entity === S.selectedEnvironment.newItem) addNoteTo = 'items'
    else addNoteTo = 'people'

    await generic_request.POST(
        '/api/' + addNoteTo + '/'+ entityObject.id +'/notes',
        body.generate_POST_request_payload_for_creating_new_note(entityObject, note),
        'Creating new note via API and saving to local storage __ ',
        'newNote',

    );
    return this;
};
