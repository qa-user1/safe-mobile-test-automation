module.exports = {

 loadingWindow: e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
 addItemButton: e => mob.$("//*[@class='fab-md-primary'][position()=2]"),
 caseStatusA : status => mob.$('android=.text("' + status + '")'),
 caseOrg: org => mob.$('android=.text("' + org + '")'),
 caseOffice: office => mob.$('android=.text("' + office + '")'),
 caseNumber: caseNo => mob.$('android=.text("' + caseNo + '")'),
 offenseType: text => mob.$('android=.text("' + text + '")'),
 caseOfficer: officer => mob.$('android=.text("' + officer + '")'),
 caseOffenseLocation: location => mob.$('android=.text("' + location + '")'),
 caseOffenseDescription: description => mob.$('android=.text("' + description + '")'),
 offenseDateField: date => mob.$('android=.text("' + date + '")'),
 caseTag: tag => mob.$('android=.text("' + tag + '")'),
 reviewDate: date => mob.$('android=.text("' + date + '")'),
 caseTab : text => mob.$("//span[text()='" + text + "']"),

 //tabUnderCaseView : text => mob.$('span='+ text),
 itemPage : e => mob.$('div*=Case Items'),
 Badge : text => mob.$('android=.text("' + text + '")'),
 bagdeInfo : e => mob.$('android=.text("Case People")'),
 browseFolder : text => mob.$('android=.text("' + text + '")'),
 cardContent : e => mob.$('android=.text("tux.jpg")'),
}
