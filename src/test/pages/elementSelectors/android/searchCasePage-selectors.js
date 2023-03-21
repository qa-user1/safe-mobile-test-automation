module.exports = {
 trashIcon  : e => mob.$('android=.text("trash")'),
 clearModal  : e => mob.$('android=.text("Clear search parameters?")'),
 oKButton  : e => mob.$('android=.text("OK")'),
 selectUserField  : e => mob.$('android=.className("android.widget.EditText").index(0).instance(0)'),
 selectUserResult  : e => mob.$('android=.text("person Amr org admin (akamel+1@trackerproducts.com)")'),//need to check
 caseSearchInput  : e => mob.$('android=.className("android.widget.EditText").index(0).instance(1)'),
 searchButton  : e => mob.$("//span[text()='Search']"),
 casesResultHeader  : e => mob.$("//div[text()='Cases']"),
 searchResults  : e => mob.$("(//android.view.View[contains(@text,'Case Mobile Test')])[2]"),//need to check
 params  : e => mob.$('android=.text("Amr org admin")'),// need to check
 editIcon  : e => mob.$('android=.text("close create")'),
 itemsIcon  : e => mob.$('android=.text("Items")'),
 itemPage  : e => mob.$('android=.text("Case Items")'),
 loadingWindow  : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
 addIcon  : e => mob.$('android=.text("close add")'),
 peopleIcon  : e => mob.$('android=.text("People")'),
 casePeopleHeader  : e => mob.$('div*=Case People'),
 addPersonIcon  : e => mob.$('android=.text("close person add")'),
 newPersonHeader  : e => mob.$('//div[text()="New Person"]'),
 errorMessage  : msg => mob.$("//span[text()='" + msg + "']") //You do not have permissions
}
