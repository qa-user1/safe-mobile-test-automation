module.exports = {
     homePageHeader : e => mob.$('~Recent Cases'),
     homeIcon : e => mob.$('~Home home'),
     searchField: e => mob.$('//XCUIElementTypeTextField[@name="search"]'),
     existingCase: caseNumber => mob.$('~archive ' + caseNumber),
     caseList : e => mob.$$('-ios predicate string:type == "XCUIElementTypeStaticText" AND name contains "Case Mobile Test"'),
     basicInfoHeader : e => mob.$('~Basic Info'),
     burgerIcon : e => mob.$('~menu'),
     loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
     profilePicture : e => mob.$("//img[contains(@src,'data:image/jpeg;base64,iVBORw')]")
    }

