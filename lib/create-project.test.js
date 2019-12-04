"use strict";

// imports
const test = require("ava");
const execa = require("execa");
const path = require("path");
const rmfr = require("rmfr");
const createProject = require("./create-project");

// define test scenarios
const tests = [
    {
        name: "my-tests-yarn-js",
        author: "nascentdigital",
        description: "this is a auto-generated test module. please ignore.",
        repo: "nascentdigital/my-tests-yarn-js",
        license: "MIT",
        manager: "yarn",
        template: "default",
        git: true,
        quiet: true
    },
    {
        name: "my-tests-yarn-ts",
        author: "nascentdigital",
        description: "this is a auto-generated test module. please ignore.",
        repo: "nascentdigital/my-tests-yarn-ts",
        license: "MIT",
        manager: "yarn",
        template: "typescript",
        git: true,
        quiet: true
    },
    {
        name: "my-tests-npm-js",
        author: "nascentdigital",
        description: "this is a auto-generated test module. please ignore.",
        repo: "nascentdigital/my-test-library",
        license: "MIT",
        manager: "npm",
        template: "default",
        git: true,
        quiet: true
    },
    {
        name: "my-tests-npm-ts-scoped",
        author: "nascentdigital",
        description: "this is a auto-generated test module. please ignore.",
        repo: "nascentdigital/my-test-npm-ts-scoped",
        license: "MIT",
        manager: "npm",
        template: "typescript",
        git: true,
        quiet: true
    },
    {
        name: "@nascentdigital/my-tests-yarn-js-scoped",
        author: "nascentdigital",
        description: "this is a auto-generated test module. please ignore.",
        repo: "nascentdigital/my-test-yarn-js-scoped",
        license: "GPL",
        manager: "yarn",
        template: "default",
        git: true,
        quiet: true
    },
    {
        name: "my-tests-no-git",
        author: "nascentdigital",
        description: "this is a auto-generated test module. please ignore.",
        repo: "nascentdigital/no-git-library",
        license: "MIT",
        manager: "yarn",
        template: "default",
        git: false,
        quiet: true
    }
];

// execute tests
tests.forEach((options) => {
    test.serial(`creating "${options.name}" using ${options.manager}`, async (t) => {
        console.log(`creating "${options.name}" using ${options.manager}...`);
        let ret;

        // ensure library is created successfully
        const root = await createProject(options);
        const example = path.join(root, "example");
        t.truthy(root.indexOf(options.shortName) >= 0);

        // ensure deps install successfully in root
        ret = await execa.shell(`${options.manager} install`, {cwd: root});
        t.is(ret.code, 0);

        // ensure root tests pass
        ret = await execa.shell(`${options.manager} test`, {cwd: root});
        t.is(ret.code, 0);

        // ensure deps install successfully in example
        ret = await execa.shell(`${options.manager} install`, {cwd: example});
        t.is(ret.code, 0);

        // ensure bundle builds successfully in example
        ret = await execa.shell(`${options.manager} build`, {cwd: example});
        t.is(ret.code, 0);

        // ensure git is initialized properly
        ret = await execa.shell("git rev-parse --git-dir", {cwd: root});
        t.is(ret.stdout, options.git ? ".git" : path.join(process.cwd(), ".git"));

        // cleanup after test
        await rmfr(root);
    });
});
