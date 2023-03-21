exports.config = {
    exclude: [
    ],
    maxInstances: 1,
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 50000,
    connectionRetryTimeout: 50000,
    connectionRetryCount: 0,
    framework: 'mocha',
    specFileRetries: 0,
    specFileRetriesDelay: 10,

    reporters: ['spec', ['allure', {
        outputDir: 'report/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
    }]],

    mochaOpts: {
        ui: 'bdd',
        timeout: 9000000,
        retries: 0,
        require: ['@babel/register'],

    },

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (error !== undefined) {
            browser.takeScreenshot();
        }
    }
};
