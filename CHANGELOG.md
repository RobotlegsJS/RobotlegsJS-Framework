# RobotlegsJS Pixi SignalMediator Changelog

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

- Migrate project to `travis-ci.com`.

- Update `codebeat` Project UUID.

- Improve `prettier` rules and `autoformat` script (see #77).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #77).

- Update dev dependencies to latest version.

## RobotlegsJS-Pixi-SignalMediator 1.0.0

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/1.0.0) - 2018-11-25

#### Changed

- Update `@robotlegsjs/signals` to version `1.0.0` (see #69).

- Update `@robotlegsjs/pixi` to version `1.0.0` (see #70).

- Update `karma` setup to generate code coverage report only for `src` folder (see #57).

- Migrate to Headless Chrome and improve performance of `karma` (see #65).

- Prepare package for stable version (see #66).

- Update GitHub Templates (see #68).

- Update dev dependencies to latest version.

## RobotlegsJS-Pixi-SignalMediator 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.2.0) - 2018-08-03

#### Changed

- Update `@robotlegsjs/pixi` to version `0.2.0` (see #56).

- Update `@robotlegsjs/signals` to version `0.2.0` (see #55).

- Move `pixi.js` and `eventemitter3` libraries to **peerDependencies** (see #56).

- Update Prettier rules (see #46).

- Update codeclimate config to version 2 (see #47).

- Update TypeScript Compiler Options (see #48, #53).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #53).

- Enforce TSLint rules (see #49).

- Use `rimraf` instead of `rm -rf`.

- Update Code Climate token (see #26).

- Adopts year-agnostic copyright message (see #51).

- Update dev dependencies to latest version.

## RobotlegsJS-Pixi-SignalMediator 0.1.0

### [v0.1.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.1.2) - 2017-11-23

#### Added

- Add instructions about how to install and how to use the library (see #25).

#### Changed

- Update `@robotlegsjs/pixi` to version `0.1.2` (see #25).

- Update dev dependencies to latest version.

### [v0.1.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.1.1) - 2017-11-20

#### Changed

- Update `@robotlegsjs/pixi` to version `0.1.1` (see #24).

- Update dev dependencies to latest version.

### [v0.1.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.1.0) - 2017-11-15

#### Added

- Add Changelog (see #19).

- Add Code of Conduct (see #20).

- Add Issue Template (see #21).

- Add Pull Request Template (see #22).

#### Changed

- Update `@robotlegsjs/pixi` to version `0.1.0` (see #16).

- Update `@robotlegsjs/signals` to version `0.0.12` (see #18).

- Use Map object properly (see #23).

- Update dev dependencies to latest version.

## RobotlegsJS-Pixi-SignalMediator 0.0.1

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.0.4) - 2017-10-18

#### Changed

- Update `@robotlegsjs/pixi` to version `0.0.6` (see #13).

- Update dev dependencies to latest version.

#### Removed

- Remove direct dependency of `@robotlegsjs/core`, since `@robotlegsjs/pixi` already have it as a dependency (see #13).

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.0.3) - 2017-10-11

#### Changed

- Update `@robotlegsjs/pixi` to version `0.0.5` (see #11).

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.0.2) - 2017-09-26

#### Changed

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #1).

- Update `@robotlegsjs/signals` to version `0.0.11` (see #3).

- Update `@robotlegsjs/core` to version `0.0.6` (see #4).

- Update `@robotlegsjs/pixi` to version `0.0.4` (see #5).

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-SignalMediator/releases/tag/0.0.1) - 2017-09-25

- Project moved to it's own organization and renamed to [**@robotlegsjs/pixi-signalmediator**](https://www.npmjs.com/package/@robotlegsjs/pixi-signalmediator).

- The version **0.0.1** is compatible to version **1.0.0-alpha.7** of [**robotlegs-signalmediator**](https://www.npmjs.com/package/robotlegs-signalmediator) package.

- For the changelog of older versions, check the log of previous [releases](https://github.com/cuongdd2/RobotlegsJS-SignalMediator/releases).
