"use strict";

// imports
const getGitConfigPath = require("git-config-path");
const githubUsername = require("github-username");
const parseGitConfig = require("parse-git-config");
const which = require("which");
const config = require("./config");

// function definition
module.exports = async () => {

    // define defaults
    const defaults = {
        name: "",
        description: (info) => `E2E tests for ${info.name}.`,
        author: config.get("author"),
        repo: (info) => `${info.author}/${info.name}`,
        license: config.get("license", "MIT"),
        manager: config.get("manager", "npm"),
        template: config.get("template", "javascript")
    };

    // try to create defaults
    try {

        // try to infer github user if author isn't specified
        if (!config.get("author")) {

            // try to parse use from github configuration (if available)
            const gitConfigPath = getGitConfigPath("global");
            if (gitConfigPath) {

                // load configuration
                const gitConfig = parseGitConfig.sync({path: gitConfigPath});

                // lift user if defined
                if (gitConfig.github && gitConfig.github.user) {
                    defaults.author = gitConfig.github.user;
                }

                // lift username from email
                else if (gitConfig.user && gitConfig.user.email) {
                    defaults.author = await githubUsername(gitConfig.user.email);
                }
            }

            // set user if author available
            if (defaults.author) {
                config.set("author", defaults.author);
            }
        }

        // try to infer package manager if not specified
        if (!config.get("manager")) {

            // default to yarn, if installed
            if (which.sync("yarn", {nothrow: true})) {
                defaults.manager = "yarn";
            }

            // set package manager if available
            config.set("manager", defaults.manager);
        }

        // set template if specified
        if (!config.get("template")) {
            config.set("template", defaults.template);
        }
    }

    // swallow error
    catch (e) {}

    // return defaults
    return defaults;
};
