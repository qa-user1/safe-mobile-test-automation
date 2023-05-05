import caps from '../configuration/caps'
export const CONTEXT_REF = {
    NATIVE: 'native',
    WEBVIEW: 'webview',
};
const DOCUMENT_READY_STATE = {
    COMPLETE: 'complete',
    INTERACTIVE: 'interactive',
    LOADING: 'loading',
};

class WebView {
    /**
     * Wait for the webview context to be loaded
     */
    waitForWebViewContextLoaded () {
        driver.waitUntil(
            () => {
                const currentContexts = this.getCurrentContextsIos();

                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.WEBVIEW)) !== 'undefined';
            }, {
                // Wait a max of 45 seconds. Reason for this high amount is that loading
                // a webview for iOS might take longer
                timeout: 45000,
                timeoutMsg: 'Webview context not loaded',
                interval: 100,
            },
        );
    }

    /**
     * Switch to native or webview context
     * @parm {string} context
     * iOS & Android
     */
    switchToContext_iOS (context) {
        mob.switchContext(this.getCurrentContextsIos()[context === CONTEXT_REF.NATIVE ? 0 : 1]);
    }

    switchToContext_Android (context) {
        mob.switchContext(this.getCurrentContextsAndroid()[context === CONTEXT_REF.NATIVE ? 0 : 1]);
    }

    switchToContext (context) {
        mob.switchContext(this.getCurrentContexts()[context === CONTEXT_REF.NATIVE ? 0 : 1]);
    }

    /**
     * @return {object}
     * Returns an object with the list of all available contexts for iOS & Android
     */
    getCurrentContextsIos () {
        return mob.getContexts();
    }
    getCurrentContextsAndroid () {
        return mob.getContexts();
    }
    getCurrentContexts () {
        return mob.getContexts();
    }
    /**
     * Wait for the document to be fully loaded
     */
    waitForDocumentFullyLoaded () {
        driver.waitUntil(
            // A webpage can have multiple states, the ready state is the one we need to have.

            () => browser.execute(() => document.readyState) === DOCUMENT_READY_STATE.COMPLETE,
            {
                timeout: 15000,
                timeoutMsg: 'Website not loaded',
                interval: 100,
            },
        );
    }

    /**
     * Wait for the website in the webview to be loaded
     */
    waitForWebsiteLoaded () {
        this.waitForWebViewContextLoaded();
        this.switchToContext(CONTEXT_REF.WEBVIEW);
        this.waitForDocumentFullyLoaded();
        this.switchToContext(CONTEXT_REF.NATIVE);
    }
}

export default WebView;

