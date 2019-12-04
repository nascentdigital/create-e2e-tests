#!/usr/bin/env node
"use strict";

// imports
const chalk = require("chalk");
const program = require("commander");
const {version} = require("../package");
const getDefaultProjectConfig = require("./get-default-project-config");
const createProject = require("./create-project");
const promptProjectConfig = require("./prompt-project-config");


// cli definition
module.exports = async () => {

    // load defaults
    const defaults = await getDefaultProjectConfig();

    // define cli
    program
        .name("create-e2e-tests")
        .version(version)
        .usage("[options] [package-name]")
        .option("-d, --desc <string>", "package description")
        .option("-d, --desc <string>", "package description")
        .option("-a, --author <string>", "author's github handle", defaults.author)
        .option("-l, --license <string>", "package license", defaults.license)
        .option("-r, --repo <string>", "package repo path")
        .option("-g, --no-git", "generate without git init")
        .option("-m, --manager <npm|yarn>", "package manager to use", /^(npm|yarn)$/, defaults.manager)
        .option("-t, --template <default|typescript>", "package template to use", /^(default|typescript)$/, defaults.template)
        .option("-s, --skip-prompts", "skip all prompts (must provide package-name via cli)")
        .option("-q, --quiet", "runs the installer without any output", false)
        .parse(process.argv);

    // create options object
    const options = {
        description: program.desc,
        author: program.author,
        license: program.license,
        repo: program.repo,
        manager: program.manager,
        template: program.template,
        skipPrompts: program.skipPrompts,
        git: program.git,
        quiet: program.quiet
    };

    // apply defaults where required
    Object.keys(options).forEach((key) => {
        if (!options[key] && defaults[key]) {
            options[key] = defaults[key];
        }
    });

    // use project name if specified
    if (program.args.length === 1) {
        options.name = program.args[0];
    }

    // or fail if too many arguments were passed
    else if (program.args.length > 1) {

        // print error
        console.error("invalid arguments");

        // then help
        program.help();

        // and exit with failure
        process.exit(1);
    }

    // prompt for additional parameters
    const config = await promptProjectConfig(options);

    // generate project
    const destination = await createProject(config);

    // print result
    if (!options.quiet) {
        console.log(`

Your E2E test project has been created at ${destination}.

To get started, in one tab, run:
$ ${chalk.cyan(`cd ${config.shortName} && ${config.manager} run test`)}
`);
    }
    return destination;
};


// start cli (fail on uncaught error)
module.exports()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
