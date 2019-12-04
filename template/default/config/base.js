// configuration
exports.config = {

    // sources
    specs: [
        "./test/**/*.js"
    ],
    exclude: [],

    // services
    services: [],

    // share capabilities
    commonCapabilities: {
        maxInstances: 1
    },

    // test configuration
    logLevel: "error",
    deprecationWarnings: true,
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    breakpoints: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1200,
        xl: 1980
    },

    // test runner
    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        require: [
            "tsconfig-paths/register"
        ],
        timeout: process.env.DEBUG ? 99999999 : 30000
    },

    // reporter
    reporters: [
        "spec"
    ],

    // lifecycle hooks
    before: function (capabilities, specs) {
        require("ts-node").register({files: true});
        require("@nascentdigital/e2e-wdio").NascentExtensions.register();
    },
    afterTest: function (test) {
        if (test.error !== undefined) {
            browser.takeScreenshot();
        }
    }
};
