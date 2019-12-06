# create-e2e-tests

> CLI for easily creating end-to-end test projects using WebdriverIO and Nascent extensions.


## Features

- Easy-to-use CLI
- Uses [WebdriverIO](https://webdriver.io/) for flexible and extensible testing
- Extends WebdriverIO using the Nascent [wdio-extend](https://github.com/nascentdigital/wdio-extend) package
- Optional support for TypeScript


## Install globally

This package should be used with `node >= 10`.

```bash
npm install -g @nascentdigital/create-e2e-tests
```

## Usage with npx

```bash
npx @nascentdigital/create-e2e-tests
```


## Creating a New Project

```bash
create-e2e-tests
```

Answer some basic prompts about your E2E test project, and then the CLI will perform the following steps:
- copy over the template
- install dependencies via `yarn` or `npm`
- initialize local git repo


## Development

TODO


## License

MIT © [Nascent Digital](https://github.com/nascentdigital)
