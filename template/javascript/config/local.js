// imports
const merge = require("deepmerge");
const baseConfig = require("./base").config;


// configuration
exports.config = merge(baseConfig, {

    // services
    services: ["selenium-standalone"],

    // selenium
    runner: "local",

    // browser-specific capabilities
    capabilities: [{
        maxInstances: 1,
        browserName: "chrome"
    }],

    // test configuration
    baseUrl: "https://qa.nascentdigital.com",
});

// merge in common capabilities
exports.config.capabilities.forEach((capabilities) => Object.assign(capabilities, exports.config.commonCapabilities));
