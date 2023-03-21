import WebView from './WebView';
import caps from '../config/caps'
const SELECTORS = {
    WEB_VIEW_SCREEN: caps.android.isAndroid
        ? '*//android.webkit.WebView'
        : '*//XCUIElementTypeWebView',
};

class WebViewScreen extends WebView {
    waitForWebViewIsShownByXPath (isShown = true) {
        iOS.waitForDisplayed(SELECTORS.WEB_VIEW_SCREEN, 20000, !isShown)
    }
}
export default new WebViewScreen()
