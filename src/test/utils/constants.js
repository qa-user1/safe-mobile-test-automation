const helper = require('./helper')

let C = exports;

const custody = ['Destruction', 'Evidence', 'Found Property', 'Safe Keeping', 'Search Warrant', 'Unknown'];
var anyValue = Math.floor(Math.random() * custody.length);
C.custodyReasons = custody[anyValue];

const location = ['shelf A', 'shelf B', 'shelf C', 'shelf D'];
var slocation = Math.floor(Math.random() * location.length);
C.storage = location[slocation];

const personTypes = ['Contact', 'Daughter', 'Father', 'Son', 'Suspect'];
var types = Math.floor(Math.random() * personTypes.length);
C.personType = personTypes[types];

const categoryList = ['Alcohol', 'Ammunition', 'Bicycle', 'Clothing', 'Computer'];
var category = Math.floor(Math.random() * categoryList.length);
C.categoryType = categoryList[category];

const offenseList = ['Assualt'];
var offenses = Math.floor(Math.random() * offenseList.length);
C.offenseType = offenseList[offenses];

const raceItemList = ['African American or Black', 'American Indian or Alaska Native', 'Asian', 'Hispanic', 'Middle Eastern'];
var races = Math.floor(Math.random() * raceItemList.length);
C.raceType = raceItemList[races];

const states = ['AL - Alabama', 'AK - Alaska', 'AR - Arkansas', 'CA - California', 'CO - Colorado', 'CT - Connecticut', 'DE - Delaware'];
var randomState = Math.floor(Math.random() * raceItemList.length);
C.state = states[randomState];

C = {

    messages : {
        loginErrorMsg: 'The user name or password is incorrect.',
        imageErrorMsg: 'Photo does not belong to organization',
        permissionErrorMsg: 'You do not have permissions',
        caseNumberFormattingMessage: "Enter a valid character based on guidelines below:",
        cannotMoveItemToTheSameLocation : 'Transaction Error : Can\'t move to the same location',
        scanPage:{
            itemCurrentOffice: 'No Items in Current Office',
            itemOtherOffices: 'No Items in Other Offices',
            containers: "You haven't scanned any containers yet!",
            history: 'Your Scan History is Empty.'
        }
    },
    buttons: {
        ok: 'OK',
        done: 'Done',
        clear: 'Clear',
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
        actions: 'Actions',
        search: 'Search',
        reports: 'Reports',
        view: 'View',
        add: 'add',
        next: 'Next',
        nextSave: 'Next (Save)',
        import: 'Import',
        precheckOnly: 'Precheck Only',
        runReport: 'Run Report',
        login: 'Login',
        setPassword: 'Set Password',
        changePassword: 'Change Password',
        yes: 'Yes',
        details: 'Details',
        addItem: 'Add Item',
        addPerson: 'Add Person',
        addExternal: 'Add External',
        addTask: 'Add Task',
        addNote: 'Add Note',
        newReport: 'New Report',
        start: 'Start',
        menuCustomization: 'Menu Customization',
        views: 'Views',
        options: 'Options',
        redestributeCaseReviewDates: 'Re-Distribute Case Review Dates',
        recalculateCasesToDispose: 'Recalculate Cases to Dispose',
        updateCases: `Update Cases`,
        closeCases: `Close Cases`,
        closeXCases: X => `Close ${X} Cases`,
        viewXCases: X => `View ${X} Cases`,
    },
    menu:{
        homePage: 'Home home',
        addCase: 'Add Case add',
        addItem: 'Add Item add',
        addPerson: 'Add Person add',
        searchCase: 'Search Case search',
        tasks: 'Tasks',
        barcodeScanner: 'Barcode Scanner qr scanner',
        switchOffices: 'Switch Offices apps',
        discrepancyReports: 'Discrepancy Reports report',
        randomAudits: 'Random Audits report',
        settings: 'Settings settings',
        logOut: 'Logout exit',
    },

    caseTabs : {
        basicInfo: 'Basic Info',
        items: 'Items',
        people: 'People',
        media: 'Media',
        notes: 'Notes',
        customData: 'Custom Data'
    },

    itemTabs : {
        basicInfo: 'Basic Info',
        media: 'Media',
        notes: 'Notes',
        customData: 'Custom Data'
    },

    peopleTabs : {
        basicInfo: 'Basic Info',
        addresses: 'Addresses',
        casesAndItems: 'Cases & Items',
        media: 'Media',
        notes: 'Notes',
        tasks: 'Tasks',
        customData: 'Custom Data',
        history: 'History'
    },

    itemFields: {
        orgNo: 'Org #',
        active: 'Active',
        barcode: 'Barcode',
        additionalBarcodes: 'Additional Barcodes',
        category: 'Category',
        custodian: 'Custodian',
        custodyReason: 'Custody Reason',
        itemBelongsTo: 'Item Belongs To',
        description: 'Description',
        location: 'Location',
        make: 'Make',
        model: 'Model',
        parentItemDescription: 'Parent Item Description',
        parentItemId: 'Parent Item Id',
        parentSequentialOrgNumber: 'Parent Sequential Org Number',
        primaryCaseNumber: 'Primary Case Number',
        primaryCaseOfficer: 'Primary Case Officer',
        recoveredBy: 'Recovered By',
        recoveryDate: 'Recovery Date',
        recoveryDateEditMode: 'Recovery Date',
        recoveryLocation: 'Recovery Location',
        sequentialCaseNumber: 'Sequential Case Number',
        sequentialOrgNumber: 'Sequential Org Number',
        serialNumber: 'Serial Number',
        status: 'Status',
        tags: 'Tags',
        submittedBy: 'Submitted By',
        expectedReturnDate: 'Expected Return Date',
        actualDisposedDate: 'Actual Disposed Date',
    },
    personFields: {
         businessName: 'businessName',
         firstName: 'firstName',
         lastName: 'lastName',
         middleName: 'middleName',
         alias: 'alias',
         driverLicence: 'driverLicence',
         mobilePhone: 'mobilePhone',
         otherPhone: 'otherPhone',
         race: 'raceId',
         gender: 'genderId',
         email: 'email',
         addressType: 'addressTypeId',
         personType: 'personTypeId',
         address1: 'line1',
         address2: 'line2',
         city: 'city',
         state: 'stateId',
         postalCode: 'zip',
    },
    caseFields: {
        active: "Active",
        caseNumber: "Case Number",
        caseOfficer: "Case Officer",
        createdDate: "Created Date",
        creator: "Creator",
        tags: "Tags",
        followUpDate: "Follow-Up Date",
        offenseDate: "Offense Date",
        offenseDateEditMode: "Offense Date",
        offenseDescription: "Offense Description",
        offenseLocation: "Offense Location",
        offenseType: "Offense Type",
        office: "Office",
    },
    caseCustomFields: {
        cypressCaseForm_Textbox: "Cypress Case Form > Textbox",
        cypressCaseForm_Email: "Cypress Case Form > Email",
        cypressCaseForm_Number: "Cypress Case Form > Number",
        cypressCaseForm_Password: "Cypress Case Form > Password",
        cypressCaseForm_Textarea: "Cypress Case Form > Textarea",
        cypressCaseForm_Checkbox: "Cypress Case Form > Checkbox",
        cypressCaseForm_RadiobuttonList: "Cypress Case Form > Radiobutton List",
        cypressCaseForm_CheckboxList: "Cypress Case Form > Checkbox List",
        cypressCaseForm_SelectList: "Cypress Case Form > Select List",
        cypressCaseForm_Date: "Cypress Case Form > Date",
    },
    itemCustomFields: {
        cypressItemForm_Textbox: "Cypress Item Form > Textbox",
        cypressItemForm_Email: "Cypress Item Form > Email",
        cypressItemForm_Number: "Cypress Item Form > Number",
        cypressItemForm_Password: "Cypress Item Form > Password",
        cypressItemForm_Textarea: "Cypress Item Form > Textarea",
        cypressItemForm_Checkbox: "Cypress Item Form > Checkbox",
        cypressItemForm_RadiobuttonList: "Cypress Item Form > Radiobutton List",
        cypressItemForm_CheckboxList: "Cypress Item Form > Checkbox List",
        cypressItemForm_SelectList: "Cypress Item Form > Select List",
        cypressItemForm_Date: "Cypress Item Form > Date",
    },
    tableRows: {
        item: {
            primaryCaseLabel: 'Case Number ',
            descriptionLabel: 'Description: ',
            storageLocationLabel: 'Storage Location: ',
        },
        person: {
            nameLabel: 'Name: ',
            genderLabel: 'Gender: ',
            emailLabel: 'Email: ',
        },
    },
    dropdowns: {
        itemActions: {
            checkItemIn: "Check Item In",
            checkItemOut: "Check Item Out",
            moveItem: "Move Item",
            transferItem: "Transfer Item",
            disposeItem: "Dispose Item",
            undisposeItem: "Undispose Item",
            duplicate: "Duplicate",
            split: "Split",
            addToCase: "Add To Case",
            removeFromCase: "Remove From Case",
            changePrimaryCase: "Change Primary Case",
            manageCases: "Manage Cases",
        },
        caseActions: {
            massUpdate: "Mass Update"
        },
        userActions: {
            sendVerificationEmail: 'Send Verification Email',
            setPermissions: 'Set Permissions',
            addToGroup: 'Add to Group',
            addExternalUsers: 'Add External Users',
            removeExternalUsers: 'Remove External Users',
            unlockUser: 'Unlock User',
            deactivateUsers: 'Deactivate Users',
            activateUsers: 'Activate Users',
        }
    },
    tabs: {
        basicInfo: 'Basic Info',
        cases: 'Cases',
        items: 'Items',
        people: 'People',
        media: 'Media',
        notes: 'Notes',
        tasks: 'Tasks',
        chainOfCustody: 'Chain of Custody',
        scanHistory: 'Scan History',
        history: 'History',
        permissions: 'Permissions',
        addresses: 'Addresses',
        casesInvolved: 'Cases Involved',
        itemsRecoveredBy: 'Items Recovered By',
        itemsBelongingTo: 'Items Belonging To',
        itemCustodian: 'Item Custodian',
        noDate: 'No Date',
        pastDue: 'Past Due',
        upcoming: 'Upcoming',
        all: 'All',
    },
    itemStatuses: {
        checkedIn: 'Checked In',
        checkedOut: 'Checked Out',
        disposed: 'Disposed',
    },
    searchCriteria: {
        dates: {
            before: 'before',
            after: 'after',
            between: 'between',
            exactly: 'exactly',
        },
        inputFields: {
            equals: 'equals',
            equalsAnd: 'equals (and)',
            equalsOr: 'equals (or)',
            notEquals: 'not equals',
            startsWith: 'starts with',
            textSearch: 'text search',
        }
    },
    validation_msgs: {
        addCase:{
           alreadyExists: 'Already exists!',
           minimum3Characters: 'Minimum 3 characters'
        },
        forbidden: 'Forbidden',
        caseNumberDoesNotExist: 'Case with such number doesn\'t exist',
        authenticationError: 'Authentication error',
        incorrectCredentials: 'The user name or password is incorrect',
        areYouSure: 'Are you sure?',
        userLoggedInOnOtherMachine: 'Your account is logged in on another machine/browser. If you continue, you will be logged out.',
        wrongPassword_1st_attempt: 'You typed the password incorrectly 1 time.  You have 4 tries until you will be locked out.',
        wrongPassword_4th_attempt: 'You typed the password incorrectly 4 times.  You have 1 try until you will be locked out.',
        wrongPassword_5th_attempt: 'The user has had too many failed login attempts and has been locked out for a duration of 1 minute.',
    },
    checkoutReasons: {
        lab: 'Lab',
        court: 'Court',
        audit: 'Audit'
    },
    custodyReason: {
        asset: 'Asset',
        investigation: 'Investigation',
    },
    offenseTypes: {
        accident: 'Accident',
        bAndE: 'B & E',
        burglary: 'Burglary',
        vandalism: 'Vandalism',
    },
    personTypes: {
        prosecutor: 'Prosecutor',
        suspect: 'Suspect',
        victim: 'Victim',
        witness: 'Witness'
    },
    races: {
        asian: 'Asian',
        hispanic: 'Hispanic',
        white: 'White'
    },
    addressTypes: {
        home: {
            name: 'Home',
            id: 1
        },
        work: {
            name: 'Work',
            id: 2
        },
        other: {
            name: 'Other',
            id: 3
        },
    },
    states: {
        Alabama: {
            name: 'AL - Alabama',
            id: 1
        },
        Arizona: {
            name: 'AZ - Arizona',
            //id: 17
        },
        Kentucky: {
            name: 'Kentucky',
            id: 17
        },
        Texas: {
            name: 'Texas',
            id: 43
        },
    },
    disposalMethods: {
        destroyed: 'Destroyed',
        donated: 'Donated'
    },
    itemCategories: {
        alcohol: 'Alcohol',
        computer: 'Computer',
        accessory: 'Accessory',
        ammunition: 'Ammunition',
        vehicle: 'Vehicle',
        currency: 'Currency',
    },
    noteCategories: {
        misc: 'Miscellaneous',
        sensitive: 'Sensitive',
    },
    toastMsgs: {
        saved: 'Saved!',
        noteSaved: 'Note Saved',
        uploadComplete: 'Upload Complete',
        importComplete: 'Import Complete',
        precheckComplete: 'Precheck Complete',
        recordsImported: ' records imported',
        recordsPrechecked: ' records successfully prechecked',
        addedNewCase: 'Added new Case: ',
        addedNewItem: (caseNumber, orgNo, itemNo) => `Item has been saved in Case # ${caseNumber} with Org # ${orgNo} and Item # ${itemNo}`,
        resultsLimitExceeded: 'Result Limit Exceeded',
        reportRunning: 'The report is running and will automatically open in a new window when it is finished.',
        daysCanOnlyBePositiveNumber: 'Days can only be Positive Number',
        locationChanged: 'Location Changed',
        emailsSent: numberOfEmails => `${numberOfEmails} emails sent`
    },
    reports: {
        printCaseAndPeopleOnly: 'Print Case and People only',
        selectPeople: 'Select People',
        primaryLabel4x3: '4x3 Primary Label',
        evidenceList: 'Evidence List _ Report by Case - Landscape',
        propertyReleaseForm: 'Property Release Form',
    },
    login: {
        messages: {
            permissionsNotSet: 'While you are properly authenticated, your admin has not set any Permission Groups for your account. Please ask them to assign your account a Permission Group.'
        }
    },
    users: {
        setPassword: {
            confirmationMsg: 'Your Password has been set'
        },
        emailTemplates: {
            welcomeToSafe: {
                subject: 'Welcome to SAFE!',
                content: (userObject) =>
                    `Hello ${userObject.firstName} ${userObject.lastName},A request was just made to allow ${userObject.emailEncoded} access to the SAFE system. Before you can continue you need to verify the request. Confirm your email address.Once you have confirmed your account you can proceed to the SAFE login screen.Thanks,The SAFE team!\r\n`
            },
        },
    },
    workflows: {
        types: {
            items: 'items',
            cases: 'cases'
        },
        executeWhen: {
            created: 'Created',
            edited: 'Edited',
            createdOrEdited: 'Created or Edited',
            fieldEdited: 'Field Edited',
            customFieldEdited: 'Custom Field Edited',
        },
        whichRecords: {
            all: 'All',
            matchingCriteria: 'Matching Criteria:',
            matchingCriteriaCustomField: 'Matching Criteria Custom Field',
            filterByOffice: 'Filter by office',
        },
        itemCreated: {
            subject: 'Item Created',
            content: (itemObject) =>
                `<h1>Item Created</h1>A new item with barcode <b>${itemObject.barcode}</b> has been added into your system by <b>${itemObject.submittedByName} (${itemObject.submittedById})</b>.<br><br><b>Primary Case:</b> ${itemObject.caseNumber}<br><b>Item Number:</b> ${itemObject.sequentialCaseId}<br><b>Item Location:</b> ${itemObject.location}<br><b>Item Description:</b> ${itemObject.description}`
        },
        itemEdited: {
            subject: 'Item Edited',
            content: (itemObject) =>
                `<h1>Item Edited</h1>Item with barcode <b>${itemObject.barcode}</b> edited by user <b>${itemObject.submittedByName} (${itemObject.submittedById})</b>.<br><br><b>Primary Case:</b> ${itemObject.caseNumber}<br><b>Item Number:</b> ${itemObject.sequentialCaseId}<br><b>Item Location:</b> ${itemObject.location}<br><b>Item Description:</b> ${itemObject.description}`
        },
        itemFieldEdited: {
            subject: 'Item Field Edited',
            content: (itemObject, fieldEdited) =>
                `Item with barcode ${itemObject.barcode} edited field ${fieldEdited} by user ${itemObject.submittedByName} (${itemObject.submittedById})</b>.<br><br><b>Primary Case:</b> ${itemObject.caseNumber}<br><b>Item Number:</b> ${itemObject.sequentialCaseId}<br><b>Item Location:</b> ${itemObject.location}<br><b>Item Description:</b> ${itemObject.description}`
        },
        itemCustomFieldEdited: {
            subject: 'Item Custom Field Edited',
            content: (itemObject, fieldEdited) =>
                `Item with barcode ${itemObject.barcode} edited custom field ${fieldEdited} by user ${itemObject.submittedByName} (${itemObject.submittedById})</b>.<br><br><b>Primary Case:</b> ${itemObject.caseNumber}<br><b>Item Number:</b> ${itemObject.sequentialCaseId}<br><b>Item Location:</b> ${itemObject.location}<br><b>Item Description:</b> ${itemObject.description}`
        },
        caseCreated: {
            subject: 'Case Created',
            content: (caseObject) =>
                `Case created with number ${caseObject.caseNumber} by user ${caseObject.submittedByName} (${caseObject.submittedById})`
        },
        caseEdited: {
            subject: 'Case Edited',
            content: (caseObject) =>
                `Case with number ${caseObject.caseNumber} edited by user ${caseObject.submittedByName} (${caseObject.submittedById})`
        },
        caseFieldEdited: {
            subject: 'Case Field Edited',
            content: (caseObject, fieldEdited) =>
                `Case with number ${caseObject.caseNumber} edited field ${fieldEdited} by user ${caseObject.submittedByName} (${caseObject.submittedById})`
        },
        caseCustomFieldEdited: {
            subject: 'Case Custom Field Edited',
            content: (caseObject, fieldEdited) =>
                `Case with number ${caseObject.caseNumber} edited custom field ${fieldEdited} by user ${caseObject.submittedByName} (${caseObject.submittedById})`
        },
        actionToPerform: {
            email: 'Email',
            SMS: 'SMS',
        },
        operators: {
            equals: '=',
            notEquals: '!=',
        }
    },
    CLP: {
        cannot_set_CLP: `    Cannot Set Case Level Permissions
    Permissions cannot be applied: `,
        items_belong_to_several_cases: `There are Item(s) that belong to several cases:`,
        addingItemIsForbidden: 'Adding item is forbidden. Item belongs to a restricted case',
        changingPrimaryCaseIsForbidden: 'Changing Primary Case for restricted items is not allowed',
        managingCasesIsForbidden: 'Managing Cases is forbidden. Item belongs to the restricted case.',
        access_allowed_based_on_office_permissions: `Case is available to the Users according to their Office permissions`,
        cannot_display_case_due_to_CLP: `This Case cannot be displayed, you do not have access to view this Case.`,
        cannot_display_item_due_to_CLP: `This item cannot be displayed, you do not have access to view this item.`,
        cannot_display_task_due_to_CLP: `This Task cannot be displayed, you do not have access to view this Task.`,
        noPermissionsToAddItemsToCase: `You do not have permissions to add Items to this Case`,
        caseLevelPermissionsForGroups: `Note - you will be applying case level permissions to all users (in all offices) for the following groups:`,
    },
};

C.labels = {
    dashboard: {
        title: 'Dashboard'
    },
    addCase: {
        title: 'Add Case'
    },
    addItem: {
        title: 'Add Item',
        confirmItemDuplication: 'Confirm Item Duplication',
        confirmItemSplit: 'Confirm Item Split',
    },
    addPerson: {
        title: 'Add Person'
    },
    caseView: {
        title: 'Case View'
    },
    itemView: {
        title: 'Item View'
    },
    personView: {
        title: 'Person View'
    },
    tasksPage: {
        title: 'Tasks'
    },
    userAdmin: {
        title: 'User Admin'
    },
    organization: {
        title: 'Org Settings',
        tabs: {
            orgSettings: 'Org Settings',
            autoDisposition: 'Auto Disposition',
        }
    },
    discrepancyReports: {
        summaryTableColumns: {
            totalActiveItems : 'Total Active Items In Scanned Locations:',
            locationsScanned: 'Locations Scanned',
            itemsScanned: 'Items Scanned',
            discrepanciesFound: 'Discrepancies Found'
        },
        title: 'Discrepancy Reports',
        noDiscrepanciesFound: 'No Discrepancies Found',
        wrongStorageLocations: numberOfItems => `Wrong Storage Location (${numberOfItems}):`,
        notScanned: numberOfItems => `Not Scanned (${numberOfItems}):`,
    },
    autoDisposition: {
        casesWithNoReviewDate: numberOfCases => `Open Cases with NO Review Date: ${numberOfCases}`,
        casesWithReviewDatePastDue: numberOfCases => `Open Cases with Review Date PAST DUE: ${numberOfCases}`,
        casesWithUpcomingReviewDate: numberOfCases => `Open Cases with UPCOMING Review Date: ${numberOfCases}`,
        casesWithoutItems: numberOfCases => `There are ${numberOfCases} Cases without Items or with all disposed Items.`,
        casesWithoutTasks: numberOfCases => `There are ${numberOfCases} Cases with Review Date in the past and without open Tasks.`,
        updateCases: ['Update Cases', 'Review Date', 'Distribute Between', 'Review Date Notes', 'Update in Order?', 'Order By Offense Date'],
        pleaseWait: `Please wait while updated review dates are applied.`,
        casesToBeClosed: caseNumber =>
            [`Cases to be closed:`,
                caseNumber],
        viewCases: `View Cases`,
        calculatingCasesToDispose: `Calculating cases to close...`,
        lastCasesCalculation: numberOfCases => [
            `Last Cases Calculation Date:`,
            `${helper.getCurrentDateInCurrentFormat(C.currentDateTimeFormat.dateOnly)}`,
            `Cases amount: ${numberOfCases}`],
    },
    workflows: {
        title: 'Workflows'
    },
    userSettings: {
        title: 'User Settings'
    },
};

C.placeholders = {
    personField: 'Select Person',
    caseSearch: 'Case Search',
    usersAndGroups: 'Users or groups...',
    search: {
        caseNumber: 'Enter text',
    },

    home: {
    },
    addCase: {
        enterUser: 'Users or groups...',
        offenseLocation: 'offense location',
        offenseDescription: 'offense description',
        offenseDate: 'Select an offense date',
        reviewDateNotes: 'Review Date Notes',
        autoAssignedCaseNumber: 'Case Number Auto Assigned'
    },
    addItem: {
        caseSearch : 'Case Search',
        selectPerson : 'Select Person',
        recoveryLoc : 'recovery location',
        selectDate : 'Select date',
        make : 'Make',
        model : 'Model',
        additionalBarcodes : 'Additional Barcodes',
        recoveryLocation: 'recovery location',
        itemDescription: 'item description',
        itemSerialNumber: 'item serial number',
        itemBelongsTo: 'Find persons to search for',
        addTags: 'Add Tags...',
        storageLocation: 'Type \'/\' or start typing a location name',
    },
    addPerson: {
        businessName: 'Business Name',
        firstName: 'First Name',
        middleName: 'Middle Name',
        lastName: 'Last Name',
        alias: 'Alias',
        driverLicence: 'Driver\'s License',
        mobilePhone: 'Mobile Phone',
        otherPhone: 'Other Phone',
        email: 'Email',
    },
    tasksPage: {
        nameOfLinkedObject: 'Enter Name',
        item: 'Type an item description to begin to see options.',
        search: 'Search: Task #, Assigned User'
    },
    customFields: {
        user: 'Users or groups...',
        person: 'Select Person',
        date: 'Select date',
        dropdownTypeahead: 'Start typing to see options...',
        lists: 'Select an option'
    },
};

C.transactions = {
    move: 'Move Item',
    checkIn: 'Check Item In',
    checkOut: 'Check Item Out',
    dispose: 'Dispose Item',
    undispose: 'Undispose Item',
    transfer: 'Transfer Item',
    duplicateItem: 'Duplicate the Item',
    splitItem: 'Split the Item'
};

C.alerts = {
    itemInsideOfContainer : {
        title: 'Some Items are inside of a container.',
        message: 'Please confirm you want to move items out of container'
    }
};

C.transactionModal = {
    move: 'move',
    checkIn: 'check-in',
    checkOut: 'check-out',
    dispose: 'disposal',
    undispose: 'undispose',
    transfer: 'transfer',
};

C.badge = {
    noAddress: '(NO ADDRESSES)',
    items: 'NO CASE ITEMS',
    people: 'NO PEOPLE IN CASE',
    media: 'BROWSE FOLDERS',
}

C.dateFormats = {
    fullDate: {
        name: 'fullDate',
        mask: 'dddd, mmmm d, yyyy',
        editMode: {
            mask: 'mmmm d, yyyy',
        }
    },

    longDate: {
        name: 'longDate',
        mask: 'mmmm d, yyyy',
        editMode: {
            mask: 'mmmm d, yyyy',
        }
    },
    mediumDate: {
        name: 'mediumDate',
        mask: 'mmm d, yyyy',
        editMode: {
            mask: 'mmm d, yyyy',
        }
    },
    mobileDate: {
        name: 'mobileDate',
        mask: 'm/d/yy',
        editMode: {
            mask: 'yyyy mmm d',
        }
    },
    shortDate: {
        name: 'shortDate',
        mask: 'mm/dd/yyyy',
        editMode: {
            mask: 'm/d/yy',
        }
    },
    shortDateWithoutLeadingZeros: {
        name: 'shortDate',
        mask: 'm/d/yy',
        editMode: {
            mask: 'm/d/yy',
        }
    },
    'long-dmy': {
        name: 'long-dmy',
        mask: 'd mmmm yyyy',
        editMode: {
            mask: 'd mmmm yyyy',
        }
    },
    'short-dmy': {
        name: 'short-dmy',
        mask: 'dd/mm/yyyy',
        editMode: {
            mask: 'dd/mm/yy',
        }
    }
}

C.dateTimeFormats = {
    full: {
        name: 'full',
        mask: 'dddd, mmmm d, yyyy hh:MM TT',
        editMode: {
            mask: 'mmmm d, yyyy hh:MM TT',
        },
        dateOnly: {
            mask: 'mmmm d, yyyy',
            editMode : {
                mask: 'mmmm d, yyyy',
            }
        }
    },
    fullDayMonth: {
        name: 'fullDayMonth',
        mask: 'dddd, d mmmm, yyyy hh:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'dddd, d mmmm',
            editMode : {
                mask: 'dddd, d mmmm',
            }
        }
    },

    longDateWithoutYear: {
        name: 'longDate',
        mask: 'mmmm dd, h:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'mmmm dd, yyyy',
            editMode : {}
        }
    },
    fullWithLeadingZero: {
        name: 'fullWithLeadingZero',
        mask: 'dddd, mmmm dd, yyyy hh:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'dddd, mmmm dd',
            editMode : {
                mask: 'dddd, mmmm dd',
            }
        }
    },
    long: {
        name: 'long',
        mask: 'mmmm d, yyyy hh:MM TT',
        editMode: {
            mask: 'mmmm d, yyyy hh:MM TT',
        },
        dateOnly: {
            mask: 'mmmm d, yyyy',
            editMode : {
                mask: 'mmmm d, yyyy',
            }
        }
    },
    longDayMonth: {
        name: 'longDayMonth',
        mask: 'd mmmm, yyyy hh:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'd mmmm, yyyy',
            editMode : {
                mask: 'd mmmm, yyyy',
            }
        }
    },
    longWithLeadingZero: {
        name: 'longWithLeadingZero',
        mask: 'mmmm dd, yyyy hh:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'mmmm dd, yyyy',
            editMode : {
                mask: 'mmmm dd, yyyy',
            }
        },

    },
    medium: {
        name: 'medium',
        mask: 'mmm d, yyyy hh:MM TT',
        editMode: {
            mask: 'mmm d, yyyy hh:MM TT',
        },
        dateOnly: {
            mask: 'mmm d, yyyy',
            editMode : {
                mask: 'mmm d, yyyy',
            }
        }
    },
    mediumDayMonth: {
        name: 'mediumDayMonth',
        mask: 'd mmm, yyyy hh:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'd mmm, yyyy',
            editMode : {
                mask: 'd mmm, yyyy',
            }
        }
    },
    mediumWithLeadingZero: {
        name: 'mediumWithLeadingZero',
        mask: 'mmm dd, yyyy h:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'mmm dd, yyyy',
            editMode : {
                mask: 'mmm dd, yyyy',
            }
        }
    },
    short: {
        name: 'short',
        mask: 'mm/dd/yyyy hh:MM TT',
        editMode: {
            mask: 'mm/dd/yy hh:MM TT',
        },
        dateOnly: {
            mask: 'mm/dd/yyyy',
            editMode : {
                mask: 'mm/dd/yy',
            }
        },
        datewithNoLeadingZeros: {
            mask: 'm/d/yy hh:MM TT',
            editMode : {
                mask: 'm/d/yy hh:MM TT',
            }
        }
    },
    shortDateTime: {
        name: 'short',
        mask: 'm/d/yy, h:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'm/d/yy',
            editMode : {
                mask: 'm/d/yy',
            }
        }
    },
    shortDateOnlyWithoutLeadingZeros: {
        name: 'short',
        mask: 'm/d/yyyy',
        editMode: {},
        dateOnly: {
            mask: 'm/d/yyyy',
            editMode : {
                mask: 'm/d/yy',
            }
        }
    },
    military: {
        name: 'military',
        mask: 'mm/dd/yyyy HH:MM',
        editMode: {
            mask: 'mm/dd/yy HH:MM',
        },
        dateOnly: {
            mask: 'mm/dd/yyyy',
            editMode : {
                mask: 'mm/dd/yy',
            }
        }
    },
    iso8601: {
        name: 'iso8601',
        mask: 'yyyy-mm-dd HH:MM',
        editMode: {
            mask: 'yyyy-mm-dd HH:MM',
        },
        dateOnly: {
            mask: 'yyyy-mm-dd',
            editMode : {
                mask: 'yyyy-mm-dd',
            }
        }
    },
    'long-dmy': {
        name: 'long-dmy',
        mask: 'd mmmm yyyy hh:MM TT',
        editMode: {
            mask: 'd mmmm yyyy hh:MM TT',
        },
        dateOnly: {
            mask: 'd mmmm yyyy',
            editMode : {
                mask: 'd mmmm yyyy',
            }
        }
    },
    'long-dmy-military': {
        name: 'long-dmy-military',
        mask: 'd mmmm yyyy HH:MM',
        editMode: {
            mask: 'd mmmm yyyy HH:MM',
        },
        dateOnly: {
            mask: 'd mmmm yyyy',
            editMode : {
                mask: 'd mmmm yyyy',
            }
        }
    },
    'short-dmy': {
        name: 'short-dmy',
        mask: 'dd/mm/yyyy hh:MM TT',
        editMode: {
            mask: 'dd/mm/yy hh:MM TT',
        },
        dateOnly: {
            mask: 'dd/mm/yyyy',
            editMode : {
                mask: 'dd/mm/yy',
            }
        }
    },
    'short-dmy-withoutLeadingZeros': {
        name: 'short-dmy',
        mask: 'd/m/yyyy hh:MM TT',
        editMode: {},
        dateOnly: {
            mask: 'd/m/yyyy',
            editMode : {
                mask: 'd/m/yy',
            }
        }
    },
    'short-dmy-military': {
        name: 'short-dmy-military',
        mask: 'dd/mm/yyyy HH:MM',
        editMode: {
            mask: 'dd/mm/yy HH:MM',
        },
        dateOnly: {
            mask: 'dd/mm/yyyy',
            editMode : {
                mask: 'dd/mm/yy',
            }
        }
    },
}

C.currentDateFormat = C.dateFormats.mobileDate;
C.currentDateTimeFormat = C.dateTimeFormats.shortDateTime;
C.currentDateTimeFormat_dateOnly = C.dateFormats.mobileDate;
C.currentDateAndTimeFormat_withoutYear = C.dateTimeFormats.longDateWithoutYear;



module.exports = C;
