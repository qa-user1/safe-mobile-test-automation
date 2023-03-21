module.exports = {

    printIcon: e => mob.$('~close print'),
    flashIcon: e => mob.$('~close flash'),
    addItemButton: e => mob.$('~close add'),
    itemNo: number => mob.$('//XCUIElementTypeStaticText[@name="ITEM # '+ number + '"]'),
    signatureCanvas: e => mob.$('//XCUIElementTypeOther[@name="Ionic App"]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]'),

}
