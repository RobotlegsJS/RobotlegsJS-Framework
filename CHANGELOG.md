# RobotlegsJS Signals Changelog:

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [x] Improve Code Coverage to reach 100%.

- [ ] Move `event` package to an external dependency.

- [ ] Migrate [original documentation](https://github.com/robertpenner/as3-signals#readme) and adapt it to TypeScript.

## [Unreleased]

#### Changed

- Update `karma` setup to generate code coverage report only for `src` folder (see #78).

- Use `karma-sinon-chai` dependency (see #91).

- Migrate to headless Chrome (see #92).

- Improve performance of unit tests running on `karma-webpack` (see #94).

- Update dev dependencies to latest version.

## Signals 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.2.0) - 2018-08-02

#### Added

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #75).

#### Changed

- Adds copyright notice (see #74).

- Enforce TSLint rules (see #55).

- Update TypeScript Compiler Options to be more strict and to generate inline source maps (see #53, #75).

- Disable **removeComments** flag in **tsconfig.json** file, allowing comments to appear in output.

- Update dev dependencies to latest version.

## Signals 0.1.0

### [v0.1.1](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.1.1) - 2018-03-04

#### Changed

- Update codeclimate settings (see #49, #50).

- Update dev dependencies to latest version (see #48).

### [v0.1.0](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.1.0) - 2018-01-22

#### Added

- Adhere to TypeScript Guidelines for General Types (see #43).

#### Changed

- Improve code coverage to reach 100% (see #42).

- Use `rimraf` instead of `rm -rf` (see #41).

- Update Prettier rules (see #40).

- Update CODEBEAT project UUID (see #38).

- Update dev dependencies to latest version.

## Signals 0.0.1

### [v0.0.12](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.12) - 2017-11-14

#### Added

- Add Changelog (see #25).

- Add Code of Conduct (see #26).

- Add Issue Template (see #27).

- Add Pull Request Template (see #28).

#### Changed

- Update README (see #31).

- Solve compilers deprecation warning messages from mocha.

- Update dev dependencies to latest version.

### [v0.0.11](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.11) - 2017-09-26

#### Changed

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #16).

- Update dev dependencies to latest version.

### [v0.0.10](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.10) - 2017-09-15

#### Changed

- Update Prettier configuration (see #15).

### [v0.0.9](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.9) - 2017-09-14

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see #10).

- Add integration with [CodeBeat](https://codebeat.co) (see #12 and #13).

#### Changed

- Update TSLint rules (see #9).

- Update dev dependencies to latest version.

### [v0.0.8](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.8) - 2017-09-04

#### Added

- Add support to [Istanbul](https://istanbul.js.org) test coverage tool (see #7).

#### Changed

- Improve code coverage (see #3, #5, #6 and #8).

- Update dev dependencies to latest version.

### [v0.0.7](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.7) - 2017-08-30

#### Changed

- Update Travis configuration file.

### [v0.0.6](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.6) - 2017-08-30

#### Added

- Enable GreenKeeper (see #2).

#### Changed

- Update dev dependencies to latest version.

### [v0.0.5](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.5) - 2017-08-11

#### Changed

- Update contributing guidelines.

### [v0.0.4](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.4) - 2017-08-11

#### Added

- Add contributing guidelines.

#### Changed

- Update README.

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.3) - 2017-08-06

#### Changed

- Update README.

- Update publish-please configuration.

### [v0.0.2](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.2) - 2017-08-06

#### Changed

- Update README.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/SignalsJS/releases/tag/0.0.1) - 2017-08-06

- Project moved to it's own organization and renamed to [**@robotlegsjs/signals**](https://www.npmjs.com/package/@robotlegsjs/signals).

- The version **0.0.1** is compatible to version **1.0.2** of [**signals.js**](https://www.npmjs.com/package/signals.js) package.

- For the changelog of older versions, check the log of previous [releases](https://github.com/GoodgameStudios/SignalsJS/releases).