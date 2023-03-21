import BasePage from '../pages/basePage';
import S from '../utils/settings';
import C from '../utils/constants';
import D from '../utils/data';
import helper from '../utils/helper';
import { assert } from 'chai';

let el,
    editTask = e => mob.$('//page-task-view//button[@color="primary"]//*[@name="close"]'),
    closeTaskButton = e => mob.$('//page-task-view//button[@color="danger"]//*[@name="close"]'),
    title = e => mob.$('//*[@formcontrolname="title"]//input'),
    message = e => mob.$('//*[@formcontrolname="message"]//textarea'),
    dueDate = e => mob.$('//*[@formcontrolname="dueDate"]'),
    addLinkedObject = e => mob.$('//button//*[contains(text(),"Add")]'),
    name = e => mob.$('[@formcontrolname="name"]'),
    elByPlaceholder = text => mob.$('//*[@placeholder="'+ text + '"]'),
    elByText = text => mob.$('//*[contains(text(),"'+ text + '")]'),
    statusBadge = text => mob.$('//ion-badge[contains(text(),"'+ text + '")]'),
    taskGridValue = text => mob.$('//div//*[contains(text(),"'+ text + '")]'),
    valueOnTaskDetailsPage = text => mob.$('//page-task-basic//*[contains(text(),"' + text + '")]'),
    removeIcon = e => mob.$$('//div//ion-icon[@name="close"]')[1]




export default class TaskPage extends BasePage {
    constructor () {
        if (S.isAndroid()) {
            el = require('./elementSelectors/android/addCasePage-selectors');
        } else {
            el = require('./elementSelectors/iOS/addCasePage-selectors');
        }
        super();
    }

    searchTask(value) {
            this.waitLoaderToDisappear()
            this.enterValueToInputWithinElementWithPlaceholder(C.placeholders.tasksPage.search, value)
            return this;
        }

    clickEditButton() {
        this.waitLoaderToDisappear();
        this.pause(0.7)
        editTask().click();
        return this;
    }

    editTitle(value) {
        this.waitLoaderToDisappear()
        this.clearAndEnterValue(title(), value)

        return this;
    }

    editMessage(value) {
        this.waitLoaderToDisappear()
        this.clearAndEnterValue(message(), value)
        return this;
    }

    clickRemoveButton () {
        removeIcon().waitForDisplayed();
        removeIcon().waitForEnabled();
        removeIcon().waitForClickable();
        removeIcon().click();
        return this;
    }

    clearUsersAndGroupsField() {
        this.clickRemoveButton()
        this.clickRemoveButton()
          return this;
    }

    addUser(object){
        this.waitLoaderToDisappear()
        this.selectUser(object)
        return this;
    }

    addGroup(object){
        this.waitLoaderToDisappear()
        this.selectUserGroup(object)

        return this;
    }

    editAllValues(object){
        this.editTitle(object.title)
        this.editMessage(object.message)
        if(object.user) this.selectUser(object.user)
        if(object.group) this.selectUserGroup(object.group)

        return this;
    }


    openTaskDetailsPage(taskInfo) {
        this.searchTask(taskInfo.title);
        taskGridValue(taskInfo.title).waitForDisplayed();
        taskGridValue(taskInfo.title).click();
        return this;
    }

    verifyValuesOnTaskGrid (taskInfo) {
        this.verifyText(taskGridValue(taskInfo.title), 'Title: ' + taskInfo.title);
        this.verifyText(statusBadge(taskInfo.statusOnTheGrid), taskInfo.statusOnTheGrid);
        return this;
    }


        verifyAllValues (taskInfo) {
        this.verifyProvidedTextOnMultipleElements(
            [
                [valueOnTaskDetailsPage(taskInfo.title), taskInfo.title],
                [valueOnTaskDetailsPage(taskInfo.status), taskInfo.status],
                [valueOnTaskDetailsPage(taskInfo.createdBy), taskInfo.createdBy],
                [valueOnTaskDetailsPage(taskInfo.message), taskInfo.message],
                [valueOnTaskDetailsPage(taskInfo.user), taskInfo.user],
                [valueOnTaskDetailsPage(taskInfo.group), taskInfo.group],
               ],
        );
        return this;
    }
}
