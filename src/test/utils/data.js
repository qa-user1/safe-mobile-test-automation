const api = require('../../api-utils/api-spec.js');
const D = exports;
const S = require('./settings.js');
const C = require('./constants.js');
const helper = require('./helper.js');

D.setNewRandomNo = function () {
    return helper.setNewRandomNo();
};

D.getRandomNo = function (length) {
    return helper.getRandomNo(length);
};

D.getRandomNoWithDate = function (length) {
    return helper.getRandomNo(length);
};

D.randomNo = D.getRandomNo(10);

D.getCurrentDateAndRandomNumber = function (randomNumberLenght) {
    return helper.mediumDate + '_' + helper.getRandomNo(randomNumberLenght);
};

D.getNewCaseData = function (caseNumber) {
    // api.cases.get_most_recent_case();
    caseNumber = caseNumber || this.setNewRandomNo();
    D.newCase = {
        id: '',
        caseNumber: caseNumber,
        createdDate: helper.setDateAndTime(C.currentDateTimeFormat),
        createdDateIsoFormat: helper.setIsoDateAndTime(),
        updateMadeBy: S.userAccounts.orgAdmin.name,
        submittedById: S.userAccounts.orgAdmin.id,
        submittedByName: S.userAccounts.orgAdmin.firstAndLastName,
        updateDate: helper.setDate(C.currentDateTimeFormat.dateOnly),
        offenseDate: helper.setDateAndTime(C.currentDateFormat),
        closedDate: null,
        offenseDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat, 2020, 4, 15, 14, 18),
        offenseDateIsoFormat: helper.setIsoDateAndTime(2022, 9, 15, 14, 18),
        reviewDate: helper.getDateInFuture(1, C.currentDateFormat),
        reviewDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2029, 5, 11, 15, 25),
        reviewDateIsoFormat: helper.setIsoDateAndTime(2022, 9, 17, 15, 25),
        status: 'Open',
        active: true,
        offenseDescription: caseNumber,
        offenseTypeId: S.selectedEnvironment.offenseType.id,
        offenseType: S.selectedEnvironment.offenseType.name,
        formData: [],
        tags: [{
            tagModelId: -1,
            name: 'AutomationTest',
            color: '#4b749b',
        }],
        reviewDateNotes: 'reviewNotes_' + caseNumber,
        checkInProgress: false,
        caseOfficerId: [S.userAccounts.orgAdmin.id],
        caseOfficer: S.userAccounts.orgAdmin.email,
        caseOfficerName: S.userAccounts.orgAdmin.name,
        caseOfficerFName: S.userAccounts.orgAdmin.firstName,
        caseOfficerLName: S.userAccounts.orgAdmin.lastName,
        caseOfficerFullName: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName,
        externalCaseOfficerNameAndEmail: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName + ' (' + S.userAccounts.org2Admin.email + ')',
        officerNameAndEmail: S.userAccounts.orgAdmin.name + ' (' + S.userAccounts.orgAdmin.email + ')',
        userGroup: 'testAutomation',
        caseOfficerGroupIds: [],
        caseOfficerObject: {
            fullName: S.userAccounts.orgAdmin.name,
            firstName: S.userAccounts.orgAdmin.firstName,
            nameAndEmail: S.userAccounts.orgAdmin.lastName + ', ' + S.userAccounts.orgAdmin.firstName + ' (' + S.userAccounts.orgAdmin.email + ')',
        },
        externalOfficer: {
            fullName: S.userAccounts.org2Admin.name,
            firstName: S.userAccounts.org2Admin.firstName,
            nameAndEmail: S.userAccounts.org2Admin.name + ' (' + S.userAccounts.org2Admin.email + ')',
        },
        offenseLocation: 'Sarajevo, Bosnia and Herzegovina',
        userGuid: S.userAccounts.orgAdmin.guid,
        officeGuid: S.selectedEnvironment.office_1.guid,
        officeName: S.selectedEnvironment.office_1.name,
        customTextbox: 'custom Textbox',
        customEmail: 'customEmail@email.com',
        customNumber: '2',
        customPassword: 'Test123',
        customTextarea: 'custom Textarea',
        customCheckbox: true,
        customCheckboxListOption: 'Option 1',
        customRadiobuttonListOption: 'Option 2',
        customSelectListOption: 'Option 3',
        customDate: helper.setDateAndTime(C.currentDateTimeFormat),
        customDropdownTypeahead: 'dropdownO1',
        customUser: {
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName
        },
        customPerson: {
            firstName: S.userAccounts.org2Admin.firstName,
            name: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName
        },
        customDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode),
        orgName: S.selectedEnvironment.orgSettings.name,
    };
    console.log('Setting new case data ' + JSON.stringify(D.newCase));

    return D.newCase;

};
D.getEditedCaseData = function (caseNumber) {
     //api.cases.get_most_recent_case();
    caseNumber = D.newCase.caseNumber ? D.newCase.case + '_edited' : D.getRandomNo() + '_edited';

    D.editedCase = {
        caseNumber: caseNumber,
        offenseDate: helper.setDateAndTime(C.currentDateFormat, 2022, 9, 15),
        closedDate: helper.setDateAndTime(C.currentDateFormat),
        offenseDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2021, 2, 3, 15, 25),
        reviewDate: helper.setDateAndTime(C.currentDateFormat, 2022, 9, 17),
        reviewDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2028, 4, 5, 16, 26),
        updateMadeBy: S.userAccounts.orgAdmin.name.replace(/\s/g, ''),
        submittedById: S.userAccounts.orgAdmin.id,
        submittedByName: S.userAccounts.orgAdmin.firstAndLastName,
        updateDate: helper.setDate(C.currentDateTimeFormat.dateOnly),
        officeName: S.selectedEnvironment.office_1.name,
        officeGuid: S.selectedEnvironment.office_1.guid,
        officeId: S.selectedEnvironment.office_1.id,
        status: 'Open',
        active: true,
        offenseDescription: caseNumber,
        offenseTypeId: S.selectedEnvironment.offenseType2.id,
        offenseType: S.selectedEnvironment.offenseType2.name,
        formData: [],
        tags: [{
            tagModelId: -1,
            name: '2AutomationTest',
            color: '#4b749b',
        }],
        reviewDateNotes: 'reviewNotes_EDITED_' + caseNumber,
        checkInProgress: false,
        createdDate: S.currentDate,
        caseOfficerId: S.userAccounts.powerUser.id,
        caseOfficerObject: {
            fullName: S.userAccounts.powerUser.name,
            firstName: S.userAccounts.powerUser.firstName,
            nameAndEmail: S.userAccounts.powerUser.lastName + ', ' + S.userAccounts.powerUser.firstName + ' (' + S.userAccounts.powerUser.email + ')',
        },
        caseOfficer: S.userAccounts.powerUser.email,
        caseOfficerName: S.userAccounts.powerUser.name.replace(/\s/g, ''),
        caseOfficerFName: S.userAccounts.powerUser.firstName,
        caseOfficerLName: S.userAccounts.powerUser.lastName,
        offenseLocation: 'Kentucky, USA',
        userGuid: S.userAccounts.powerUser.guid,
        customTextbox: 'edited Textbox',
        customEmail: 'customEmailedited@email.com',
        customNumber: '3',
        customPassword: 'Edit123',
        customTextarea: 'edited Textarea',
        customCheckbox: true,
        customCheckboxListOption: 'Option 2',
        customRadiobuttonListOption: 'Option 3',
        customSelectListOption: 'Option 1',
        customDate: helper.setDateAndTime(C.currentDateTimeFormat),
        customDropdownTypeahead: 'dropdownO2',
        customPerson: {
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName
        },
        customUser: {
            firstName: S.userAccounts.org2Admin.firstName,
            name: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName
        },
        customDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode),
        custom_date: helper.setDateAndTime(C.currentDateTimeFormat, 2028, 6, 3, 15, 25),
        custom_dateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2028, 6, 3, 15, 25),
    };
    return D.editedCase;
};

D.getNewItemData = function (specificCaseObject, locationObject, newPerson) {
    let person = (newPerson && newPerson.id !== '') ? newPerson : S.selectedEnvironment.person;
    locationObject = locationObject || S.selectedEnvironment.locations[0];
    specificCaseObject = specificCaseObject || S.selectedEnvironment.oldCase;
    let randomNo = D.getRandomNo(10);
    D.newItem = {
        primaryCaseId: specificCaseObject.id,
        caseNumber: D.newCase.caseNumber,
        itemNo: '1',
        description: 'Dsc_' + randomNo,
        status: C.itemStatuses.checkedIn,
        updateMadeBy: S.userAccounts.orgAdmin.lastName,
        updateDate: helper.setDate(C.currentDateTimeFormat.dateOnly),
        active: false,
        categoryId: S.selectedEnvironment.category.id,
        category: S.selectedEnvironment.category.name,
        recoveredById: person.id,
        recoveredBy: S.userAccounts.orgAdmin.lastName + ', ' + S.userAccounts.orgAdmin.firstName + ' (' + S.userAccounts.orgAdmin.email + ')',
        recoveredByName: S.userAccounts.orgAdmin.firstAndLastName,
        recoveredByGuid: person.guid,
        personObject: {
            fullName: S.userAccounts.orgAdmin.name,
            firstName: S.userAccounts.orgAdmin.firstName,
            lastName: S.userAccounts.orgAdmin.lastName,
            nameAndEmail: S.userAccounts.orgAdmin.name + ' (' + S.userAccounts.orgAdmin.email + ')',
            email: S.userAccounts.orgAdmin.email,
        },
        custodianGuid: person.guid,
        submittedByGuid: S.userAccounts.orgAdmin.guid,
        submittedById: S.userAccounts.orgAdmin.id,
        submittedByName: S.userAccounts.orgAdmin.firstAndLastName,
        userGuid: S.userAccounts.orgAdmin.guid,
        submittedBy: S.userAccounts.orgAdmin.lastName,
        recoveryLocation: 'Sarajevo, Bosnia and Herzegovina',
        locationId: locationObject.id,
        location: locationObject.name,
        locationGuid: locationObject.guid,
        recoveryDate: helper.setDateAndTime(C.currentDateFormat),
        recoveryDate_withoutTime: helper.setDate(C.currentDateTimeFormat.dateOnly, 2020, 3, 5),
        recoveryDate_withoutTime_editMode: helper.setDate(C.currentDateTimeFormat.dateOnly.editMode, 2020, 3, 5),
        recoveryDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2020, 3, 5, 17, 27),
        recoveryDateInIsoFormat: helper.setIsoDateAndTime(2020, 3, 5, 17, 27),
        createdDate: helper.setDateAndTime(C.currentDateTimeFormat),
        officeGuid: S.selectedEnvironment.office_1.guid,
        formData: [],
        barcodes: [{id:0, value:D.randomNo}],
        cases: [],
        tags: [{
            tagModelId: -1,
            name: '1AutomationTest',
            color: '#4b749b',
        }],
        people: [person],
        make: 'MK_' + randomNo,
        model: 'MD_' + randomNo,
        serialNumber: 'SN_' + randomNo,
        additionalBarcode: 'AB_' + randomNo,
        custodyReasonId: S.selectedEnvironment.custodyReason.id,
        custodyReason: S.selectedEnvironment.custodyReason.name,
        officeName: S.selectedEnvironment.office_1.name,
        peopleIds: [person.id],
        customTextbox: 'custom Textbox',
        customEmail: 'customEmail@email.com',
        customNumber: '2',
        customPassword: 'Test123',
        customTextarea: 'custom Textarea',
        customCheckbox: true,
        customCheckboxListOption: 'Option 1',
        customRadiobuttonListOption: 'Option 2',
        customSelectListOption: 'Option 3',
        customDate: helper.setDateAndTime(C.currentDateTimeFormat),
        customDropdownTypeahead: 'dropdownO1',
        customUser: {
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName
        },
        customPerson: {
            firstName: S.userAccounts.org2Admin.firstName,
            name: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName
        },
        customCurrencyValue: '1',
        customCurrencyTotal: 189.91,
        customDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode),
    };

    console.log('Setting new item data ' + JSON.stringify(D.newItem));

    return D.newItem;
};

D.setDateOnlyValues = function (dateOrDateTimeFormat) {
    D.newItem.recoveryDate = helper.setDate(dateOrDateTimeFormat);
    D.newItem.recoveryDateEditMode = helper.setDate(dateOrDateTimeFormat.dateOnly.editMode);
    D.newCase.offenseDate = helper.setDate(dateOrDateTimeFormat.dateOnly.editMode);
    D.newCase.offenseDateEditMode = helper.setDate(dateOrDateTimeFormat.dateOnly.editMode);
};

D.getEditedItemData = function (specificCaseObject, locationObject, newPerson) {
    let person = (newPerson && newPerson.id !== '') ? newPerson : S.selectedEnvironment.person_2;
    locationObject = locationObject || S.selectedEnvironment.locations[0];
    specificCaseObject = specificCaseObject || S.selectedEnvironment.oldCase;
    let randomNo = D.getRandomNo(3);

    D.editedItem = {
        updateMadeBy: S.userAccounts.orgAdmin.name.replace(/\s/g, ''),
        submittedById: S.userAccounts.orgAdmin.id,
        submittedByName: S.userAccounts.orgAdmin.firstAndLastName,
        updateDate: helper.setDate(C.currentDateTimeFormat.dateOnly),
        editedDescription: '_edited',
        description: D.newItem.description + '_edited',
        status: C.itemStatuses.checkedIn,
        active: true,
        itemNo: '1',
        categoryId: S.selectedEnvironment.category2.id,
        category: S.selectedEnvironment.category2.name,
        recoveredById: person.id,
        recoveredBy: person.email,
        recoveredByName: S.userAccounts.powerUser.name,
        recoveryLocation: 'Kentucky, USA',
        locationId: locationObject.id,
        location: locationObject.name,
        locationGuid: locationObject.guid,
        recoveryDate: helper.setDateAndTime(C.currentDateFormat),
        recoveryDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2021, 5, 8, 15, 25),
        createdDate: helper.setDateAndTime(C.currentDateTimeFormat),
        submittedByGuid: S.userAccounts.orgAdmin.guid,
        userGuid: S.userAccounts.orgAdmin.guid,
        submittedBy: S.userAccounts.orgAdmin2.name,
        officeGuid: S.selectedEnvironment.office_1.guid,
        recoveredByGuid: person.guid,
        returnedByGuid: person.guid,
        custodianGuid: person.guid,
        personObject: {
            fullName: S.userAccounts.powerUser.name,
            firstName: S.userAccounts.powerUser.firstName,
            lastName: S.userAccounts.powerUser.lastName,
            nameAndEmail: S.userAccounts.powerUser.name + ' (' + S.userAccounts.powerUser.email + ')',
            email: S.userAccounts.powerUser.email,
        },
        formData: [],
        cases: [],
        tags: [{
            tagModelId: -1,
            name: '2AutomationTest',
            color: '#4b749b',
        }],
        make: 'make_edited' + randomNo,
        model: 'model_edited' + randomNo,
        serialNumber: 'serialNo_edited' + randomNo,
        primaryCaseId: specificCaseObject.id,
        caseNumber: specificCaseObject.caseNumber,
        custodyReasonId: S.selectedEnvironment.custodyReason2.id,
        custodyReason: S.selectedEnvironment.custodyReason2.name,
        people: [person],
        peopleIds: [person.id],
        peopleGuids: [person.guid],
        peopleNames: [person.fullName],
        transactionNote: 'Transaction is done by Automated Test',
        chOutReason: S.selectedEnvironment.checkoutReason.name,
        disposalMethod: S.selectedEnvironment.disposalMethods[0].name,
        customTextbox: 'custom Textbox',
        customEmail: 'customEmail@email.com',
        customNumber: '2',
        customPassword: 'Test123',
        customTextarea: 'custom Textarea',
        customCheckbox: true,
        customCheckboxListOption: 'Option 1',
        customRadiobuttonListOption: 'Option 2',
        customSelectListOption: 'Option 3',
        customDate: helper.setDateAndTime(C.currentDateTimeFormat),
        customDropdownTypeahead: 'dropdownO1',
        customUser: {
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName
        },
        customPerson: {
            firstName: S.userAccounts.org2Admin.firstName,
            name: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName
        },
        customDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode),
        custom_date: helper.setDateAndTime(C.currentDateTimeFormat, 2028, 8, 3, 15, 25),
        custom_dateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode, 2028, 8, 3, 15, 25),
    };

    return D.editedItem;
};

D.getNewPersonData = function (caseObject) {
    let randomValue = helper.setNewRandomString();
    caseObject = caseObject || S.selectedEnvironment.oldCase;

    D.newPerson = {
        id: 0,
        updateMadeBy: S.userAccounts.orgAdmin.name,
        updateDate: helper.setDate(C.currentDateTimeFormat),
        businessName: randomValue,
        firstName: 'Fn' + randomValue,
        middleName: 'Mn' + randomValue,
        lastName: 'Ln' + randomValue,
        username: D.firstName + ' ' + D.lastName,
        alias: 'Al' + randomValue,
       // mobilePhone: helper.format_as_phone_number(helper.getRandomNo(10)),
        mobilePhone: helper.getRandomNo(10),
        otherPhone: helper.getRandomNo(10),
        email: 'qa+' + randomValue + '@trackerproducts.com',
        driverLicence: randomValue,
        race: S.selectedEnvironment.race.name,
        gender: 'Male',
        genderId: 1,
       // raceId: S.selectedEnvironment.race.id,
        raceId: 1,
        dateOfBirthForApi: '1970-05-10T23:00:00.000Z',
        dateOfBirth: helper.setDate(C.currentDateFormat, 1970, 5, 11),
        dateOfBirthEditMode: helper.setDate(C.currentDateFormat.editMode, 1970, 5, 11),
        active: false,
        deceased: true,
        juvenile: true,
        notes: [],
        addresses: [],
        formData: [],
        createdDate: S.currentDate,
        caseNumber: caseObject.caseNumber,
        personType: S.selectedEnvironment.personType.name,
        personTypeId: S.selectedEnvironment.personType.id,
        customTextbox: 'custom Textbox',
        customEmail: 'customEmail@email.com',
        customNumber: '2',
        customPassword: 'Test123',
        customTextarea: 'custom Textarea',
        customCheckbox: true,
        customCheckboxListOption: 'Option 1',
        customRadiobuttonListOption: 'Option 2',
        customSelectListOption: 'Option 3',
        customDate: helper.setDateAndTime(C.currentDateTimeFormat),
        customDropdownTypeahead: 'dropdownO1',
        customUser: {
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName
        },
        customPerson: {
            firstName: S.userAccounts.org2Admin.firstName,
            name: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName
        },
        customDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode),
    };

    D.newPersonAddress = {
        id: 0,
        date: '2020-04-11T05:19:49.040Z',
        entityId: 0,
        line1: 'AddressLine1',
        line2: 'AddressLine2',
        city: 'AddressCity',
        zip: 'ZIP_123',
        stateId: C.states.Alabama.id,
        state: C.states.Alabama.name,
        stateWithoutPrefix: 'Alabama',
        addressTypeId: C.addressTypes.home.id,
        addressType: C.addressTypes.home.name,
        countryId: 231,
        country: 'United States',
        isDefaultAddress: true,
    };

    D.newPersonAddress2 = {
        id: 0,
        date: '2020-04-11T05:19:49.040Z',
        entityId: 0,
        line1: 'secondAddress_Line1',
        line2: 'secondAddress_Line2',
        city: 'secondAddress_City',
        zip: 'secondAddress_ZIP_123',
        //stateId: C.states.Alabama.id,
        state: C.states.Arizona.name,
        stateWithoutPrefix: 'Arizona',
       // addressTypeId: C.addressTypes.home.id,
        addressType: C.addressTypes.work.name,
       // countryId: 231,
        country: 'United States',
        isDefaultAddress: false,
    };
    return D.newPerson;
};

D.getEditedPersonData = function () {
    let randomValue = helper.setNewRandomString() + '_edited';

    D.editedPerson = {
        id: 0,
        updateMadeBy: S.userAccounts.orgAdmin.name.replace(/\s/g, ''),
        updateDate: helper.setDate(C.currentDateTimeFormat.dateOnly),
        businessName: randomValue,
        firstName: 'Fn' + randomValue,
        middleName: 'Mn' + randomValue,
        lastName: 'Ln' + randomValue,
        alias: 'Al' + randomValue,
        mobilePhone: helper.format_as_phone_number(randomValue),
        otherPhone: helper.format_as_phone_number(randomValue),
        email: 'qa+' + randomValue + '_edited@trackerproducts.com',
        driverLicence: randomValue,
        race: S.selectedEnvironment.race2.name,
        raceId: S.selectedEnvironment.race2.id,
        gender: 'Female',
        genderId: 2,
        dateOfBirth: helper.setDate(C.currentDateFormat, 1981, 6, 10),
        active: true,
        deceased: false,
        juvenile: false,
        notes: [],
        addresses: [],
        formData: [],
        caseNumber: S.selectedEnvironment.oldCase.caseNumber,
        personType: S.selectedEnvironment.personType2.name,
        personTypeId: S.selectedEnvironment.personType2.id,
        customTextbox: 'custom Textbox',
        customEmail: 'customEmail@email.com',
        customNumber: '2',
        customPassword: 'Test123',
        customTextarea: 'custom Textarea',
        customCheckbox: true,
        customCheckboxListOption: 'Option 1',
        customRadiobuttonListOption: 'Option 2',
        customSelectListOption: 'Option 3',
        customDate: helper.setDateAndTime(C.currentDateTimeFormat),
        customDropdownTypeahead: 'dropdownO1',
        customUser: {
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.firstName + ' ' + S.userAccounts.orgAdmin.lastName
        },
        customPerson: {
            firstName: S.userAccounts.org2Admin.firstName,
            name: S.userAccounts.org2Admin.firstName + ' ' + S.userAccounts.org2Admin.lastName
        },
        customDateEditMode: helper.setDateAndTime(C.currentDateTimeFormat.editMode),
        custom_date: S.tomorrowsDate,
    };

    D.editedPersonAddress = {
        id: 0,
        date: '2020-04-11T05:19:49.040Z',
        entityId: 0,
        line1: 'AddressLine1_edited',
        line2: 'AddressLine2_edited',
        city: 'AddressCity_edited',
        zip: 'ZIP_123_edited',
        stateId: C.states.Alabama.id,
        state: C.states.Arizona.name,
        stateWithoutPrefix: 'Arizona',
        addressTypeId: C.addressTypes.work.id,
        addressType: C.addressTypes.work.name,
        countryId: 231,
        country: 'United States',
        isDefaultAddress: true,
    };

    return D.editedPerson;
};

D.getNewUserData = function (officeId) {

    let randomNo = helper.setNewRandomString();
    officeId = officeId || S.selectedEnvironment.office_1.id;

    D.newUser = {
        firstName: randomNo,
        lastName: 'LastN',
        email: 'qa+' + randomNo + '@trackerproducts.com',
        emailEncoded: 'qa+' + randomNo + '@trackerproducts.&#173;com',
        office: S.selectedEnvironment.office_1.name,
        officeId: officeId,
        active: true,
        password: 'Test12345.',
    };

    console.log('Setting new case data ' + JSON.stringify(D.newCase));

    return D.newUser;
};

D.getEditedUserData = function (caseNumber) {
    // api.cases.get_most_recent_case();
    caseNumber = caseNumber ? caseNumber + '_edited' : D.getRandomNo() + '_edited';

    D.editedCase = {
        caseNumber: caseNumber,
        offenseDate: 'Aug 18, 2020',
        reviewDate: 'Aug 18, 2027',
        updateMadeBy: S.userAccounts.orgAdmin.name.replace(/\s/g, ''),
        submittedById: S.userAccounts.orgAdmin.id,
        submittedByName: S.userAccounts.orgAdmin.firstAndLastName,
        updateDate: helper.setDate(C.currentDateTimeFormat.dateOnly),
        officeName: S.selectedEnvironment.office_1.name,
        officeGuid: S.selectedEnvironment.office_1.guid,
        officeId: S.selectedEnvironment.office_1.id,
        status: 'Open',
        active: true,
        offenseDescription: caseNumber,
        offenseTypeId: S.selectedEnvironment.offenseType2.id,
        offenseType: S.selectedEnvironment.offenseType2.name,
        formData: [],
        tags: [{
            tagModelId: -1,
            name: 'cold_case',
            color: '#4b749b',
        }],
        reviewDateNotes: 'reviewNotes_EDITED_' + caseNumber,
        checkInProgress: false,
        createdDate: S.currentDate,
        caseOfficerId: S.userAccounts.powerUser.id,
        caseOfficer: S.userAccounts.powerUser.email,
        caseOfficerName: S.userAccounts.powerUser.name.replace(/\s/g, ''),
        caseOfficerFName: S.userAccounts.powerUser.firstName,
        caseOfficerLName: S.userAccounts.powerUser.lastName,
        offenseLocation: 'Kentucky, USA',
        userGuid: S.userAccounts.powerUser.guid,
        custom_textbox: 'edited custom Textbox',
        custom_email: 'editedCustomEmail@email.com',
        custom_number: '333',
        custom_password: 'Test12345',
        custom_textarea: 'edited custom Textarea',
        custom_checkbox: false,
        custom_checkboxListOption: 'Option 2',
        custom_radiobuttonListOption: 'Option 3',
        custom_selectListOption: 'Option 1',
        custom_date: 'Aug 15, 2020',
    };
    return D.editedCase;
};

D.getNewTaskData = function (user, group, createdBy = S.userAccounts.orgAdmin) {
    D.newTask = {
        title: 'Title' + helper.getRandomNo(5),
        message: 'Msg' + helper.getRandomNo(5),
        status: 'New',
        statusOnTheGrid: 'Open',
        createdBy: createdBy ? createdBy.name : null,
        user: user ? user.firstName : null,
        userId: user ? user.id : null,
        groupId: group ? group.id : null,
        group: group ? group.name : null,
        dueDate: helper.setIsoDateAndTime(2029, 5, 11, 15, 25)
    };
    console.log('Setting new task data ' + JSON.stringify(D.newTask));

    return D.newTask;

};

D.getEditedTaskData = function (user, group, createdBy = S.userAccounts.orgAdmin2) {
    D.editedTask = {
        title: 'Title_edited' + helper.getRandomNo(5),
        message: 'Msg_edited' + helper.getRandomNo(5),
        status: 'New',
        statusOnTheGrid: 'Open',
        createdBy: createdBy ? createdBy.name : null,
        user: user ? user.firstName : null,
        userId: user ? user.id : null,
        group: group ? group.name : null,
        groupId: group ? group.name : null,
        dueDate: helper.setIsoDateAndTime(2029, 5, 11, 15, 25),
    };
    console.log('Setting new task data ' + JSON.stringify(D.editedTask));

    return D.editedTask;

};

D.getNewTransactionData = function () {

    D.transactionData = {
        transactionNote: 'Transaction is done by Automated Test',
        chOutReason: S.selectedEnvironment.checkoutReason.name,
        disposalMethod: S.selectedEnvironment.disposalMethods[0].name,
        witness:{
            firstName: S.userAccounts.orgAdmin.firstName,
            name: S.userAccounts.orgAdmin.name
        },
        custodian:{
            firstName: S.userAccounts.powerUser.firstName,
            name: S.userAccounts.powerUser.name
        },
        returnedBy:{
            firstName: S.userAccounts.powerUser.firstName,
            name: S.userAccounts.powerUser.name
        },
        storageLocation:S.selectedEnvironment.locations[0].name
    };

    console.log('Setting new transaction data ' + JSON.stringify(D.transactionData));

    return D.transactionData;
};

D.getNewMediaData = function (active = 'Yes', uploadedBy = S.userAccounts.orgAdmin) {
    D.newMedia = {
        active: active,
        size: '8713 bytes',
        uploadedBy: uploadedBy,
        description: 'Dsc' + helper.getRandomNo(5),
        category:'Ctg' + helper.getRandomNo(5),
        location: 'Safe Cloud',
        primaryCase: D.newCase.caseNumber
    };
    console.log('Setting new task data ' + JSON.stringify(D.newMedia));

    return D.newMedia;

};

D.getCaseValuesOnGrid = function (invisibleColumns) {
    let newCase = Object.assign({}, D.newCase);

    invisibleColumns.forEach(invisibleColumn => {
        dataObject.invisibleColumns = null;
    });
};

D.removeValuesForDisabledCaseFields = function (enabledFields) {

    let dataObjects = [D.newCase, D.editedCase];

    let caseFields = [
        'offenseLocation',
        'offenseDescription',
        'offenseDate',
        'offenseDateEditMode',
        //  'tags'
    ];

    dataObjects.forEach(caseObject => {

        caseFields.forEach(field => {
            if (fieldIsDisabled(enabledFields, C.caseFields[field])) caseObject[field] = null;
        });
        if (fieldIsDisabled(enabledFields, C.caseFields.tags)) caseObject.tags[0].name = null;
    });
};

let fieldIsDisabled = function (enabledFields, field) {
    return !enabledFields || (enabledFields && !enabledFields.includes(field));
};

D.removeValuesForDisabledItemFields = function (enabledFields) {

    let dataObjects = [D.newItem, D.editedItem];

    let itemFields = [
        'recoveryDate',
        'recoveryDateEditMode',
        'recoveredBy',
        'recoveryLocation',
        'recoveredByName',
        'recoveredById',
        'custodyReason',
        'custodyReasonId',
        'make',
        'model',
        'serialNumber',
        'barcodes',
        'description',
        'people',
        'peopleIds',
        'additionalBarcode',
        'recoveredByObject',
    ];

    dataObjects.forEach(itemObject => {

        itemFields.forEach(field => {
            if (fieldIsDisabled(enabledFields, C.itemFields[field])) itemObject[field] = null;
        });
        if (fieldIsDisabled(enabledFields, C.itemFields.tags)) itemObject.tags[0].name = null;
    });
};

D.removeValuesForDisabledPersonFields = function (enabledFields) {

    let dataObjects = [D.newPerson, D.editedPerson];

    let personFields = [
        'businessName',
        'middleName',
        'alias',
        'dateOfBirth',
        'driverLicence',
        'race',
        'gender',
        'mobilePhone',
        'otherPhone',
        'deceased',
        'juvenile',
        'email',
       // 'addresses',
        'line1',
    ];

    dataObjects.forEach(personObject => {

        personFields.forEach(field => {
            if (fieldIsDisabled(enabledFields, C.personFields[field])) personObject[field] = null;
        });
    });
};

D.getCaseDataWithReducedFields = function (arrayOfEnabledFields) {
    D.getNewCaseData();
    D.getEditedCaseData();
    D.removeValuesForDisabledCaseFields(arrayOfEnabledFields);
    return D.newItem;
};

D.getItemDataWithReducedFields = function (specificCaseObject, arrayOfEnabledFields) {
    D.getNewItemData(specificCaseObject);
    D.getEditedItemData(specificCaseObject);
    D.removeValuesForDisabledItemFields(arrayOfEnabledFields);
};

D.getPersonDataWithReducedFields = function (specificCaseObject, arrayOfEnabledFields) {
    D.getNewPersonData(specificCaseObject);
    D.getEditedPersonData(specificCaseObject);
    D.removeValuesForDisabledPersonFields(arrayOfEnabledFields);
};

D.generateNewDataSet = function (withReducedFields = false) {
    D.setNewRandomNo();
    S.getCurrentDate();
    // api.cases.get_most_recent_case();
    // api.cases.get_old_case_data(S.selectedEnvironment.oldCase.id);

    D.getNewCaseData();
    D.getEditedCaseData();

    D.getNewItemData();
    D.getEditedItemData();

    D.getNewPersonData();
    D.getEditedPersonData();

    D.getNewTaskData();
    D.getEditedTaskData();

    D.getNewTransactionData();
    D.getNewMediaData()

    if (withReducedFields) {
        D.removeValuesForDisabledCaseFields();
        D.removeValuesForDisabledItemFields();
        D.removeValuesForDisabledPersonFields();
    }
};

D.setNewRandomNo();
D.getRandomNo();

D.getDataForMultipleCases = function (numberOfCases) {

    for (let i = 1; i < numberOfCases + 1; i++) {
        D['case' + i] = Object.assign({}, D.getNewCaseData());
    }
};

D.currentDateAndRandomNumber = helper.setDate(C.currentDateTimeFormat_dateOnly) + '_' + helper.getRandomNo(3);

D.getStorageLocationData = function (locationSuffix, parentId, canStore = true, isActive = true) {

    return D['newLocation' + locationSuffix] = [{
        'name': D.currentDateAndRandomNumber + '_' + locationSuffix,
        'active': isActive,
        'parentId': parentId,
        'canStoreHere': canStore,
    }];
};

module.exports = D;
