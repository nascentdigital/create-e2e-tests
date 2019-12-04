# create-e2e-tests

> CLI for easily creating end-to-end test projects using WebdriverIO and Nascent extensions.


## Features

- Easy-to-use CLI
- Uses [WebdriverIO](https://webdriver.io/) for flexible and extensible testing
- Optional support for TypeScript


## Install globally

This package should be used with `node >= 8`.

```bash
npm install -g @nascentdigital/create-e2e-tests
```

## Usage with npx

```bash
npx @nascentdigital/create-e2e-tests
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and 
higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_


## Creating a New Project

```bash
create-e2e-tests
```

Answer some basic prompts about your E2E test project, and then the CLI will perform the following steps:
- copy over the template
- install dependencies via yarn or npm
- initialize local git repo


## Development

TODO


## License

MIT © [Nascent Digital](https://github.com/nascentdigital)
