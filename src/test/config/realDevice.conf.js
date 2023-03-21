const { config } = require('./shared.conf');
const spec = require('../specs/specs');
const caps = require('./caps');

exports.config = {
    ...config,
    ...{

        specs: spec.Androidspecs,
        capabilities: caps.RealDevice,
        baseUrl: 'http://localhost',
        services: ['selenium-standalone', ['appium', {
            command: 'appium',
            args: {
                debugLogSpacing: true,
                sessionOverride: true,
                port: 4729,
            },
        }],
        ]
    }
};
