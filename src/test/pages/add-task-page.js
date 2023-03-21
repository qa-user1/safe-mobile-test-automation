import BasePage from '../pages/basePage';
import S from '../utils/settings';
import C from '../utils/constants';
import D from '../utils/data';
import helper from '../utils/helper';

let el,
    //addTask = e => mob.$('//page-tasks-list//button//*[@name="add"]'),
    addTask = e => mob.$('//page-tasks-list//button[@color="primary"]//*[@name="close"]'),
    title = e => mob.$('//*[@formcontrolname="title"]//textarea'),
    message = e => mob.$('//*[@formcontrolname="message"]//textarea'),
    dueDate = e => mob.$('//*[@formcontrolname="dueDate"]'),
    addLinkedObject = e => mob.$('//button//*[contains(text(),"Add")]'),
    name = e => mob.$('//*[@formcontrolname="name"]//input'),
    elByPlaceholder = text => mob.$('//*[@placeholder="'+ text + '"]')




export default class AddTaskPage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/addCasePage-selectors');
        } else {
            el = require('./elementSelectors/iOS/addCasePage-selectors');
        }
        super();
    }


    clickAddButton () {
        this.waitLoaderToDisappear()
        addTask().waitForDisplayed({timeout: 30000});
        this.pause(0.5)
        addTask().click();
        return this;
    }

    enterSpaceToTitleAndMessageFields () {
        this.pressSpace(title());
        this.pressSpace(message());
        return this;
    }


    enterTitle (object) {
        this.waitLoaderToDisappear()
        this.clearAndEnterValue(title(), object.title)
        return this;
    }

    enterMessage (object) {
        this.waitLoaderToDisappear()
        this.clearAndEnterValue(message(), object.message)
        return this;
    }

    enterDueDate () {
        this.waitLoaderToDisappear()
        dueDate().waitForDisplayed();
        dueDate().waitForEnabled();
        dueDate().click();
        this.clickButton(C.buttons.done)
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    populateAllFields (object) {
        this.waitLoaderToDisappear();
        this.enterTitle(object);
        this.enterMessage(object);
        if(object.user) this.selectUser(object.user);
        if(object.group) this.selectUserGroup(object.group)
        return this;
    }


    }
