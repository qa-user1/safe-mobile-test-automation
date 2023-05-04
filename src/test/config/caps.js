const caps = exports;
const path = require('path');

caps.RealDevice =
[{
    platformName: 'isMobile',
    'appium:platformName': 'android',
    'appium:deviceName': 'SM_N975F',
    'appium:udid': 'RF8M82EDL8Y',
    'appium:app': 'src/test/resources/SAFE.apk',
    'appium:platformVersion': '10',
    'appium:uiautomator2ServerInstallTimeout': 120000,
    'appium:appWaitForLaunch': true,
    'appium:ensureWebviewsHavePages': true,
    'appium:disableWindowAnimation': true,
    'appium:autoGrantPermissions': true,
    'appium:clearSystemFiles': true,
    'appium:nativeWebScreenshot': true,
    chromedriverExecutable: 'src/test/resources/chromedriver'
}];

caps.android = {
    port: 4728,
    path: '/',
    capabilities: {
        platformName: 'android',
        'appium:automationName': 'UiAutomator2',
        'appium:avd': 'nexus',
        'appium:app': 'src/test/resources/v104.006.apk',
        'appium:platformVersion': '11',
        'appium:avdLaunchTimeout': 500000,
        'appium:avdReadyTimeout': 500000,
        'appium:uiautomator2ServerInstallTimeout': 500000,
        'appium:appWaitForLaunch': true,
        'appium:ensureWebviewsHavePages': true,
        'appium:disableWindowAnimation': true,
        'appium:autoGrantPermissions': true,
        'appium:clearSystemFiles': true,
        'appium:nativeWebScreenshot': true,
      //  'appium:noReset': true,
        'appium:reset': true,
        'appium:fullReset': false,
       // 'appium:reLaunch': false,
        'appium:reLaunch': true
    }
}

// caps.android =
//     {
//         port: 4728,
//         path: '/',
//         capabilities: {
//             platformName: 'android',
//             'appium:automationName': 'UiAutomator2',
//             'appium:avd': 'Pentest',
//             'appium:app': 'src/test/resources/v103.007.apk',
//           //  'appium:appPackage': 'com.trackerproducts.mobile',
//           //  'appium:appActivity': 'com.trackerproducts.mobile.MainActivity',
//             'appium:avdLaunchTimeout':50000,
//             'appium:avdReadyTimeout': 50000,
//             'appium:uiautomator2ServerInstallTimeout' :50000,
//             'appium:appWaitForLaunch': true,
//             'appium:ensureWebviewsHavePages': true,
//             'appium:disableWindowAnimation': true,
//             'appium:autoGrantPermissions': true,
//             'appium:clearSystemFiles': true,
//             'appium:noReset': true,
//             'appium:fullReset': false,
//             'appium:reLaunch': false,
//             'appium:agent':({ keepAlive: true }),
//             'appium:nativeWebScreenshot': true,
//         }
//     };

caps.iOS =

    {
        port: 4729,
        path: '/',
        capabilities: {
            'goog:chromeOptions': {
                 args: ['--disable-features=VizDisplayCompositor?', '--disable-gpu'],
            },
            platformName: 'iOS',
            'appium:deviceName': 'iPhone 8',
            // eslint-disable-next-line no-undef
            'appium:app': path.resolve(__dirname, '../resources/v104.006.zip'),
           // 'appium:udid': 'auto',
           // 'appium:xcodeSigningId': 'iPhone Developer',
            'appium:automationName': 'XCUITest',
            'appium:platformVersion': '14.4',
            // 'appium:wdaStartupRetries': '4',
            // 'appium:iosInstallPause': '8000',
            // 'appium:wdaStartupRetryInterval': '20000',
            'appium:USE_PREBUILT_WDA': false,
            'appium:avdLaunchTimeout': 200000,
            'appium:reset': true,
            'appium:reLaunch': true,
            'appium:showIOSLog': true,
            'appium:showXcodeLog': true,
            'appium:fullReset': false,
            'appium:agent': ({keepAlive: true}),
            'appium:avdReadyTimeout': 200000,
            'appium:ensureWebviewsHavePages': true,
            'appium:WebView.setWebContentsDebuggingEnabled': true,
            "appium:simulatorStartupTimeout": 200000
        }
    }

module.exports = caps;
