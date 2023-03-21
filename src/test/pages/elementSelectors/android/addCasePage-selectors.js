module.exports = {

 loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
 caseNumberField : e => mob.$('android.widget.EditText'),
 offenseTypeMenuButton : e => mob.$('.select-text'),
 offenseDescription : e => mob.$('android=.className("android.widget.EditText").index(0).instance(2)'),
 //editedOffenseDescription : e => mob.$("(//input[@type='text'])[5]"),
 editedOffenseDescription : e => mob.$$('.input-cover')[4],
 offenseDate : e => mob.$('android=.text("Select an offense date")'),
 reviewDate : e => mob.$('//*[@name="reviewDate"]'),
 doneButton : e => mob.$('android=.text("DONE")'),
 formTestBen : e => mob.$('android=.text("Select Form to Add")'),
 formTestBens : e => mob.$('android=.text("archive TestBen")'),   //need to check
 textBoxField : e => mob.$('android=.className("android.widget.EditText").index(0).instance(4)'),
 radioButtonList : e => mob.$('android=.className("android.view.View").index(0).instance(71)'),
 caseOfficerName : e => mob.$('android=new UiScrollable(new UiSelector().className("android.view.View").index(1).instance(2)).scrollIntoView(' +
        'new UiSelector().className("android.widget.EditText").index(0).instance(0))'),
 caseOfficerTypeahead : (officerName) => mob.$('android=.text("person ' + officerName + '")'),
 saveButton : e => mob.$("//*[text()='Save']"),
 uploadMediaIcon : e => mob.$('android=.text("close add")'),
 basicInfoIcon : e => mob.$('android=.text("Basic Info")'),
 addressHeader : e => mob.$('android=.text("Enter address")'),
 addressPlaceHolder : e => mob.$('(//android.widget.EditText[1])[last()]'),
 editedAddress : location => mob.$('android=.textContains("' + location + '")'),
 selectMediaFile : e => mob.$('android=.text("tux.jpg")'),
 showRoot : e => mob.$('~Show roots'),
 downloadLocation : e => mob.$('android=.text("Downloads")'),
 trueIcon : e => mob.$('android=.text("checkmark")'),
 checkmark : e => mob.$('android=.text("checkmark circle-outline")'),
 caseMediaHeader : e => mob.$('android=.text("Case Media")'),
 enterAddressHeader : e => chromeDesktop.$("//div[text()='Enter address']"),
 searchAddressPlaceholder : e => mob.$('android=.className("android.widget.EditText").index(1)'),
 addressSearchResult : address => mob.$('android=.text("' + address + '")'),
 tagValue : text => mob.$('ion-col*=' + text),
 offenseItem  : text => mob.$('android=new UiScrollable(new UiSelector().className("android.view.View").index(0).instance(23)).scrollIntoView(' +
        'new UiSelector().textContains("' + text + '"))'),
// get offenseLocation : e => mob.$('android=.className("android.widget.EditText").index(0).instance(1)')
 //offenseDescription : e => mob.$('//*[contains(text(),"offense description")]//..//div'),
 basicInfoHeader : e => mob.$('android=.text("Basic Info")'),
 orgName : org => mob.$("//*[contains(text(),'" + org + "')]"),
 officeName : office => mob.$("//*[contains(text(),'" + office + "')]"),
caseNumber : (caseNumber) => mob.$("//*[contains(text(),'" + caseNumber + "')]"),
offense : e => mob.$('android=.text("Assault")'),
 caseofficer : e => mob.$('user-view=Amr org admin'), //need to check
 location : address => mob.$('ion-col=' + address), //D.addressSearchResult
caseDesc : (desc) => mob.$('ion-col*=Created for testing purposes code: ' + desc),
currentDate : (date) => mob.$("//*[contains(text(),'" + date + "')]"),
 Tag : e => mob.$(`//*[contains(text(),${D.tags})]`),

 caseName : e => mob.$('android=.textContains("Case # Case Mobile Test -")'),
 caseList : e => mob.$('android=.textContains("Case Mobile Test")'),

 itemPage : e => mob.$('div*=Case Items'),
 itemBadge : text => mob.$('android=.text("' + text + '")'),

 peopleBadge : text => mob.$('android=.text("' + text + '")'),
 editIcon : e => mob.$('android=.text("close create")'),
 //caseName : e => mob.$('android=.textContains("Case # Case Mobile Test -")'),
 offenseLocationEdit : e => mob.$('android=.className("android.widget.EditText").index(0).instance(2)'),
 saveButtonEditPage : e => mob.$("//ion-row//ion-col[2]//button//span[text()='Save']"),
 fileButton : e => mob.$("//span[text()='Files']"),
 fileButtons : e => mob.$('android=.text("FILES")')

}
