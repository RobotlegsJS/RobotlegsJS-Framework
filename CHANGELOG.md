# RobotlegsJS CreateJS Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [x] Add instructions of how to install the **@robotlegsjs/createjs** package into **README.md**.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and CreateJS.

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

- Update `@robotlegsjs/core` to version `1.0.3` (see #52).

- Deploy example project (see #24).

- Improve `prettier` rules and `autoformat` script (see #32).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #32).

- Migrate project to `travis-ci.com`.

- Update `codebeat` Project UUID.

- Update dev dependencies to latest version.

## Robotlegs-CreateJS 1.0.0

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-CreateJS/releases/tag/1.0.0) - 2018-11-26

#### Changed

- Update `@robotlegsjs/core` to version `1.0.0` (see #21).

- Update `karma` setup to generate code coverage report only for `src` folder (see #4).

- Improve webpack configuration used to run example project. The `npm start` script will generate hashed files (to avoid browser cache) and open the broswer automatically (see #5).

- Migrate to Headless Chrome and improve performance of Karma (see #16).

- Prepare package for stable version (see #17).

- Update GitHub Templates (see #20).

- Update dev dependencies to latest version.

## Robotlegs-CreateJS 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-CreateJS/releases/tag/0.2.0) - 2018-08-08

- Added integration with [createjs](https://createjs.com) library (see #1).

- Use [easeljs](https://www.npmjs.com/package/easeljs) package instead of full [createjs](https://www.npmjs.com/package/createjs) package (see #3).

- Enable `greenkeeper` (see #2).
