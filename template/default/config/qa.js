// imports
const packageJson = require("../package");
const merge = require("deepmerge");
const baseConfig = require("./base").config;


// configuration
exports.config = merge(baseConfig, {

    // browserstack configuration
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    updateJob: false,

    // share capabilities
    commonCapabilities: {
        project: "Nascent Website",
        build: `Build ${packageJson.version}`,
        "browserstack.local": false,
        "browserstack.debug": true,
        "browserstack.video": true
    },

    // browser-specific capabilities
    capabilities: [
        {
            browserName: "chrome",
            browser: "Chrome",
            browser_version: "78.0",
            os: "Windows",
            os_version: "10",
            resolution: "1920x1080"
        },
        {
            browserName: "edge",
            browser: "Edge",
            browser_version: "18.0",
            os: "Windows",
            os_version: "10",
            resolution: "1920x1080"
        },
        {
            browserName: "iPhone",
            device : "iPhone 8 Plus",
            os_version : "11",
            real_mobile : "true",
            "browserstack.appium_version" : "1.14.0"
        },
        {
            browserName: "Android",
            device : "Google Pixel 3",
            os_version : "9.0",
            real_mobile : "true",
            "browserstack.appium_version" : "1.15.0"
        },
    ],

    // test configuration
    baseUrl: "https://qa.nascentdigital.com",
});

// merge in common capabilities
exports.config.capabilities.forEach((capabilities) => Object.assign(capabilities, exports.config.commonCapabilities));
