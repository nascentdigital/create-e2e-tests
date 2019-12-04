"use strict";

// imports
const handlebars = require("handlebars");
const execa = require("execa");
const fs = require("fs");
const globby = require("globby");
const mkdirp = require("make-dir");
const ora = require("ora");
const path = require("path");
const pEachSeries = require("p-each-series");
const pkg = require("../package");


// constants
const templateBlacklist = new Set([
    "example/public/favicon.ico"
]);


// function definition
module.exports = async (config) => {

    // capture arguments
    const {
        manager,
        template,
        name,
        git,
        quiet
    } = config;

    // define spinner (create placebo if in quiet mode)
    const spinner = quiet
        ? {promise: () => false}
        : ora;

    // handle scoped package names
    const parts = name.split("/");
    config.shortName = parts[parts.length - 1];

    // determine project path and directory
    const destination = path.join(process.cwd(), config.shortName);
    config.destination = destination;
    await mkdirp(destination);

    // determine source files to copy
    const source = path.join(__dirname, "..", "template", template);
    const files = await globby(source, {
        dot: true
    });

    // copy files to destination
    {
        const promise = pEachSeries(files, async (file) => {
            return module.exports.copyTemplateFile({
                file,
                source,
                destination,
                config
            });
        });
        spinner.promise(promise, `Copying ${template} template to ${destination}`);
        await promise;
    }

    // initialize package manager
    {
        const promise = module.exports.initPackageManager({destination, config});
        spinner.promise(promise, `Running ${manager} install and ${manager} link`);
        await promise;
    }

    // initialize Git if enabled
    if (git) {
        const promise = module.exports.initGitRepo({destination});
        spinner.promise(promise, "Initializing git repo");
        await promise;
    }

    return destination;
};

module.exports.copyTemplateFile = async (options) => {

    // capture parameters
    const {
        file,
        source,
        destination,
        config
    } = options;

    // determine source + destination paths
    const fileRelativePath = path.relative(source, file);
    const destFilePath = path.join(destination, fileRelativePath);
    const destFileDir = path.parse(destFilePath).dir;

    // create destination directory
    await mkdirp(destFileDir);

    // raw copy special files
    if (templateBlacklist.has(fileRelativePath)) {

        // read raw file
        const content = fs.readFileSync(file);

        // write file
        fs.writeFileSync(destFilePath, content);
    }

    // or expand template parameters for template files
    else {

        // read template, expanding
        const template = handlebars.compile(fs.readFileSync(file, "utf8"));
        const content = template({
            ...config,
            yarn: (config.manager === "yarn")
        });

        // write file
        fs.writeFileSync(destFilePath, content, "utf8");
    }

    // return copied file
    return fileRelativePath;
};

module.exports.initPackageManager = async (options) => {

    // capture parameters
    const {
        destination,
        config
    } = options;

    // define package manager commands
    const commands = [

        // install dependencies
        {
            cmd: `${config.manager} install`,
            cwd: destination
        }
    ];

    // execute commands in series
    return pEachSeries(commands, async ({cmd, cwd}) => {
        return execa.shell(cmd, {cwd});
    });
};

module.exports.initGitRepo = async (options) => {

    // capture parameters
    const {
        destination
    } = options;

    // create git ignore
    const gitIgnorePath = path.join(destination, ".gitignore");
    fs.writeFileSync(gitIgnorePath, `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# output
allure-results
allure-report

# dependencies
node_modules

# logs
npm-debug.log*
selenium-*.log
yarn-debug.log*
yarn-error.log*

# misc
.DS_Store
.idea
.vscode
`, "utf8");

    // initialize git and commit project files
    const cmd = `git init && git add . && git commit -m "Initial project import for ${pkg.name}@${pkg.version}"`;
    return execa.shell(cmd, {cwd: destination});
};
