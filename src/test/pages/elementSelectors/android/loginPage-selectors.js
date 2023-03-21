module.exports = {
  welcomeHeader : e => mob.$('android=.text("Welcome to SAFE!")'),
  settingsButton : e => mob.$('//android.widget.Button[@text=\'SETTINGS\']'),
  trueIcon : e => mob.$('//android.widget.Button[@text=\'checkmark\']'),
  addButton : e => mob.$('android=.text("ADD")'),
  addDomainHeader : e => mob.$('android=.text("Add Domain")'),
  domainName : e => mob.$('android=.className("android.widget.EditText").index(0).instance(0)'),
  domainUrl : e => mob.$('android=.className("android.widget.EditText").index(0).instance(1)'),
  domainMediaUrl : e => mob.$('android=.className("android.widget.EditText").index(0).instance(2)'),
  settingsHeader : e => mob.$('android=.text("Settings")'),
  loggedUserButton : e => mob.$('//android.widget.Button[@text=\'VIEW LOGGED IN USERS\']'),
  //settingsButton : e => mob.$('//android.widget.Button[@text=\'SETTINGS\']'),
  settingsPage : e => mob.$('//android.view.View[@text=\'Settings\']'),
  domainHolder : e => mob.$('android=.className(\"android.widget.Spinner\")'),
  domainList : e => mob.$$('(//android.app.Dialog//android.view.View)[1]'),
  localHostRadioButton : e => mob.$('//android.widget.RadioButton[@text=\'Localhost\']'),
  cancelButton : e => mob.$('//android.widget.Button[@text=\'CANCEL\']'),
  selectedDomain : e => mob.$('android=.className("android.view.View").index(0).instance(19)'),
  developmentRadioButton : e => mob.$('android=.text("Development")'),
  okButton : e => mob.$('//android.widget.Button[@text=\'OK\']'),

  DomainButton : e => mob.$('android=.className("android.view.View").index(1).instance(3)'),
  DomainList : e => mob.$('.alert-wrapper'),
  penTestRadiobutton : e => mob.$('//div[text()=\'PenTest\']//..//div[\'.alert-radio-inner\']'),
  domianChangedToastMsg : e => mob.$('//div[\'.toast-message\' and text()=\'Domain changed\']'),
  domainPlaceHolder : e => mob.$('.select-text'),

  unhandeldError : e => mob.$('//*[text()=\'Unhandled Error\']'),
  deleteButton : e => mob.$('//*[text()=\'Delete\']'),
  DeleteButton : e => mob.$('android=.text("DELETE")'),
  penTestDomain : e => mob.$('//*[text()="PenTest"]'),

  emailInput : e => mob.$('android=.className("android.widget.EditText").index(0).instance(0)'),
  passwordInput : e => mob.$('android=.className("android.widget.EditText").index(0).instance(1)'),
  loginButton : e => mob.$('android=.className("android.widget.Button").text("LOGIN")'),
  userLoggedInAlert : e => mob.$("//div[@class='alert-wrapper']"),
  homePageHeader : e => mob.$('android=.text("Recent Cases")'),

  forgetPassLink : e => mob.$('android=.text("Forgot Password?")'),
  passwordResetPage : e => mob.$('android=.text("Password Reset")'),
  resetButton : e => mob.$('android=.text("RESET PASSWORD")'),

  emailPlaceHolder : e => mob.$('android=.className("android.widget.EditText").index(0)'),
  recaptchaModal : e => mob.$('<iframe />'),

  loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div[text()='Please wait...']"),
  photoErrorToastMsg : msg => mob.$("//*[contains(text(),'" + msg + "')]"), //Photo does not belong to organization
  errorNotification : msg => mob.$('android=.text("' + msg + '")'),
  samlCheckBox : e => mob.$$('.checkbox-icon')[1],
  guidInput : text => mob.$('//*[@placeholder="' + text + '"]')

 }
