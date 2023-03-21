module.exports = {
    homePageHeader : e => mob.$('android=.text("Recent Cases")'),
    homeIcon : e => mob.$('android=.textContains("Home home")'),
    searchField : e => mob.$('.text-input'),
    existingCase: caseNumber => mob.$('android=.text("archive ' + caseNumber + '")'),
    caseList : e => mob.$('android=.textContains("Case Mobile Test")'),
    basicInfoHeader : e => mob.$('android=.text("Basic Info")'),
    burgerIcon : e => mob.$('android=.className("android.widget.Button").text("menu")'),
    loadingWindow : e => mob.$("//div[@class='loading-wrapper']//div [text()='Please wait...']"),
    profilePicture : e => mob.$('android=.text("gL9hoykR99BdOjak4oOXShuW0VeeQWFle3p1L0f5VXdKSqvpqC0A8WVn")'),
    userName : name => mob.$('android=.text("' + name + '")') //MobileAutomation Admin

};
