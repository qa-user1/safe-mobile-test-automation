module.exports = {
     welcomeHeader : e => mob.$('~Welcome to SAFE!'),
     settingsButton  : e => mob.$('-ios predicate string:type == "XCUIElementTypeButton" AND name == "Settings"'),
    // settingsButton  : e => mob.$('~Settings'),
     trueIcon  : e => mob.$('~checkmark'),
     backButton  : e => mob.$('~arrow back Back'),
     addButton  : e => mob.$('~Add'),
     addDomainHeader  : e => mob.$('~Add Domain'),
     domainName  : e => mob.$('-ios predicate string:type == "XCUIElementTypeTextField" AND value == "Enter Domain Here"'),
     domainUrl  : e => mob.$('(//XCUIElementTypeTextField/../../XCUIElementTypeOther)[6]'),
     domainMediaUrl  : e => mob.$('(//XCUIElementTypeTextField/../../XCUIElementTypeOther)[9]'),
     settingsHeader  : e => mob.$('Settings'),
     loggedUserButton  : e => mob.$('~View Logged in Users'),
     settingsPage  : e => mob.$('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "Settings"'),
     domainHolder  : e => mob.$('(//XCUIElementTypeStaticText)[4]'),
     domainList  : e => mob.$('~web dialog'),
     localHostRadioButton  : e => mob.$('-ios predicate string:type == "XCUIElementTypeOther" AND name == "Localhost"'),
     cancelButton  : e => mob.$('-ios predicate string:type == "XCUIElementTypeButton" AND name == "Cancel"'),
     selectedDomain  : e => mob.$('(//XCUIElementTypeStaticText)[4]'),
     developmentRadioButton  : e => mob.$('-ios predicate string:type == "XCUIElementTypeOther" AND name == "Development"'),
     okButton  : e => mob.$('~OK'),

     DomainButton  : e => mob.$('(//XCUIElementTypeStaticText)[4]'),
     DomainList  : e => mob.$('.alert-wrapper'),
    //  penTestRadiobutton : e => mob.$('//div[text()=\'PenTest\']//..//div[\'.alert-radio-inner\']'),
     penTestRadiobutton  : e => mob.$("//div[text()='PenTest']"),

     domianChangedToastMsg  : e => mob.$('//div[\'.toast-message\' and text()=\'Domain changed\']'),
     domainPlaceHolder  : e => mob.$('.select-text'),

     unhandeldError  : e => mob.$('//*[text()=\'Unhandled Error\']'),
     deleteButton  : e => mob.$('//*[text()=\'Delete\']'),
     DeleteButton  : e => mob.$('~Delete'),
     penTestDomain  : e => mob.$('//*[text()="PenTest"]'),

     emailInput  : e => mob.$('-ios predicate string:type == "XCUIElementTypeTextField" AND value == "Email"'),
     passwordInput  : e => mob.$('-ios predicate string:type == "XCUIElementTypeSecureTextField" AND value == "Password"'),
     loginButton  : e => mob.$('~Login'),
     userLoggedInAlert  : e => mob.$("//div[@class='alert-wrapper']"),
     homePageHeader  : e => mob.$('~Recent Cases'),

     forgetPassLink : e => mob.$('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "Forgot Password?"'),
     passwordResetPage : e => mob.$('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "Password Reset"'),
     resetButton  : e => mob.$('-ios predicate string:type == "XCUIElementTypeButton" AND name == "Reset Password"'),

     emailPlaceHolder : e => mob.$('-ios predicate string:type == "XCUIElementTypeTextField" AND value == "Email"'),
     recaptchaModal : e => mob.$('<iframe />'),

     loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
     photoErrorToastMsg  : e => mob.$("//*[contains(text(),'Photo does not belong to organization')]"),
     errorNotification : e => mob.$("//*[contains(text(),'The user name or password is incorrect.')]"),
     samlCheckBox : e => mob.$$('.checkbox-icon')[1],
     guidInput : e => mob.$('//*[@placeholder="Default organization GUID or alias"]')
    }
