# create-e2e-tests

> CLI for easily creating end-to-end test projects using WebdriverIO and Nascent extensions.


## Features

- Easy-to-use CLI
- Handles all modern JS features
- Bundles `cjs` and `es` module formats
- [create-react-app](https://github.com/facebookincubator/create-react-app) for example usage and local dev
- [Rollup](https://rollupjs.org/) for bundling
- [Babel](https://babeljs.io/) for transpiling
- [Jest](https://facebook.github.io/jest/) for testing
- Supports complicated peer-dependencies
- Supports CSS modules
- Optional support for TypeScript
- Sourcemap creation
- Hundreds of public modules created
- Thorough documentation :heart_eyes:
- [Chinese docs](./readme.zh-CN.md) by [@monsterooo](https://github.com/monsterooo)


## Install globally

This package should be used with `node >= 8`.

```bash
npm install -g @nascentdigital/create-e2e-tests
```

## Usage with npx

```bash
npx @nascentdigital/create-e2e-tests
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

## Creating a New Project

```bash
create-e2e-tests
```

Answer some basic prompts about your E2E test project, and then the CLI will perform the following steps:
- copy over the template
- install dependencies via yarn or npm
- link packages together for local development
- initialize local git repo

At this point, your new module should resemble this screenshot and is all setup for local development.

<p align="center">
  <img width="600" src="https://cdn.rawgit.com/transitive-bullshit/create-react-library/master/media/tree.svg">
</p>


## Development

TODO


## License

MIT © [Nascent Digital](https://github.com/nascentdigital)
