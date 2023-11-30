const S = require('../utils/settings.js');
const config = require('./shared.conf');
const caps = require('./caps');
const c = require('../utils/commands');

S.domain = 'PENTEST';
S.orgNum = 1;
S.debuggingMode = false;
S.currentPlatform = {
  //  mob: caps.iOS,
      mob: caps.android,
};

const specs = [
    './specs/example.e2e.js'

];
exports.config = {
    ...config,
    ...{
        specs: specs,
        capabilities: S.currentPlatform,
        before: async function (capabilities, specs) {

            console.log('Current CAPS __________' + JSON.stringify(capabilities));
            console.log('CURRENT PLATFORM ' + capabilities.mob.capabilities.platformName)

            S.setEnvironmentProperties(S.orgNum);
            const ui = require('../pages/ui-spec');
            await ui.app._________WEB_CONTEXT_________();

            // if (S.isDebuggingMode() === false) {
            //     ui.login.createDomain();
            // }

            console.log('Selected environment: ' + JSON.stringify(S.selectedEnvironment));
        },
        baseUrl: 'http://localhost',
        services: [['appium', {
            command: 'appium',
            args: {
                debugLogSpacing: true,
                sessionOverride: true,
                port: 4727,
                // address: 'localhost'
                allowInsecure: 'chromedriver_autodownload',
            },
        }],
        ],
    },
};





