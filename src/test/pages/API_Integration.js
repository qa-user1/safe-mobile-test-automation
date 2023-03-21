import frisby from 'frisby';

const enableCLP = { casePermissionsForGroups: [{ permissionGroup: { id: 202, text: 'Power User' }, permissions: { users: [], userGroups: [], permissionGroups: [] } }, { permissionGroup: { id: 203, text: 'Basic User' }, permissions: { users: [], userGroups: [], permissionGroups: [] } }, { permissionGroup: { id: 204, text: 'Read Only' }, permissions: { users: [{ id: 243, text: ' raouf basic basic (akamel+2@trackerproducts.com)' }], userGroups: [], permissionGroups: [] } }], isEntityRestricted: true };
const disableCLP = { casePermissionsForGroups: [{ permissionGroup: { id: 202, text: 'Power User' }, permissions: { users: [], userGroups: [], permissionGroups: [] } }, { permissionGroup: { id: 203, text: 'Basic User' }, permissions: { users: [], userGroups: [], permissionGroups: [] } }, { permissionGroup: { id: 204, text: 'Read Only' }, permissions: { users: [{ id: 243, text: 'raouf basic (akamel+2@trackerproducts.com)' }], userGroups: [], permissionGroups: [] } }], isEntityRestricted: false };

const F = exports;
const baseUrl = 'https://pentestapi.trackerproducts.com';

F.getLastCreatedCaseId = function () {
   // AllureReporter.addStep('From all recent cases, get the first ID for last created case');
    return frisby
        .get(`${baseUrl}/api/cases/recent`)
        .expect('status', 200)
        .then(res => {
            exports.firstCaseId = JSON.parse(res.body)[0].caseNumber;
            exports.CaseId = JSON.parse(res.body)[0].caseId;
        });
};

F.enableCLPForRecentCase = function (caseId) {
   // AllureReporter.addStep('Enable CLP for last created case');
    return frisby
        .post(`${baseUrl}/api/cases/${caseId}/permissions`, {
            body: enableCLP,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .expect('status', 200);
};

F.disableCLPForRecentCase = function (caseId) {
  //  AllureReporter.addStep('Disable CLP for last created case');
    return frisby
        .post(`${baseUrl}/api/cases/${caseId}/permissions`, {
            body: disableCLP,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .expect('status', 200);
};

module.exports = F;
