import BasePage from './basePage';
import { assert } from 'chai';
import S from '../utils/settings';
import C from '../utils/constants';

let el,
    addMediaButton = e => mob.$('//media-list//button[@color="primary"]//*[@name="close"]'),
    successfulUploadIcon = e => mob.$('//*[@name="checkmark-circle-outline"]'),
    checkmarkIcon = e => mob.$('//page-media-upload//ion-header//ion-navbar//ion-buttons//button'),
    xButton = e => mob.$('//media-details//ion-header//ion-navbar//ion-buttons//button'),
    photo = e => mob.$('//media-file-view//img[@class="view-img"]'),
    photoSize = size => mob.$('//p[contains(text(),"' + size + '")]'),
    valuesOnMediaCoC = text => mob.$('//ion-label[contains(text(),"' + text + '")]'),
    uploadedBy = text => mob.$('//ion-label//*[contains(text(),"' + text + '")]')

export default class MediaPage extends BasePage {
    constructor () {
        super();

        if (S.isAndroid()) {
           // el = require('./elementSelectors/android/media-selectors');
        } else {
            el = require('./elementSelectors/iOS/media-selectors');
        }
    }

    clickAddMediaButton () {
        this.waitLoaderToDisappear()
        addMediaButton().click()
        return this;
    }

    uploadImageFromFiles (name) {
        this.waitLoaderToDisappear()
        this.clickButton('Files', true)
        this._________NATIVE_CONTEXT_________()
        el.photoLibraryButton().click()
        el.image(name).click()
        el.addSelectedMediaButton().click()
        this._________WEB_CONTEXT_________()
        successfulUploadIcon().waitForDisplayed({timeout: 50000})
        checkmarkIcon().click()
        return this;
    }

    openMediaDetailsPage () {
        this.waitLoaderToDisappear()
        photo().click()
        return this;
    }

    closeMediaDetailsPage () {
        this.waitLoaderToDisappear()
        xButton().click()
        return this;
    }

    verifyDataOnMediaGrid (size) {
        this.waitLoaderToDisappear()
        photo().waitForDisplayed({timeout: 50000})
        this.verifyElementIsVisible(photo())
        this.verifyText(photoSize(size), size)
        return this;
    }

    verifyDataOnMediaDetailsPage (data) {
        this.waitLoaderToDisappear()
        this.verifyProvidedTextOnMultipleElements([
            [valuesOnMediaCoC(data.active), data.active],
            [valuesOnMediaCoC(data.size), data.size],
            [uploadedBy(data.uploadedBy.name), data.uploadedBy.name],
            [valuesOnMediaCoC(data.description), data.description],
            [valuesOnMediaCoC(data.category), data.category],
            [valuesOnMediaCoC(data.primaryCase), data.primaryCase],
            [valuesOnMediaCoC(data.location), data.location],
        ])
        return this;
    }

}
