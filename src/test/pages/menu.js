import BasePage from './basePage';
import { assert } from 'chai';
import S from '../utils/settings';
import C from '../utils/constants';

let el,
    menuButton = e => mob.$('//*[@aria-label="menu"]/ancestor::button'),
    tasks = e => mob.$('//ion-menu//ion-list/button[6]'),
    tasksList = e => mob.$('//page-tasks-list')

export default class MenuPage extends BasePage {
    constructor () {
        super();

        if (S.isAndroid()) {
            el = require('./elementSelectors/android/menu-selectors');
        } else {
            el = require('./elementSelectors/iOS/menu-selectors');
        }
    }

    clickBurgerIcon () {
        this.waitLoaderToDisappear()
        this.pause(0.9)
        mob.$('//*[@aria-label="menu"]/ancestor::button').waitForDisplayed();
        mob.$('//*[@aria-label="menu"]/ancestor::button').waitForEnabled();
        mob.$('//*[@aria-label="menu"]/ancestor::button').click();
        return this;
    }

    navigateTo (text) {
        this.waitLoaderToDisappear()
        this.clickBurgerIcon()
        this.waitLoaderToDisappear()
        this._________NATIVE_CONTEXT_________()
        el.pagesUnderMenu(text).waitForDisplayed({timeout: 50000});
        el.pagesUnderMenu(text).waitForEnabled({timeout: 50000});
        el.pagesUnderMenu(text).click();
        this._________WEB_CONTEXT_________()
        return this;
    }

    navigateToTasks () {
        this.waitLoaderToDisappear()
        this.clickBurgerIcon();
        tasks().waitForDisplayed({timeout: 30000});
        this.pause(0.5)
        tasks().click();
        this.waitLoaderToDisappear()
        tasksList().waitForDisplayed({timeout: 30000});
        tasksList().click();
        this.pause(0.5)
        return this;
    }

    clickBackIconIfVisible () {
        this._________NATIVE_CONTEXT_________()
        this.clickElementIfVisible(el.backarrow())
    }

    clickLogout (text) {
        this.clickBackIconIfVisible()
        this.clickBurgerIcon();
        this.click(text, false, false);
        return this;
    }
////////////////////////////////////////////////////////////////////

    verifyThatCorrectUsernameIsDisplayed (username) {
        el.Username(username).waitForDisplayed();
        assert.strictEqual(el.Username(username).getText(), username);
        return this;
    }
}
