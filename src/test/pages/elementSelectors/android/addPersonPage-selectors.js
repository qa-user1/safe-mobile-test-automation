module.exports = {
 businessName : e => mob.$('android=.className("android.widget.EditText").index(0).instance(0)'),
 editIcon : e => mob.$('android=.text("close create")'),
 firstName : e => mob.$('android=.className("android.widget.EditText").index(0).instance(1)'),
 middleName : e => mob.$('android=.className("android.widget.EditText").index(0).instance(2)'),
 lastName : e => mob.$('android=.className("android.widget.EditText").index(0).instance(3)'),
 Alias : e => mob.$('android=.className("android.widget.EditText").index(0).instance(4)'),
 driverLicense : e => mob.$('android=.className("android.widget.EditText").index(0).instance(5)'),
 phoneNumber : e => chromeDesktop.$("//*[@placeholder='Mobile Phone']//input['.text-input']"),
 burgerIcon : e => mob.$('android=.className("android.widget.Button").text("menu")'),
 firstCase : e => mob.$('android=.textContains("archive Case Mobile Test").index(1)'),
 PersonType : e => mob.$('android=.className("android.view.View").index(0).instance(56)'),
 basicInfo : e => mob.$('android=.className("android.view.View").text("Basic Info").index(1).instance(0)'),
 male : e => mob.$('android=.className("android.widget.Button").text("Male")'),
 raceItem : race => mob.$('android=.text("' + race + '")'),
 raceMenu : e => chromeDesktop.$("//*[@formcontrolname='raceId']/../.."),
 gender : e => mob.$("//ion-select[@formcontrolname='genderId']"),
 caseField : e => mob.$('(//ion-input[@type="text"])[13]'),
 loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
 saveButton : e => mob.$('android=.text("SAVE")'),
    //  saveButton() : e => mob.$("//button//span[text()='Save']")}
 license : (driverl) => mob.$("//*[contains(text(),'" + driverl + "')]"),
 addPersonButton : e => mob.$('android=.text("close person add")'),

}


