# RobotlegsJS Phaser-CE SignalCommandMap Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [x] Add instructions of how to install the **@robotlegsjs/phaser-ce-signalcommandmap** package into **README.md**.

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

- Improve `prettier` rules and `autoformat` script (see #20).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #20).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser-CE SignalCommandMap 1.0.0

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap/releases/tag/1.0.0) - 2018-11-26

#### Changed

- Update `@robotlegsjs/core` to version `1.0.0` (see #13).

- Update `karma` setup to generate code coverage report only for `src` folder (see #3).

- Migrate to Headless Chrome and improve performance of `karma` (see #10).

- Prepare package for stable version (see #11).

- Update GitHub Templates (see #12).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser-CE SignalCommandMap 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap/releases/tag/0.2.0) - 2018-08-04

#### Added

- Add changelog (see [30](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/30)).

- Add Code of Conduct (see [31](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/31)).

- Add Issue Template (see [32](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/32)).

- Add Pull Request Template (see [33](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/33)).

#### Changed

- Rename package to `@robotlegsjs/phaser-ce-signalcommandmap` and move to [RobotlegsJS-Phaser-CE-SignalCommandMap](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap) (see #1).

- Move `phaser-ce` library to **peerDependencies**, allowing the final user to choose the desired version of the `phaser-ce` library on each project (see #3).

- Update `@robotlegsjs/core` to version `0.2.0` (see [44](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/44)).

- Update `phaser-ce` to version `2.11.0` (see [37](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/37)).

- Update codeclimate settings (see [34](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/34)).

- Update Prettier rules (see [35](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/35)).

- Use `rimraf` instead of `rm -rf` (see [36](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/36)).

- Update TypeScript Compiler Options (see [38](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/38), [42](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/42)).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see [42](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/42)).

- Enforce TSLint rules (see [39](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/39)).

- Adopts year-agnostic copyright message (see [40](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/40)).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser SignalCommandMap 0.0.1

_(published as `@robotlegsjs/phaser-signalcommandmap`)_

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/releases/tag/0.0.5) - 2017-09-26

#### Changed

- Update `@robotlegsjs/core` to version `0.0.6` (see [9](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/9)).

- Update `phaser-ce` to version `2.8.8` (see [10](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/10)).

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see [7](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/7)).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/releases/tag/0.0.4) - 2017-09-15

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/6)).

- Add integration with [CodeBeat](https://codebeat.co) (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/6)).

#### Changed

- Update `@robotlegsjs/core` to version `0.0.5` (see [5](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/5)).

- Update `phaser-ce` to version `2.8.7` (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/6)).

- Update TSLint rules (see [6](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/6)).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/releases/tag/0.0.3) - 2017-08-30

#### Changed

- Update `@robotlegsjs/core` to version `0.0.4` (see [4](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/pull/4)).

- Update `phaser-ce` to version `2.8.4`.

- Enable GreenKeeper.

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/releases/tag/0.0.2) - 2017-08-12

#### Changed

- Update npm badge.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/releases/tag/0.0.1) - 2017-08-12

- The version **0.0.1** integrated version **2.8.3** of [**phaser-ce**](https://www.npmjs.com/package/phaser-ce) package.
