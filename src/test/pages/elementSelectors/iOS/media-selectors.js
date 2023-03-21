module.exports = {
     photoLibraryButton : e => mob.$('//XCUIElementTypeButton[@name="Photo Library"]'),
     addSelectedMediaButton : e => mob.$('//XCUIElementTypeButton[@name="Add"]'),
     image : text => mob.$('//XCUIElementTypeImage[@name="Photo, ' + text + '"]'),

    }


