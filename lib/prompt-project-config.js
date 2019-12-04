"use strict";

// imports
const inquirer = require("inquirer");
const validateNpmName = require("validate-npm-package-name");
const config = require("./config");


// define function
module.exports = async (options) => {

    // fail if the project name isn't valid for npm
    if (options.name && !validateNpmName(options.name).validForNewPackages) {
        throw new Error(`invalid package name "${options.name}"`);
    }

    // handle prompt skipping
    if (options.skipPrompts) {

        // fail if there isn't a package name specified
        if (!options.name) {
            throw new Error("invalid input; you must pass a package name with --skip-prompts");
        }

        // execute any function placeholders to resolve values
        Object.keys(options).forEach((key) => {
            const value = options[key];
            if (typeof value === "function") {
                options[key] = value(options);
            }
        });

        // return config
        return options;
    }

    // or prompt use as required
    else {

        // prompt user for input
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Package Name",
                validate: (name) => {
                    return name && validateNpmName(name).validForNewPackages;
                },
                default: options.name
            },
            {
                type: "input",
                name: "description",
                message: "Package Description",
                default: options.description
            },
            {
                type: "input",
                name: "author",
                message: "Author's GitHub Handle",
                default: options.author
            },
            {
                type: "input",
                name: "repo",
                message: "GitHub Repo Path",
                default: options.repo
            },
            {
                type: "input",
                name: "license",
                message: "License",
                default: options.license
            },
            {
                type: "list",
                name: "manager",
                message: "Package Manager",
                choices: [ "npm", "yarn" ],
                default: options.manager
            },
            {
                type: "list",
                name: "template",
                message: "Template",
                choices: [ "default", "typescript"],
                default: options.template
            }
        ]);

        // write settings into persisted config
        config.set("author", answers.author);
        config.set("license", answers.license);
        config.set("manager", answers.manager);
        config.set("template", answers.template);

        // return answers
        return {
            ...answers,
            git: options.git,
            quiet: options.quiet
        };
    }
};
