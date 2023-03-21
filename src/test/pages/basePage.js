import { CONTEXT_REF } from '../utils/WebView.js';
import WebViewScreen from '../utils/webviewScreen';
import S from '../utils/settings';
import { assert } from 'chai';
import { expect } from 'chai';
import C from '../utils/constants';
const path = require ('path')


import waitUntil from 'webdriverio/build/commands/browser/waitUntil';

let loadingMessage = e => mob.$('//div[@class=\'loading-wrapper\']//div[text()=\'Please wait...\']'),
    tagField = e => mob.$('//*[@formcontrolname="tags"]//input'),
    categoryDropdown = e => mob.$('//*[@formcontrolname="categoryId"]'),
    custodyReason = e => mob.$('//*[@formcontrolname="custodyReasonId"]'),
    caseOfficers = e => mob.$('//*[@formcontrolname="caseOfficers"]//input'),
    locationSearchInput = e => mob.$('//*[@placeholder="Search"]'),
    firstLocationOnTypeahead = placeholder => mob.$('//places-autocomplete//ion-item[1]'),
    elementByPlaceholder = placeholder => mob.$('//*[@placeholder="' + placeholder + '"]'),
    elementByPartialTextWeb = (text) => mob.$('ion-col*=' + text),
    buttonByPartialTextWeb = (text) => mob.$('//*[contains(text(),"' + text + '")]/ancestor::button'),
    elmByPartialTextWeb = (text) => mob.$('//*[contains(text(),"' + text + '")]'),
    elementByTextWebContext = (text) => mob.$('//*[text()=\'' + text + '\']'),
    elementByAttribute = (text) => mob.$('//*[@formcontrolname="' + text + '"]'),
    inputInElementByAttribute = (text) => mob.$('//*[@formcontrolname="' + text + '"]//input'),
    inputInElementByPlaceholder = placeholder => mob.$('//*[@placeholder="' + placeholder + '"]/input'),
    firstDropdown = (e) => mob.$('//ion-select'),
    firstOptionOnTagsDropdown = e => mob.$('//tag-select//ion-list/button[1]'),
    firstOptionOnUserTypeahead = e => mob.$('//user-multi-type-ahead//ion-list//button[1]'),
    firstOptionOnUserSingleTypeahead = e => mob.$('//user-type-ahead//ion-list//button[1]'),
    firstOptionOnPersonTypeahead = e => mob.$('//person-type-ahead//ion-list/button[1]'),
   // firstOptionOnTypeahead = e => mob.$('//ion-list/button[1]'),
    firstOptionOnTypeahead = (text) => mob.$('//ion-label[contains(text(), "'+ text +'")'),
    firstOptionOnPersonMultiSelectField = e => mob.$('//all-people-select//ion-list/button[1]'),
    cancelButton = e => mob.$('//*[@class="picker-toolbar-button picker-toolbar-cancel"]//button'),
  //  doneButton = e => mob.$('//*[@class="picker-toolbar-button"]//button'),
    startButton = e => mob.$('//*[@class="grid"]//button[@color="primary"]'),
    menuButton = e => mob.$('//*[@aria-label="menu"]/ancestor::button'),
    backButton = index => mob.$$('//*[@ion-button="bar-button"]')[index],
    tab = text => mob.$('//span[text()="'+ text + '"]'),
    title = (text) => mob.$('//ion-title//*[text()="' + text + '"]'),
    badge = (text) => mob.$('//ion-badge[contains(text(),"' + text + '")]'),
    searchBarInput = text => mob.$('//*[@class="searchbar-input-container"]'),
    removeIcon = index => mob.$$('//div//ion-icon[@name="close"]')[index],
    action = text => mob.$('//button//*[text()=\'' + text + '\']'),
    alertTitle = e => mob.$('//*[@class="alert-title"]'),
    alertMessage = e => mob.$('//*[@class="alert-message"]'),
    selectedCheckbox = e => mob.$('//*[@class="checkbox-icon checkbox-checked"]'),
    itemNo = text => mob.$('//ion-label[contains(text(),"'+ text + '")]'),

    ////////////////// Custom Form selectors //////////////////
    addCustomFormButton = e => mob.$('//custom-forms//button//*[@name="close"]'),
    searchCustomDataInput = e => mob.$('//*[@placeholder="Search"]'),
    firstOptionOnFormDropdown = e => mob.$('//page-add-form-modal//ion-content//ion-list/button[1]'),
    saveCustomFormIcon = e => mob.$('//custom-forms//ion-header//ion-navbar//ion-buttons//button[2]'),
    arrowDropdown = e => mob.$('//*[@name="arrow-dropdown-circle"]'),
    arrow = e => mob.$('//ion-list-header//ion-label'),
    arrowPeopleCF = e => mob.$$('//ion-list-header//ion-label')[1],
    customFormName = e => mob.$('//ion-list-header//div//ion-label'),
    textboxCustomField = e => mob.$('//ion-input//*[@type="string"]'),
    textareaCustomField = e => mob.$('//forms-display//textarea'),
    passwordCustomField = e => mob.$('//*[@type="password"]//input'),
    emailCustomField = e => mob.$('//*[@type="email"]//input'),
    numberCustomField = e => mob.$('//*[@type="number"]//input'),
    checkboxCustomField = e => mob.$('//*[@class="checkbox-icon"]'),
    selectedCheckboxCustomField = e => mob.$('//*[@aria-checked="true"]'),
    checkboxSelectedOption = text => mob.$('//ion-select//*[contains(text(),"'+ text + '")]'),
    radiobuttonSelectedOption = text => mob.$('//ion-select//*[contains(text(),"' + text + '")]'),
    selectListSelectedOption = text => mob.$('//ion-select//*[contains(text(),"' + text + '")]'),
    checkboxOption = text => mob.$('//*[@class="alert-checkbox-label"][contains(text(),"' + text + '")]'),
    radioOption = text => mob.$('//*[@class="alert-radio-label"][contains(text(),"' + text + '")]'),
    firstOptionOnDropdownTypeahead = e => mob.$('//form-options-type-ahead//ion-list/button[1]'),
    firstOptionOnCustomUserTypeahead = e => mob.$('//user-multi-type-ahead//ion-list//button[1]'),
    userUserGroupField = e => mob.$('//forms-display//*[@placeholder="Users or groups..."]'),
    U_UGContainer = e => mob.$('//user-multi-type-ahead//*[@class="tags-container"]'),

    tagValue,
    caseValue,
    locationAddressInput,
    mainContainer,
    elementByText,
    elementByPartialTextNative,
    locationInput,
    clearSearchIcon,
    removeTagIcon

export default class BasePage {

    constructor () {
        if (S.isAndroid()) {
            elementByText = (text) => mob.$('android=.text("' + text + '")');
            locationAddressInput = placeholder => mob.$('//*[@placeholder="' + placeholder + '"]/../div');
            elementByPartialTextNative = (text) => mob.$('android=.textContains("' + text + '")');
            mainContainer = () => mob.$('//*[@class="scroll-content"]/ion-grid');
            tagValue = text => mob.$('android=.text("filing ' + text + '")');
            caseValue = text => mob.$('android=.text("archive ' + text + '")');
            locationInput = text => mob.$('//ion-input[@formcontrolname="' + text + '"]');
            clearSearchIcon = e => mob.$('//button[@class="searchbar-clear-icon disable-hover button button-md button-clear button-clear-md"]');
            removeTagIcon = e => mob.$('//*[@class="remove-tag-icon icon icon-md ion-md-close"]');
        } else {
            locationAddressInput = placeholder => mob.$('//*[@placeholder="' + placeholder + '"]');
            loadingMessage = e => mob.$('//div[@class=\'loading-wrapper\']//div[text()=\'Please wait...\']');
            elementByText = text => mob.$('~' + text);
            elementByPartialTextNative = text => mob.$('~' + text);
            mainContainer = () => mob.$('//*[@class="scroll-content"]');
            tagValue = tag => mob.$('~filing ' + tag);
            caseValue = text => mob.$('~archive ' + text);
            locationInput = text => mob.$('//*[@formcontrolname="' + text + '"]//input');
            clearSearchIcon = e => mob.$('//button[@class="searchbar-clear-icon disable-hover button button-ios button-clear button-clear-ios"]');
            removeTagIcon = e => mob.$('//*[@class="remove-tag-icon icon icon-ios ion-ios-close"]');
        }
    }

    log_title (test) {
        S.log('red', '                                                                                                ');
        S.log('red', '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        S.log('red', '               ' + test.test.title);
        S.log('red', '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        S.log('red', '                                                                                                ');

        return this;
    };

    //////////////////////////  GENERAL METHODS //////////////////////////

    pause (seconds) {
        driver.pause(seconds * 1000);
        return this;
    };

    hideKeyboard () {
        if (S.isAndroid()) mob.hideKeyboard();
        return this;
    };

    switchContextTo (context) {
        if (context === 'native') {
            WebViewScreen.switchToContext('native');
        } else {
            WebViewScreen.switchToContext('webview');
        }
    };

   waitForWebViewContextLoaded () {
        driver.waitUntil(
             () => {
                const currentContexts = mob.getContexts();

                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes('WEBVIEW')) !== 'undefined';
            }, {
                // Wait a max of 45 seconds. Reason for this high amount is that loading
                // a webview for iOS might take longer
                timeout: 45000,
                timeoutMsg: 'Webview context not loaded',
                interval: 100,
            },
        );
    }

    _________NATIVE_CONTEXT_________ () {
        mob.switchContext(mob.getContexts()[0]);
        return this;
    }

    _________WEB_CONTEXT_________ () {
        this.waitForWebViewContextLoaded()

        mob.switchContext(mob.getContexts()[1]);
        return this;
    }

    setNativeContextIfNeeded (isNative) {
        if (isNative) {
            this._________NATIVE_CONTEXT_________()
        }
        return this;
    }

    returnToWebContext (isNative) {
        if (isNative) {
            this._________WEB_CONTEXT_________();
        }
        return this;
    }

    cleanUp () {
        this._________WEB_CONTEXT_________();
        driver.refresh();
        this.waitLoaderToDisappear()
        return this;
    }

    returnBackIfNeeded() {
        this.waitLoaderToDisappear()
        if(backButton().isDisplayed() === true){
            backButton().click();
        }
        return this;
    }

    getCoordinates (text){
        this._________NATIVE_CONTEXT_________();
        let location = elementByText(text).getLocation();
        console.log(JSON.stringify(location))
        return this
    }

    swipeUp (from, to) {
        this._________NATIVE_CONTEXT_________();

        let location1 = elementByText(from).getLocation(),
            location2 = elementByText(to).getLocation();

        mob.touchPerform([
            {
                action: 'press',
                options: {y:location2.y, x:location2.x},
            }, {
                action: 'wait',
                options: { ms: 1000 },
            }, {
                action: 'moveTo',
                options: {y:location1.y, x:location1.x},
            }, {
                action: 'release',
            }]);
        driver.pause(1000);

        this._________WEB_CONTEXT_________();

        return this;
    }

    swipeDown (from, to) {
        this._________NATIVE_CONTEXT_________();

        let location1 = elementByText(from).getLocation(),
            location2 = elementByText(to).getLocation();

        mob.touchPerform([
            {
                action: 'press',
                options: {y:location1.y, x:location1.x},
            }, {
                action: 'wait',
                options: { ms: 1000 },
            }, {
                action: 'moveTo',
                options: {y:location2.y, x:location2.x},
            }, {
                action: 'release',
            }]);
        driver.pause(1000);

        this._________WEB_CONTEXT_________();

        return this;
    }

    swipe (fromEl, toEl) {
        this._________NATIVE_CONTEXT_________();

        let location1 = fromEl.getLocation(),
            location2 = toEl.getLocation();

        mob.touchPerform([
            {
                action: 'press',
                options: {x:location1.x, y:location1.y},
            }, {
                action: 'wait',
                options: { ms: 1000 },
            }, {
                action: 'moveTo',
                options: {x:location2.x, y:location2.y},
            }, {
                action: 'release',
            }]);
        driver.pause(1000);

        this._________WEB_CONTEXT_________();

        return this;
    }

    longPress (element) {
        this._________NATIVE_CONTEXT_________();

        let el = element.getLocation()

        mob.touchPerform([
            {
                action: 'press',
                options: {y:el.y, x:el.x},
            }, {
                action: 'wait',
                options: { ms: 1000 },
            }, {
                action: 'release',
            }]);
        driver.pause(1000);

        this._________WEB_CONTEXT_________();

        return this;
    }

    tap (element) {
        this._________NATIVE_CONTEXT_________();

        let el = element.getLocation()

        mob.touchPerform([
            {
                action: 'tap',
                options: {y:el.y, x:el.x},
            }, {
                action: 'release',
            }]);
        driver.pause(1000);

        this._________WEB_CONTEXT_________();

        return this;
    }

    waitElementToDisappear (el) {
        if (el.isDisplayed() === true) {
            el.waitForDisplayed({ reverse: true });
        }
        return this;
    }

    waitElementToBeVisible (el, timeout) {
        el.waitForDisplayed({ timeout: timeout });
        return this;
    }

    waitLoaderToDisappear () {
        this._________WEB_CONTEXT_________();
        loadingMessage().waitForDisplayed({
            reverse: true,
            timeout: 30000,
        });
        return this;
    }
// setValue method sometimes clears the fields sometimes not and because of that the tests occasionally fail,
// so I decided to use this method to get stable tests
    clearValue (el) {
        this.waitLoaderToDisappear();
        el.waitForDisplayed()
        const selectorValue = el.getValue();
        for(let i=0; i< selectorValue.length +1; i++) {
            this.pause(0.2)
            el.setValue('Backspace')
        }
        return this;
    }

    clearAndEnterValue (el, text, isNative = false) {
        this.waitLoaderToDisappear();
        this.clearValue(el, isNative)
        el.waitForDisplayed({ timeout: 30000 })
        el.waitForEnabled({ timeout: 30000 })
        el.setValue(text);
        return this;
    }

    enterValue (el, text) {
        if (text) {
            el.waitForDisplayed({timeout:5000});
            el.waitForEnabled({timeout:5000});
            this.pause(0.2)
            el.setValue(text);
        }
        return this;
    }

    enterValueWithoutClearingField (el, text) {
        if (text) {
            el.waitForDisplayed({timeout:5000});
            el.waitForEnabled();
            el.addValue(text);
        }
        return this;
    }

    pressSpace (el){
        this.waitLoaderToDisappear()
        el.setValue('Space')
    }

    waitAndClick (el, isNative) {
        this.setNativeContextIfNeeded(isNative)
        el.waitForDisplayed({ timeout: 30000 });
        el.waitForEnabled();
        el.click();
        this.returnToWebContext(isNative)
        return this;
    }

    click (text, isNative = false) {
        if (isNative) {
            this._________NATIVE_CONTEXT_________()
            elementByText(text).waitForEnabled();
            elementByText(text).click();
            this._________WEB_CONTEXT_________()
        } else {
            elementByTextWebContext(text).waitForEnabled();
            elementByTextWebContext(text).click();
        }
        return this;
    }

    clickByPartialText (text, isNative = false) {
        this.waitLoaderToDisappear();

        if (isNative) {
            this._________NATIVE_CONTEXT_________()
            elementByPartialTextNative(text).waitForEnabled();
            elementByPartialTextNative(text).click();
            this._________WEB_CONTEXT_________()
        } else {
            elementByPartialTextWeb(text).waitForEnabled();
            elementByPartialTextWeb(text).click();
        }
        return this;
    }

    clickElmByPartialTextWeb (text) {
        this.waitLoaderToDisappear();
        this.scrollToElementIfNeeded(elmByPartialTextWeb(text))
        elmByPartialTextWeb(text).waitForEnabled();
        elmByPartialTextWeb(text).click();

        return this;
    }

    clickButtonByPartialTextWeb (text) {
        this.scrollToElementIfNeeded(buttonByPartialTextWeb(text))
        buttonByPartialTextWeb(text).waitForDisplayed({timeout:5000});
        this.pause(0.2)
        buttonByPartialTextWeb(text).click();
        buttonByPartialTextWeb(text).waitForDisplayed({reverse:true})
        return this;
    }

    clickButton (text, isNative = false) {
        this.waitLoaderToDisappear();
        if (isNative) {
            this._________NATIVE_CONTEXT_________();
            if (S.isAndroid()) text.toUpperCase();
            elementByText(text).waitForEnabled();
            elementByText(text).click();
            this._________WEB_CONTEXT_________();
        } else {
            mob.$('//*[contains(text(),"' + text + '")]/ancestor::button').waitForDisplayed({timeout:5000});
            mob.$('//*[contains(text(),"' + text + '")]/ancestor::button').waitForEnabled({timeout:5000});
            mob.$('//*[contains(text(),"' + text + '")]/ancestor::button').waitForClickable({timeout:5000});
            mob.$('//*[contains(text(),"' + text + '")]/ancestor::button').click();
        }
        return this;
    }

    /*verifyButtonIsEnabled(text, isNative = false) {
        this.waitLoaderToDisappear();
        if (isNative) {
            this._________NATIVE_CONTEXT_________();
            if (S.isAndroid()) text.toUpperCase();
            elementByText(text).isEnabled();
            this._________WEB_CONTEXT_________();
        } else {
            buttonByPartialTextWeb(text).isEnabled();
        }
        return this;
    }*/

    clickElementIfVisible (el) {
        if (el.isDisplayed() === true) {
            el.click();
            browser.pause(500);
        }
        return this;
    }

    clickElementWithPlaceholder (placeholder) {
        this.pause(0.1)
        elementByPlaceholder(placeholder).click();
        return this;
    }

    clickElementByAttribute (attributeText) {
        this.scrollToElementIfNeeded(elementByAttribute(attributeText))
        elementByAttribute(attributeText).waitForDisplayed({timeout:50000})
        elementByAttribute(attributeText).waitForEnabled({timeout:50000})
        elementByAttribute(attributeText).click();
        return this;
    }

    scrollToElementIfNeeded (el) {
        if(!el.isDisplayed()) {
            el.scrollIntoView();
        }
        return this;
    }

    selectTab (text) {
        this.waitLoaderToDisappear();
        tab(text).waitForDisplayed({timeout: 30000});
        tab(text).waitForEnabled({timeout: 30000});
        this.pause(1)
        tab(text).click()
        return this;
    }

    selectAction (text) {
        this.waitLoaderToDisappear();
        action(text).waitForDisplayed({timeout: 50000});
        action(text).waitForEnabled({timeout: 50000});
        this.pause(0.4)
        action(text).click()
        return this;
    }

    selectOptionOnFirstDropdown (option, edit) {
        firstDropdown = (e) => mob.$('//ion-select')
        buttonByPartialTextWeb = (text) => mob.$('//*[contains(text(),"' + text + '")]/ancestor::button')

        this.waitLoaderToDisappear()
        this.pause(0.2)
        mob.$('//ion-select').waitForDisplayed()
        mob.$('//ion-select').waitForEnabled()
        mob.$('//ion-select').waitForClickable()
        mob.$('//ion-select').click()
        this.pause(0.5)

        buttonByPartialTextWeb(option).waitForDisplayed()
        buttonByPartialTextWeb(option).waitForEnabled()
        buttonByPartialTextWeb(option).waitForClickable()
        mob.$('//*[contains(text(),"' + option + '")]/ancestor::button').click()
        if(edit === false){
        buttonByPartialTextWeb(option).waitForDisplayed({reverse: true})
        }
        return this;
    }

    enterValueInElementWithPlaceholder (placeholder, value) {
        this.waitLoaderToDisappear()
        this.enterValue(elementByPlaceholder(placeholder), value);
        return this;
    }

    enterValueToInputWithinElementWithPlaceholder (placeholder, value) {
        this.waitLoaderToDisappear()
        this.scrollToElementIfNeeded(inputInElementByPlaceholder(placeholder))
        this.enterValue(inputInElementByPlaceholder(placeholder), value);
        return this;
    }

    enterProvidedValues(elementValuePairs) {
        let that = this
        elementValuePairs.forEach(function (el) {
            that.pause(0.5)
            if (el[1]) {
                el[0].waitForDisplayed({ timeout: 30000})
                el[0].waitForEnabled({ timeout: 30000})
                el[0].setValue(el[1])
                if(S.isAndroid()){
                    that.hideKeyboard()
                }
            }
            if (el[2]) {
                el[2].waitForClickable();
                that.pause(0.2)
                el[2].click();
                el[2].waitForDisplayed({ reverse: true, timeout: 30000})
            }
        });
        return this;
    };

    enterValueToInputWithinElementByAttribute (attributeText, value, clearField = false) {
        this.waitLoaderToDisappear()
        this.scrollToElementIfNeeded(inputInElementByAttribute(attributeText))
        this.pause(0.2)
        if(clearField){
            this.clearValue(inputInElementByAttribute(attributeText))
        }
        this.enterValue(inputInElementByAttribute(attributeText), value);
        return this;
    }

    waitElementToGetAnyValue (element, text) {
        browser.waitUntil(
            () => (element.getValue()) !== '');
        return this;
    };

    waitElementToBeEmpty (element, timeout) {
        browser.waitUntil(
            () => (element.getValue()) === '', {timeout: timeout});
        return this;
    };

    verifyElementIsVisible (element) {
        assert.strictEqual(element.isDisplayed(), true);
        return this;
    };

    verifyElementIsNotVisible (element) {
        assert.strictEqual(element.isDisplayed(), false);
        return this;
    };

    verifyButtonIsDisabled (text) {
        assert.strictEqual(buttonByPartialTextWeb(text).isEnabled(), false);
        return this;
    };

    verifyElementIsDisabled (el) {
        assert.strictEqual(el.isEnabled(), false);
        return this;
    };

    verifyButtonIsEnabled (text) {
        assert.strictEqual(buttonByPartialTextWeb(text).isEnabled(), true);
        return this;
    };

    verifyValueOnInputField (element, value) {
        assert.strictEqual(element.getValue(), value);
        return this;
    };

    verifyExactText (element, text, isNative = false) {
        this.waitLoaderToDisappear()
        this.setNativeContextIfNeeded(isNative)
        assert.strictEqual(element.getText(), text);
        this.returnToWebContext(isNative);
        return this;
    };

    verifyPartialText (element, text) {
        expect(element.getText()).to.contain(text);
        return this;
    };

    verifyText (element, text, isNative) {
        this.verifyExactText(element, text, isNative);
        return this;
    };

    verifyByText (text) {
        assert.strictEqual(elmByPartialTextWeb(text).getText(), text);
        return this;
    };

    verifyBadgeIsDisplayed(text) {
        this.verifyExactText(badge(text), text.toUpperCase());
        return this;
    };

    verifyStatusOnTheGrid (text) {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        this.verifyExactText(badge(text), text);
        return this;
    };

    verifyAlreadySelectedValueIsNotShownOnTypeahead (placeholder, object) {
        this.waitLoaderToDisappear();
        this.enterValueInElementWithPlaceholder(placeholder, object);
        assert.strictEqual(firstOptionOnDropdownTypeahead().isDisplayed(), false);
        return this;
    }

    verifyTextIsVisibleOnMainContainer (text) {
        this.waitLoaderToDisappear();
        expect(mainContainer().getText()).to.contain(text);
        return this;
    };

    verifyTextIsNotVisibleOnMainContainer (text) {
        this.waitLoaderToDisappear();
        expect(mainContainer().getText()).to.not.contain(text);
        return this;
    };

    verifyElementByText (text) {
        this.waitLoaderToDisappear();
        this.verifyByTextWithinCurrentContext(text);
        return this;
    };

    verifyByTextWithinCurrentContext (text, isNative = false) {
      /*  if (isNative) {
            this._________NATIVE_CONTEXT_________();
            assert.strictEqual(elementByText(text).getText(), text);
            this._________WEB_CONTEXT_________();*/
      //  } else {
            assert.strictEqual(elementByPartialTextWeb(text).getText(), text);
      //  }
        return this;
    };

    verifyTextOnMultipleElements (valuesOrElementValuePairs, isNative = false) {

        let that = this;

        valuesOrElementValuePairs.forEach(function (arrayElement) {
            if (Array.isArray(arrayElement)) {
                if (arrayElement[1]) {
                    that.verifyByTextWithinCurrentContext(arrayElement[0], arrayElement[1], isNative);
                }
            } else {
                if (arrayElement) {
                    that.verifyByTextWithinCurrentContext(arrayElement, isNative);
                }
            }
        });
        return this;
    };

    verifyProvidedValues(elementValuePairs) {
        this.waitLoaderToDisappear()
        let that = this;
        elementValuePairs.forEach(function (el) {
            that.pause(0.2)
            if (el[1] !== null) {
                assert.strictEqual(el[0].getValue(), el[1])
            }
        });
        return this;
    };

    verifyProvidedTextOnMultipleElements(elementValuePairs) {
        let that = this
        this.waitLoaderToDisappear()
        elementValuePairs.forEach(function (el) {
            that.pause(0.2)
            if (el[1] !== null) {
                assert.strictEqual(el[0].getText(), el[1])
            }
        });
        return this;
    };

    verifySpecificPageIsOpen (text) {
        assert.strictEqual(title(text).isDisplayed(), true);
        return this;
    };

    verifyToastMessage (text) {
        this.verifyExactText(elmByPartialTextWeb(text), text)
        mob.$('//*[contains(text(),"' + text + '")]').waitForDisplayed({reverse: true})
        return this;
    };

    verifyCheckboxIsSelected (isChecked) {
        this.waitLoaderToDisappear()
        this.pause(0.3)
        assert.strictEqual(selectedCheckbox().isDisplayed(), isChecked);
        return this;
    }

    verifyMessage (text) {
        this.verifyExactText(elmByPartialTextWeb(text), text)
        return this;
    }

    verifyCaseNumberGuidelines (text) {
        this.verifyPartialText(elmByPartialTextWeb(text), text);
        return this;
    }

    verifyAlertTitle (text) {
        this.verifyText(alertTitle(), text);
        return this;
    }

    verifyAlertMessage (text) {
        this.verifyText(alertMessage(), text);
        return this;
    }


    verifyTextOnWarningModal (object) {
        this.waitLoaderToDisappear()
        this.verifyAlertTitle(object.title)
        this.verifyAlertMessage(object.message)
        return this;
    }


//////////////////////////  CLICK/ENTER/SELECT METHODS RELATED TO SPECIFIC ELEMENT(S) //////////////////////////
    clickStart () {
        if(S.isAndroid()){
            this.hideKeyboard()
        }
        mob.$('//*//button[@color="primary"]').waitForDisplayed()
        mob.$('//*//button[@color="primary"]').waitForEnabled()
        mob.$('//*//button[@color="primary"]').click()
        return this;
    }

    clickBack(index) {
        this.waitLoaderToDisappear()
        this.waitAndClick(backButton(index))
        this.waitLoaderToDisappear()
        return this;
    }

    clickDone () {
        let doneButton = e => mob.$('//*[@class="picker-toolbar-button"]//button')
        doneButton().waitForDisplayed();
        doneButton().waitForEnabled();
        doneButton().click();
        this.waitElementToDisappear(doneButton())
        return this;
    }

    clickMenu () {
        this.waitLoaderToDisappear()
        menuButton().waitForDisplayed();
        menuButton().waitForEnabled();
        menuButton().click();
        this._________NATIVE_CONTEXT_________()
        return this;
    }

    clickSave () {
        this.pause(0.3)
        this.clickButton(C.buttons.save)
        return this;
    }

    clickCancel () {
        this.pause(0.1)
        this.clickButton(C.buttons.cancel)
        return this;
    }

    clickRemoveButton (index) {
        removeIcon(index).waitForDisplayed();
        removeIcon(index).waitForEnabled();
        removeIcon(index).waitForClickable();
        removeIcon(index).click();
        return this;
    }

    addTag (tag) {
        if (S.isAndroid() && tagField().isDisplayed()) {
            this.scrollToElementIfNeeded(tagField());
        }

        if (tag) {
            this.enterValue(tagField(), tag.substr(0, 4));
            this.hideKeyboard();
            this.waitAndClick(firstOptionOnTagsDropdown(tag));

        }
        return this;
    }

    enterAddress (placeholder, fullLocation) {
        this.waitLoaderToDisappear()
        locationAddressInput(placeholder).waitForDisplayed();
        locationAddressInput(placeholder).waitForEnabled();
        locationAddressInput(placeholder).click();
    //    this.waitAndClick(locationAddressInput(placeholder))
        // doesn't work if called like this- as element selector gets referenced before 'waitForDisplayed' and causing stale elm exception

        this.enterValue(locationSearchInput(), fullLocation.substr(0, 8));
        this.waitAndClick(elmByPartialTextWeb(fullLocation))
        return this;
    }

    editAddress (addressType, fullLocation) {
        this.waitLoaderToDisappear()
        locationInput(addressType).waitForDisplayed({timeout:50000});
        locationInput(addressType).waitForEnabled();
        this.pause(0.3)
        locationInput(addressType).click();
        this.pause(1)
        locationSearchInput().addValue('te');
        this.pause(2)
        clearSearchIcon().click()
        this.enterValue(locationSearchInput(), fullLocation.substr(0, 8));
        this.waitAndClick(elmByPartialTextWeb(fullLocation))
        return this;
    }

    selectPersonOnTypehaead () {
        this.pause(0.5)
        firstOptionOnPersonTypeahead().waitForDisplayed()
        firstOptionOnPersonTypeahead().click();
        return this;
    }

    selectUserOnTypehaead () {
        this.waitAndClick(firstOptionOnUserTypeahead());
        return this;
    }

    selectPerson (placeholder, personObject) {
        this.waitLoaderToDisappear()
        this.enterValue(inputInElementByPlaceholder(placeholder), personObject.firstName);
        this.selectPersonOnTypehaead();
        return this;
    }

    selectUser (object) {
        this.waitLoaderToDisappear();
        this.enterValueInElementWithPlaceholder(C.placeholders.usersAndGroups, object);
        if(S.isAndroid()){
            this.hideKeyboard()
        }
        this.pause(0.3)
        this.selectUserOnTypehaead();
        return this;
    }

    selectUser_onlyUserField (object) {
        this.waitLoaderToDisappear();
        this.enterValueInElementWithPlaceholder('Select User', object);
        if(S.isAndroid()){
            this.hideKeyboard()
        }
        this.pause(0.3)
        this.waitAndClick(firstOptionOnUserSingleTypeahead());
        return this;
    }

    selectUserGroup (object, requiredCaseForm) {
        this.waitLoaderToDisappear();
        if (requiredCaseForm){
            this.enterValue(userUserGroupField(), object);}
        else {
            this.enterValueInElementWithPlaceholder(C.placeholders.usersAndGroups, object);}
        if(S.isAndroid()) {
            this.hideKeyboard();}
        this.pause(0.4)
        this.selectUserOnTypehaead();
        return this;
    }


                 ///////////////////////// CASE /////////////////////////

    selectCaseNumber (value) {
        this.pause(0.2)
        this.enterValueToInputWithinElementWithPlaceholder(C.placeholders.caseSearch, value)
        this._________NATIVE_CONTEXT_________()
        caseValue(value).waitForDisplayed({timeout:5000})
        caseValue(value).click()
        this._________WEB_CONTEXT_________()
        return this;
    }

    selectOfficer (userObject) {
        this.waitLoaderToDisappear();
        this.enterValue(caseOfficers(), userObject.firstName);
        if(S.isAndroid()){
            this.hideKeyboard()
        }
        this.selectUserOnTypehaead();
        return this;
    }

    selectOfficerGroup (userObject) {
        this.waitLoaderToDisappear();
        this.enterValue(caseOfficers(), userObject.userGroup);
        this.selectUserOnTypehaead();
        return this;
    }

                 ///////////////////////// ITEM /////////////////////////

    selectItemBelongsTo (placeholder, personObject) {
        this.enterValue(elementByPlaceholder(placeholder), personObject.firstName);
        this.waitAndClick(firstOptionOnPersonMultiSelectField());
        return this;
    }

    selectStorageLocation (value, reducedFields = false) {
       // this.enterValueToInputWithinElementWithPlaceholder(C.placeholders.addItem.storageLocation, value.substr(0, 5));
        this.enterValue(elementByPlaceholder(C.placeholders.addItem.storageLocation), value.substr(0, 5));
        this.hideKeyboard();
        this.clickButtonByPartialTextWeb(value);
        return this;
    }

    selectCategory (option) {
        categoryDropdown().click();
        this.clickButtonByPartialTextWeb(option);
        return this;
    }

    selectCustodyReason (option) {
        this.waitAndClick(custodyReason());
        mob.$('//*[text()="' + option + '"]').waitForDisplayed();
        mob.$('//*[text()="' + option + '"]').waitForEnabled();
        mob.$('//*[text()="' + option + '"]').waitForClickable();
        mob.$('//*[text()="' + option + '"]').click();
       // mob.$('//*[@role="dialog"]').waitForDisplayed({reverse:true});
        return this;
    }

    verifyItemNumberOnAddItemPage (itemNumber) {
        this.waitLoaderToDisappear()
        this.verifyText(itemNo(itemNumber), itemNumber)
        return this;
    }

                ///////////////////////// PERSON /////////////////////////

    addBusinessName(name, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.businessName, name, clearField)
        return this;
    }

    addFirstName (name, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.firstName, name, clearField)
        return this;
    }

    addMiddleName (name, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.middleName, name, clearField)
        return this;
    }

    addLastName (name, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.lastName, name, clearField)
        return this;
    }

    addAlias (alias, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.alias, alias, clearField)
        return this;
    }

    addDriverLicence (licence, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.driverLicence, licence, clearField)
        return this;
    }

    addRace (race) {
        this.clickElementByAttribute(C.personFields.race)
        this.click(race, true)
        return this;
    }

    addGender (gender) {
        this.pause(0.1)
        this.clickElementByAttribute(C.personFields.gender)
        this.click(gender, true)
        return this;
    }

    addMobilePhone (phone, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.mobilePhone, phone, clearField)
        return this;
    }

    addOtherPhone (phone, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.otherPhone, phone, clearField)
        return this;
    }

    addEmail (email, clearField) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.email, email, clearField)
        return this;
    }

    //////////////////////////// PERSON ADDRESS ///////////////////////////////

    selectAddressType (addressType) {
        this.pause(0.3)
        this.clickElementByAttribute(C.personFields.addressType)
        this.click(addressType, true)
        return this;
    }

    addAddress1 (address) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.address1, address)
        return this;
    }

    addAddress2 (address) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.address2, address)
        return this;
    }

    addCity (city) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.city, city)
        return this;
    }

    selectState (state) {
        this.clickElementByAttribute(C.personFields.state)
        this.click(state, true)
        return this;
    }

    addPostalCode (zip) {
        this.enterValueToInputWithinElementByAttribute(C.personFields.postalCode, zip)
        return this;
    }

    populateAddressFields (personObject) {
        if (personObject.addressType) this.selectAddressType(personObject.addressType)
        if (personObject.line1) this.addAddress1(personObject.line1)
        if (personObject.line2) this.addAddress2(personObject.line2)
        if (personObject.city) this.addCity(personObject.city)
        if (personObject.state) this.selectState(personObject.state)
        if (personObject.zip) this.addPostalCode(personObject.zip)

        return this;
    }


     //////////////////////////  CUSTOM FORM SECTION //////////////////////////

    clickAddCustomFormButton () {
        this.waitLoaderToDisappear()
        this.pause(0.8)
        addCustomFormButton().click()
        return this;
    }

    searchForCustomForm(formName) {
        this.waitLoaderToDisappear()
        searchCustomDataInput().waitForDisplayed({timeout:10000})
        searchCustomDataInput().setValue(formName)
        return this;
    }

    selectCustomForm() {
        this.waitLoaderToDisappear()
        firstOptionOnFormDropdown().waitForDisplayed({timeout:20000})
        this.pause(0.5)
        firstOptionOnFormDropdown().click()
        return this;
    }

    addCustomForm(formName) {
        this.waitLoaderToDisappear()
        this.pause(0.5)
        this.clickAddCustomFormButton()
        this.searchForCustomForm(formName)
        this.selectCustomForm()
        return this;
    }

    saveCustomForm() {
        this.waitLoaderToDisappear()
        saveCustomFormIcon().waitForDisplayed({timeout:20000})
        this.pause(1)
        saveCustomFormIcon().click()

        return this;
    }

    populateTextboxtCustomField (object) {
        this.enterValue(textboxCustomField(), object.customTextbox)
        return this;
    }

    populateTextareaCustomField (object) {
        this.enterValue(textareaCustomField(), object.customTextarea)
        return this;
    }

    populateNumberCustomField (object) {
        this.enterValue(numberCustomField(), object.customNumber)
        return this;
    }

    populatePasswordCustomField (object) {
        this.enterValue(passwordCustomField(), object.customPassword)
        return this;
    }

    populateEmailCustomField (object) {
        this.enterValue(emailCustomField(), object.customEmail)
        return this;
    }

    populateUserCustomField (object) {
        this.enterValue(elementByPlaceholder(C.placeholders.customFields.user), object.caseOfficerObject.firstName);
        firstOptionOnCustomUserTypeahead().waitForDisplayed();
        firstOptionOnCustomUserTypeahead().waitForEnabled();
        firstOptionOnCustomUserTypeahead().click()
        return this;
    }

    clearUser_UserGroupField (numberOfAddedValues) {
        removeTagIcon().waitForDisplayed();
        removeTagIcon().waitForEnabled();
        userUserGroupField().scrollIntoView()
        for (let i=0; i<numberOfAddedValues; i++){
            this.pause(0.1)
            removeTagIcon().click()
        }
        return this;
    }

    populatePersonCustomField (object) {
        this.enterValue(inputInElementByPlaceholder(C.placeholders.customFields.person), object.externalOfficer.firstName);
         this.selectPersonOnTypehaead();
        return this;
    }

    selectCheckboxCustomField () {
        checkboxCustomField().waitForDisplayed()
        checkboxCustomField().waitForEnabled()
        checkboxCustomField().click()
        return this;
    }

    selectOptionOnCheckboxList (object) {
        mob.$$('//*[@placeholder="Select an option"]')[0].click()
        this.pause(0.2)
        checkboxOption(object.customCheckboxListOption).waitForDisplayed()
        checkboxOption(object.customCheckboxListOption).waitForEnabled()
        checkboxOption(object.customCheckboxListOption).click()
        this.clickButton('OK')
        mob.$('//*[@class="alert-checkbox-label"][contains(text(),"Option 1")]').waitForDisplayed({reverse: true});
        return this;
    }

    selectOptionOnRadioButtonList (object) {
        mob.$$('//*[@placeholder="Select an option"]')[1].click()
        this.pause(0.2)
        radioOption(object.customRadiobuttonListOption).waitForDisplayed()
        radioOption(object.customRadiobuttonListOption).waitForEnabled()
        radioOption(object.customRadiobuttonListOption).click()
        this.clickButton('OK')
        mob.$('//*[@class="alert-radio-label"][contains(text(),"Option 1")]').waitForDisplayed({reverse: true});
        return this;
    }

    selectOptionOnSelectList (object) {
        mob.$$('//*[@placeholder="Select an option"]')[2].click()
        this.pause(0.2)
        radioOption(object.customSelectListOption).waitForDisplayed()
        radioOption(object.customSelectListOption).waitForEnabled()
        radioOption(object.customSelectListOption).click()
        this.clickButton('OK')
        mob.$('//*[@class="alert-radio-label"][contains(text(),"Option 1")]').waitForDisplayed({reverse: true});
        return this;
    }

    selectOptionOnDropdownTypeahead (object) {
        this.enterValue(inputInElementByPlaceholder(C.placeholders.customFields.dropdownTypeahead), object.customDropdownTypeahead);
        firstOptionOnDropdownTypeahead().waitForDisplayed();
        firstOptionOnDropdownTypeahead().waitForEnabled();
        firstOptionOnDropdownTypeahead().click();
        return this;
    }

    populateCustomDateField () {
        elementByPlaceholder(C.placeholders.customFields.date).waitForDisplayed({timeout: 30000})
        elementByPlaceholder(C.placeholders.customFields.date).waitForEnabled({timeout: 30000})
        elementByPlaceholder(C.placeholders.customFields.date).click()
        this.pause(0.2)
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed();
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForEnabled();
        mob.$('//*[@class="picker-toolbar-button"]//button').click();
        mob.$('//*[@class="picker-toolbar-button"]//button').waitForDisplayed({reverse: true});
        return this;
    }

    expandCustomForm () {
        this.waitLoaderToDisappear()
        arrow().waitForDisplayed();
        arrow().waitForEnabled();
        this.pause(0.4)
        arrow().click();
        return this;
}

    expandPeopleCustomForm () {
        this.pause(0.2)
        this.waitLoaderToDisappear()
        arrowPeopleCF().waitForDisplayed();
        arrowPeopleCF().waitForEnabled();
        arrowPeopleCF().click();
        return this;
    }

    populateAllCustomFields (object) {
        this.enterProvidedValues([
            [numberCustomField(), object.customNumber],
            [textboxCustomField(), object.customTextbox],
            [emailCustomField(), object.customEmail],
            [passwordCustomField(), object.customPassword],
            [textareaCustomField(), object.customTextarea],
            [userUserGroupField(), object.customUser.firstName, firstOptionOnCustomUserTypeahead()],
            [inputInElementByPlaceholder(C.placeholders.customFields.dropdownTypeahead), object.customDropdownTypeahead, firstOptionOnDropdownTypeahead()],
            [inputInElementByPlaceholder(C.placeholders.customFields.person), object.customPerson.firstName, firstOptionOnPersonTypeahead()],
        ]);
        this.selectCheckboxCustomField();
        this.selectOptionOnCheckboxList(object)
        this.selectOptionOnRadioButtonList(object)
        this.selectOptionOnSelectList(object)
        this.populateCustomDateField()
        return this;
    }

    verifyAllCustomValues (object) {
        this.verifyProvidedValues([
            [textboxCustomField(), object.customTextbox],
            [emailCustomField(), object.customEmail],
            [numberCustomField(), object.customNumber],
            [passwordCustomField(), object.customPassword],
            [textareaCustomField(), object.customTextarea],
            [inputInElementByPlaceholder(C.placeholders.customFields.dropdownTypeahead), object.customDropdownTypeahead],
            [inputInElementByPlaceholder(C.placeholders.customFields.person), object.customPerson.name]
        ]);

        this.verifyProvidedTextOnMultipleElements([
            [checkboxSelectedOption(object.customCheckboxListOption), object.customCheckboxListOption],
            [radiobuttonSelectedOption(object.customRadiobuttonListOption), object.customRadiobuttonListOption],
            [selectListSelectedOption(object.customSelectListOption), object.customSelectListOption],
        ]);
        assert.strictEqual(U_UGContainer().getText(), object.customUser.name)

        assert.ok(elementByPlaceholder(C.placeholders.customFields.date).getText(), object.customDate);
        return this;
    }

    verifyValuesInUser_UserGroupField (object) {
        this.expandCustomForm()
        this.pause(0.5)
            assert.strictEqual(U_UGContainer().getText(), object.customUser.name)
        return this;
    }

    verifyAllCustomValuesOnHistoryPage (object) {
        this.verifyProvidedValues([
            [textboxCustomField(), object.customTextbox],
            [emailCustomField(), object.customEmail],
            [numberCustomField(), object.customNumber],
            [passwordCustomField(), object.customPassword],
            [textareaCustomField(), object.customTextarea],
            [inputInElementByPlaceholder(C.placeholders.customFields.dropdownTypeahead), object.customDropdownTypeahead],
            [inputInElementByPlaceholder(C.placeholders.customFields.person), object.customPerson.name]
        ]);
        // need to update
       // this.pause(0.5)
      //  assert.strictEqual(elementByPlaceholder(C.placeholders.customFields.user).getText(), object.customUser.name)
        return this;
    }

    verifyAllCustomFieldsAreDisabledOnHistoryScreen () {
       this.expandCustomForm()
        for(let i=0; i<13; i++) {
        assert.strictEqual(mob.$$('//*[@disabled]')[i].isDisplayed, true)
        }
        return this;
    }

    verifyCustomFormIsDisplayed () {
        assert.strictEqual(customFormName().isDisplayed(), true);
        return this;
    };



    ////////////////////////////////////
    uploadFileToEmulator () {
        const filePath = path.join(__dirname, '../utils/' + 'image.png')

        mob.pushFile(filePath, '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')

        return this;
    }

}
