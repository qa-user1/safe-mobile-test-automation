const S = require('../../../test/utils/settings.js');
const D = require('../../../test/utils/data.js');
const C = require('../../../test/utils/constants.js');

exports.generate_POST_request_payload_for_CheckOut = function (newItem, newPerson) {
    let person = (newPerson && newPerson.id !== '') ? newPerson : S.selectedEnvironment.person;

    let body = {
        containerIds:[],
        transaction: {
            takenById: S.selectedEnvironment.person.id,
            reasonId: S.selectedEnvironment.checkoutReason.id,
            notes: 'API',
            items: [newItem],
            expectedReturnDate: null
        },
        sigdata: 'iVBORw0KGgoAAAANSUhEUgAAAIwAAAA3CAYAAADezaKIAAAA/UlEQVR4Xu3SsQ0AAAzCsPL/070hu5mZIu9MgVBg4euqwAEDQSoATMrlDAwDqQAwKZczMAykAsCkXM7AMJAKAJNyOQPDQCoATMrlDAwDqQAwKZczMAykAsCkXM7AMJAKAJNyOQPDQCoATMrlDAwDqQAwKZczMAykAsCkXM7AMJAKAJNyOQPDQCoATMrlDAwDqQAwKZczMAykAsCkXM7AMJAKAJNyOQPDQCoATMrlDAwDqQAwKZczMAykAsCkXM7AMJAKAJNyOQPDQCoATMrlDAwDqQAwKZczMAykAsCkXM7AMJAKAJNyOQPDQCoATMrlDAwDqQAwKZczMAykAg+oDgA4/NjoXAAAAABJRU5ErkJggg==',
        mediumFileData: []
    };
    return body;
};

exports.generate_POST_request_payload_for_CheckIn = function (newItem) {
    let body = {
        transaction: {
            checkedInById: 0,
            returnedById: S.selectedEnvironment.person.id,
            returnedByName: S.selectedEnvironment.person.name,
            locationId: S.selectedEnvironment.locations[0].id,
            location: S.selectedEnvironment.locations[0].name,
            Items: [
                {
                    statusId: 2,
                    status: 'Checked In',
                    id: newItem.id
                }
            ]
        },
        sigdata: 'iVBORw0KGgoAAAANSUhEUgAAAdkAAAA3CAYAAABAfjBEAAAEEklEQVR4Xu3bwU5TQRQG4DMVjUF9EePWDStDqcYXMT6Gj2Hc+RQmtCVxoRu3xrVvoAuMRrFjWiw2pLEkMHTm3o8Ni5a5/3xn4OfSksIHAQIECBAgUEQgFVnVogQIECBAgEAoWYeAAAECBAgUElCyhWAtS4AAAQIElKwzQIAAAQIECgko2UKwliVAgAABAkrWGSBAgAABAoUElGwhWMsSIECAAAEl6wwQIECAAIFCAkq2EKxlCRAgQICAknUGCBAgQIBAIQElWwjWsgQIECBAQMk6AwQIECBAoJCAki0Ea1kCBAgQIKBknQECBAgQIFBIQMkWgrUsAQIECBBQss4AAQIECBAoJKBkC8FalgABAgQIKFlngAABAgQIFBJQsoVgLUuAAAECBJSsM0CAAAECBAoJKNlCsJYlQIAAAQJK1hkgcEGB4Tj/iIhbkWM73zcpcor4nQbxbjxMjy4Y29MIENiiwHZ+WGxxwy5NYJPAcJxnq0Wazn2X5LxphTKPn8+xvMraPCnmKY+/n8Tw/dP0oUwiqxIgsElAyW4S8ngvBPbH+dcgYmdtcZ0W1s/pKN2uBWM0yW9zjr0ccWPdnfW6Qs6xeOan6UF6UMs+5CDQdQEl2/UJ299/BeZ3rSn+/fl3FnFyNEo3u8K29yY/3N2JSY64t7rP+f4WpRvxfDpKr7qyX/sgUJuAkq1tIvIUF9g/zCcpxWBZOvOymY7SoPiFK7nAcJI/Ro77q6XbN4NKRiFGDwSUbA+GbIsR5+9Yl3dyfSrXdedgOM7PIuLl38L9Nhmlu84LAQJXJ6Bkr87SSpUKLAt2freWc8yOHqez114rjXztsQ7G+Tgi7szfRJUiZotfQtLp52mH/nx+7bAu2HsBJdv7I9BtgNWC7ftd66ZJz4s2R+ymvHit9rRk89mbwT6nHK8nT9KLTet4nACBfwJK1mnonMDw8PSfWpbvsPV64+VGPBznL5Hjq5K9nKOv7qeAku3n3Du962XJRurXG5o6PVSbI9CogJJtdHBiEyBAgED9Akq2/hlJSIAAAQKNCijZRgcnNgECBAjUL6Bk65+RhAQIECDQqICSbXRwYhMgQIBA/QJKtv4ZSUiAAAECjQoo2UYHJzYBAgQI1C+gZOufkYQECBAg0KiAkm10cGITIECAQP0CSrb+GUlIgAABAo0KKNlGByc2AQIECNQvoGTrn5GEBAgQINCogJJtdHBiEyBAgED9Akq2/hlJSIAAAQKNCijZRgcnNgECBAjUL6Bk65+RhAQIECDQqICSbXRwYhMgQIBA/QJKtv4ZSUiAAAECjQoo2UYHJzYBAgQI1C+gZOufkYQECBAg0KiAkm10cGITIECAQP0CSrb+GUlIgAABAo0KKNlGByc2AQIECNQv8AcDEoc4rYfmBwAAAABJRU5ErkJggg==',
        mediumFileData: []
    }
    return body;
};

exports.generate_POST_request_payload_for_Disposal = function (newItem) {
    let body = {
        transaction: {
            disposedByName: S.selectedEnvironment.person_2.fullName,
            disposedById: S.selectedEnvironment.person_2.userId,
            witnessId: S.selectedEnvironment.person.userId,
            methodId: S.selectedEnvironment.disposalMethods[0].id,
            notes: 'API',
            items: [newItem],
        },
        sigdata: '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',
        mediumFileData: []
    }
    return body;
};

exports.generate_POST_request_payload_for_Undisposal = function (newItem) {
    let body = {
        transaction: {
            checkedInById: 0,
            returnedById: 60907,
            locationId: 1,
            notes: D.randomNo,
            Items: [
                {
                    statusId: 3,
                    status: 'Disposed',
                    id: newItem.id
                }
            ]
        },
        sigdata: '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',
        mediumFileData: []
    }
    return body;
};

exports.generate_POST_request_payload_for_Move = function (newItem) {
    let body = {
        transaction: {
            movedByName: 'Sumejja OrgAdmin',
            movedById: 170,
            locationId: 43081,
            notes: D.randomNo,
            items: [
                {
                    sequentialCaseId: '194',
                    sequentialCaseIdNested: {
                        section: 194,
                        nested: null
                    },
                    barcode: 'd1c5535f-4133-4a9b-b9d1-47ef6ec6f741',
                    description: '578014',
                    recoveryDate: '2020-02-14T16:29:00Z',
                    recoveryLocation: 'Chicago, IL, USA',
                    active: true,
                    locationId: 1,
                    location: 'root',
                    fullLocation: null,
                    lastLocationId: 1,
                    lastLocation: 'root',
                    statusId: 1,
                    status: 'Checked In',
                    categoryId: 31,
                    category: 'Removable Media',
                    custodyReasonId: 0,
                    custodyReason: null,
                    recoveredById: 0,
                    recoveredBy: '',
                    submittedById: 223,
                    submittedBy: 'Cypress OrgAdmin',
                    custodianId: null,
                    custodian: null,
                    currentOfficeId: 130,
                    currentOfficeName: 'Cypress Office1',
                    primaryCaseId: 75802,
                    primaryCaseNumber: 'Automated test SAMPLE CASE',
                    primaryCaseOfficerId: 179,
                    primaryCaseOfficer: 'SMJ_testUser SMJ',
                    primaryCaseOffenseTypeId: 58,
                    primaryCaseOffenseType: 'Adoption',
                    isPrimaryCaseRestricted: false,
                    make: null,
                    model: null,
                    serialNumber: null,
                    creatingorganizationId: 1,
                    dateCreated: '2020-04-06T05:46:04Z',
                    loaningorganizationId: null,
                    incomingorganizationId: null,
                    sequentialorganizationId: 1675015,
                    cases: [
                        75802
                    ],
                    caseModels: [],
                    media: null,
                    mediaAmount: 0,
                    rootMediaFolderId: 49895,
                    formData: null,
                    formDataAmount: 0,
                    notes: [],
                    notesAmount: 0,
                    tags: [],
                    tagsAmount: 0,
                    barcodes: [],
                    barcodesAmount: 0,
                    id: newItem.id,
                    sqlId: 0,
                    people: [],
                    peopleIds: [],
                    peopleNames: null,
                    peopleGuids: null,
                    parentItemId: null,
                    parentItemDescription: null,
                    parentSequentialorganizationId: null,
                    childItems: [],
                    childItemsAmount: 0,
                    tasks: [],
                    tasksAmount: 0,
                    historiesAmount: 4,
                    isForbidden: false,
                    restangularEtag: '"73dfee77-ce0b-4c1f-98f1-2ffbc4e4f266"',
                    route: 'items',
                    reqParams: {
                        includePeople: true,
                        count: true
                    },
                    restangularized: true,
                    fromServer: true,
                    parentResource: null,
                    restangularCollection: false
                }
            ]
        },
        sigdata: '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',
        mediumFileData: []
    }
    return body;
};
