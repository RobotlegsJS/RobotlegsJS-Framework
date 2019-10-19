# RobotlegsJS Macrobot Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

  - [x] Find a way to keep a new line between **@inject** anotation and property declarations.

- [x] Improve Code Coverage to reach 100%.

## [Unreleased]

<!--
Types of changes:

#### Added
- for new features.

#### Changed
- for changes in existing functionality.

#### Deprecated
- for soon-to-be removed features.

#### Removed
- for now removed features.

#### Fixed
- for any bug fixes.

#### Security
- in case of vulnerabilities.
-->

#### Changed

- Update dev dependencies to latest version.

## RobotlegsJS-Macrobot 1.0.0

### [v1.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/1.0.2) - 2019-03-23

#### Fixed

- Solve `npm readme` problem (see #94):

> "Unable to find a readme for @robotlegsjs/macrobot@1.0.1".

- Solve `npm audit` warning, ignoring warnings from `dev dependencies` (see #94).

### [v1.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/1.0.1) - 2019-03-21

#### Changed

- Update [`@robotlegsjs/core`](https://github.com/RobotlegsJS/RobotlegsJS) to version `1.0.1` (see #93).

- Improve `prettier` rules and `autoformat` script (see #90).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #90).

- Update dev dependencies to latest version.

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/1.0.0) - 2018-11-25

#### Changed

- Update `@robotlegsjs/core` to version `1.0.0` (see #81).

- Update `@robotlegsjs/signalcommandmap` to version `1.0.0` (see #82).

- Use `karma-sinon-chai` dependency (see #76).

- Migrate to Headless Chrome and improve performance of `karma` (see #77).

- Prepare package for stable version (see #78).

- Update GitHub Templates (see #80).

- Update dev dependencies to latest version.

#### Fixed

- Map payloads into the context of nested macro commands (see #74 and #75).

## RobotlegsJS-Macrobot 0.2.0

### [v0.2.1](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.2.1) - 2018-09-16

#### Changed

- Update `@robotlegsjs/core` to version `0.2.1` (see #67).

- Update `karma` setup to generate code coverage report only for `src` folder (see #65).

- Update dev dependencies to latest version.

#### Fixed

- Map payloads into the context of macro commands (see #49 and #68).

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.2.0) - 2018-08-02

#### Changed

- Update `@robotlegsjs/core` to version `0.2.0` (see #63).

- Enforce TSLint rules (see #51).

- Update TypeScript Compiler Options (see #47, #61).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #61).

- Use `rimraf` instead of `rm -rf` (see #41).

- Update Prettier rules (see #40).

- Update CODEBEAT project UUID (see #39).

- Update codeclimate settings (see #38).

- Adopts year-agnostic copyright message (see #60).

- Update dev dependencies to latest version.

## RobotlegsJS-Macrobot 0.1.0

### [v0.1.0](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.1.0) - 2017-11-19

#### Added

- Add Changelog (see #23).

- Add Code of Conduct (see #24).

- Add Issue Template (see #25).

- Add Pull Request Template (see #26).

#### Changed

- Update `@robotlegsjs/core` to version `0.1.1` (see #21).

- Update README (see #27).

- Improve Code Coverage and Fix Bugs (see #28).

- Update dev dependencies to latest version.

## RobotlegsJS-Macrobot 0.0.1

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.0.5) - 2017-09-26

#### Changed

- Update `@robotlegsjs/core` to version `0.0.6` (see #13).

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #11).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.0.4) - 2017-09-15

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see #8).

- Add integration with [CodeBeat](https://codebeat.co) (see #9).

- Add support to [Istanbul](https://istanbul.js.org) test coverage tool (see #10).

#### Changed

- Update `@robotlegsjs/core` to version `0.0.5` (see #5).

- Update TSLint rules (see #7).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.0.3) - 2017-08-30

#### Changed

- Update `@robotlegsjs/core` to version `0.0.4` (see #4).

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.0.2) - 2017-08-11

#### Added

- Add contributing guidelines.

#### Changed

- Update `@robotlegsjs/core` to version `0.0.3`.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/releases/tag/0.0.1) - 2017-08-07

- Project moved to it's own organization and renamed to [**@robotlegsjs/macrobot**](https://www.npmjs.com/package/@robotlegsjs/macrobot).

- The version **0.0.1** is compatible to version **1.0.1** of [**robotlegs-macrobot**](https://www.npmjs.com/package/robotlegs-macrobot) package.

- For the changelog of older versions, check the log of previous [releases](https://github.com/GoodgameStudios/RobotlegsJS-Macrobot/releases).