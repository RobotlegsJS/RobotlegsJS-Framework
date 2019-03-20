# RobotlegsJS SignalCommandMap Changelog

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

- Update [`@robotlegsjs/signals`](https://github.com/RobotlegsJS/SignalsJS) to version `1.0.1` (see #87).

- Update [`@robotlegsjs/core`](https://github.com/RobotlegsJS/RobotlegsJS) to version `1.0.1` (see #87).

- Improve `prettier` rules and `autoformat` script (see #86).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #86).

- Update dev dependencies to latest version.

## RobotlegsJS-SignalCommandMap 1.0.0

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/1.0.0) - 2018-11-25

#### Changed

- Update `@robotlegsjs/signals` to version `1.0.0` (see #79).

- Update `@robotlegsjs/core` to version `1.0.0` (see #80).

- Update `karma` setup to generate code coverage report only for `src` folder (see #69).

- Migrate to Headless Chrome and improve performance of `karma` (see #75).

- Prepare package for stable version (see #76).

- Update GitHub Templates (see #78).

- Update dev dependencies to latest version.

## RobotlegsJS-SignalCommandMap 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.2.0) - 2018-08-02

#### Changed

- Update `@robotlegsjs/core` to version `0.2.0` (see #67).

- Update `@robotlegsjs/signals` to version `0.2.0` (see #66).

- Update TypeScript Compiler Options (see #55, $64).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #64).

- Enforce TSLint rules (see #54).

- Use `rimraf` instead of `rm -rf` (see #46).

- Update Prettier rules (see #45).

- Update CODEBEAT project UUID (see #44).

- Update codeclimate settings (see #43).

- Adopts year-agnostic copyright message.

- Update dev dependencies to latest version.

## RobotlegsJS-SignalCommandMap 0.1.0

### [v0.1.0](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.1.0) - 2017-11-16

#### Added

- Add Changelog (see #27).

- Add Code of Conduct (see #28).

- Add Issue Template (see #29).

- Add Pull Request Template (see #30).

#### Changed

- Update `@robotlegsjs/signals` to version `0.0.12` (see #26).

- Update `@robotlegsjs/core` to version `0.1.1` (see #24).

- Improve Code Coverage and Fix Bugs (see #31).

- Update dev dependencies to latest version.

## RobotlegsJS-SignalCommandMap 0.0.1

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.0.5) - 2017-09-26

#### Changed

- Update `@robotlegsjs/signals` to version `0.0.11` (see #17).

- Update `@robotlegsjs/core` to version `0.0.6` (see #18).

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #15).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.0.4) - 2017-09-15

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see #13).

- Add integration with [CodeBeat](https://codebeat.co) (see #13).

- Add support to [Istanbul](https://istanbul.js.org) test coverage tool (see #13).

#### Changed

- Update `@robotlegsjs/signals` to version `0.0.10` (see #12).

- Update `@robotlegsjs/core` to version `0.0.5` (see #11).

- Update TSLint rules (see #13).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.0.3) - 2017-08-30

#### Changed

- Update `@robotlegsjs/signals` to version `0.0.7` (see #8).

- Update `@robotlegsjs/core` to version `0.0.4` (see #9).

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.0.2) - 2017-08-11

#### Added

- Add contributing guidelines.

#### Changed

- Update `@robotlegsjs/signals` to version `0.0.5`.

- Update `@robotlegsjs/core` to version `0.0.3`.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-SignalCommandMap/releases/tag/0.0.1) - 2017-08-07

- Project moved to it's own organization and renamed to [**@robotlegsjs/signalcommandmap**](https://www.npmjs.com/package/@robotlegsjs/signalcommandmap).

- The version **0.0.1** is compatible to version **1.0.1** of [**robotlegs-signalcommandmap**](https://www.npmjs.com/package/robotlegs-signalcommandmap) package.

- For the changelog of older versions, check the log of previous [releases](https://github.com/GoodgameStudios/RobotlegsJS-SignalCommandMap/releases).
