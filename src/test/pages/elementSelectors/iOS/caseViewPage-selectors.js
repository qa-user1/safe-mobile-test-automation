module.exports = {

     loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
     caseViewPage : e => mob.$('~case view'),
     editCaseButton : e => mob.$('~close create'),
     caseNumberOnViewPage : caseNumber => mob.$('~Case Number' + caseNumber),
     caseStatus : status => mob.$('ion-col*=' + status),
     //caseStatus : status => mob.$('~' + status),
     caseOrg : Org => mob.$('~' + Org),
     caseOffice : office => mob.$('~' + office),
     caseNumber : caseNumber => mob.$('~' + caseNumber),
     offenseType : offenseType => mob.$('~' + offenseType),
     caseOfficer : officer => mob.$('~' + officer),
     reviewDate : reviewDate => mob.$('~' + reviewDate),
     caseOffenseDescription: description  => mob.$('~' + description),
     caseOffenseLocation: location  => mob.$('~' + location),
     offenseDateField: date  => mob.$('~' + date),
     reviewDateNotes : e => mob.$('//XCUIElementTypeOther[@name="document Basic Info, tab panel"]/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[25]'),
     Badge : text => mob.$('~' + text),
     addItemButton: e => mob.$('//XCUIElementTypeButton[@name="close add"]'),
     //statusToggleButton: status => mob.$('//XCUIElementTypeSwitch[@name=“' + status + '”]')
     statusToggleButton: e => mob.$('//XCUIElementTypeOther[@name=“document Basic Info, tab panel”]/XCUIElementTypeOther[2]/XCUIElementTypeOther[3]/XCUIElementTypeOther[4]/XCUIElementTypeOther')

    //menu on Case view page, Closed

    // tabUnderCaseView : text => mob.$('~' + text)
    };

