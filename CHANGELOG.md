# RobotlegsJS Phaser-CE Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [x] Add instructions of how to install the **@robotlegsjs/phaser-ce** package into **README.md**.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [ ] Improve Code Coverage to reach 100%.

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

- Improve `prettier` rules and `autoformat` script (see #23).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #23).

- Update `codebeat` Project UUID.

- Update dev dependencies to latest version.

## RobotlegsJS Phaser-CE 1.0.0

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE/releases/tag/1.0.0) - 2018-11-26

#### Changed

- Update `@robotlegsjs/core` to version `1.0.0` (see #16).

- Update `karma` setup to generate code coverage report only for `src` folder (see #5).

- Migrate to Headless Chrome and improve performance of `karma` (see #13).

- Prepare package for stable version (see #14).

- Update GitHub Templates (see #15).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser-CE 0.2.0

### [v0.2.1](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE/releases/tag/0.2.1) - 2018-08-03

#### Changed

- Update NPM Version badge and ignore `static` folder when publishing package to **NPM** (see #4).

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE/releases/tag/0.2.0) - 2018-08-03

#### Added

- Add changelog (see [35](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/35)).

- Add code of conduct (see [36](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/36)).

- Add issue template (see [38](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/38)).

- Add pull request template (see [39](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/39)).

#### Changed

- Rename package to `@robotlegsjs/phaser-ce` and move to [RobotlegsJS-Phaser-CE](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE) (see #2).

- Move `phaser-ce` library to **peerDependencies**, allowing the final user to choose the desired version of the `phaser-ce` library on each project (see #3).

- Update `@robotlegsjs/core` to version `0.2.0` (see [51](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/51)).

- Update `phaser-ce` to version `2.11.0` (see [46](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/46)).

- Update codeclimate settings (see [40](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/40)).

- Update Prettier rules (see [41](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/41)).

- Use `rimraf` instead of `rm -rf` (see [42](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/42)).

- Update TypeScript Compiler Options (see [43](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/43), [49](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/49)).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see [49](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/49)).

- Enforce TSLint rules (see [44](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/44)).

- Adopts year-agnostic copyright message (see [47](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/47)).

- Update dev dependencies to latest version.

#### Removed

- Remove `eventemitter3` dependency (see [45](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/45)).

## RobotlegsJS Phaser-CE 0.0.1 (published as `@robotlegsjs/phaser`)

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.5) - 2017-09-26

#### Changed

- Update `@robotlegsjs/core` to version `0.0.6` (see [9](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/9)).

- Update `phaser-ce` to version `2.8.8` (see [10](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/10)).

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see [7](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/7)).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.4) - 2017-09-15

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/6)).

- Add integration with [CodeBeat](https://codebeat.co) (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/6)).

#### Changed

- Update `@robotlegsjs/core` to version `0.0.5` (see [5](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/5)).

- Update `phaser-ce` to version `2.8.7` (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/6)).

- Update TSLint rules (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/6)).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.3) - 2017-08-30

#### Changed

- Update `@robotlegsjs/core` to version `0.0.4` (see [4](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/pull/4)).

- Update `phaser-ce` to version `2.8.4`.

- Enable GreenKeeper.

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.2) - 2017-08-12

#### Changed

- Update `@robotlegsjs/core` to version `0.0.3`.

- Update contributing guidelines.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.1) - 2017-08-06

- The version **0.0.1** integrated version **2.8.3** of [**phaser-ce**](https://www.npmjs.com/package/phaser-ce) package.
