const generic_request = require('../../generic-api-requests');
const body = require('./payload');
const S = require('../../../test/utils/settings');
const D = require('../../../test/utils/data');

exports.add_new_person = async function (addToCase, caseObject) {

    await generic_request.POST(
        '/api/people',
        body.generate_POST_request_payload_for_Add_Person(),
        'Adding new person via API with ID_______',
        'newPerson',
    );

     caseObject = caseObject || S.selectedEnvironment.oldCase;

    if (addToCase){
        if(caseObject.caseNumber === D.newCase.caseNumber){
           await  exports.add_person_to_case(true, true)
        }
        else{
          await exports.add_person_to_case(true, false, false, caseObject.id)
        }
    }
    return this;
};

exports.add_person_to_case = async function (useNewPerson, useNewCase, specificPersonId, specificCaseID) {

            specificCaseID = useNewCase ? JSON.parse(S.selectedEnvironment.newCase) : specificCaseID;
            specificPersonId = useNewPerson ? JSON.parse(S.selectedEnvironment.newPerson) : specificPersonId;
            if (specificCaseID === S.selectedEnvironment.currentCase){
                specificCaseID = S.selectedEnvironment.currentCase.cases[0]
            }

         await  generic_request.POST(
                '/api/people/addPersonToCase/' + specificCaseID.id,
                body.generate_POST_request_payload_for_Add_Person_to_Case(specificPersonId.id),
                'Adding person to case via API',
            )
};
