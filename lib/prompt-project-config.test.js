"use strict";

// imports
const test = require("ava");
const promptProjectConfig = require("./prompt-project-config");

// define test scenarios
const opts = {
    name: "my-tests-yarn-ts",
    author: "nascentdigital",
    description: "this is a auto-generated test module. please ignore.",
    repo: "nascentdigital/my-tests-yarn-ts",
    license: "GPL",
    manager: "yarn",
    template: "typescript",
    git: true
};


// execute tests
test("passed options are returned when skipPrompts is true", async t => {

    // load configuration
    const result = await promptProjectConfig(Object.assign({}, opts, {skipPrompts: true}));

    // verify the expected with the result
    Object.entries(opts).forEach(opt => {
        t.is(opt[1], result[opt[0]]);
    });
});
