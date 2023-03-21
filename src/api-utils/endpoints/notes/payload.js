const S = require('../../../test/utils/settings.js');
const C = require('../../../test/utils/constants.js');
const D = require('../../../test/utils/data.js');
const userAccounts = require('../../../test/utils/user-accounts.js');

exports.generate_POST_request_payload_for_creating_new_note = function (entity, noteText) {

    let body = {
        entityId: entity.id,
        noteCategoryId: S.selectedEnvironment.noteCategory.id,
        text: noteText
    };
    return body;
};
