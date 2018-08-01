# RobotlegsJS Pixi Palidor Changelog:

## RobotlegsJS-Pixi-Palidor 1.0.0

### v1.0.0 - Planned stable version

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

  - [ ] Find a way to keep a new line between **@inject** anotation and property declarations.

## RobotlegsJS-Pixi-Palidor 0.2.0

### v0.2.0

Major Breaking Changes:
---

- Fix typo in class named **PixiContainerController** (see #44).
    - The name of the class changed from **PixiContainerContoller** to **PixiContainerController**, don't forget to update your import statements.
    - A copyright message was added to all source files.

Features Or Improvements:
---

- Added *PalidorBundle* class (see #41).

- Added example project (see #41).

- Update Prettier rules (see #41).

- Use `rimraf` instead of `rm -rf` (see #42).

- Update TypeScript Compiler Options (see #43, #53).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #53).

- Enforce TSLint rules (see #54).

- Update codeclimate config to version 2 (see #45).

- Adopts year-agnostic copyright message (see #51).

- Update dev dependencies to latest version.

## RobotlegsJS-Pixi-Palidor 0.1.0

### [v0.1.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.1.1) - 2017-11-23

- Update @robotlegsjs/pixi to version 0.1.2 (see #25).

- Update dev dependencies to latest version.

### [v0.1.0](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.1.0) - 2017-11-20

- Update README.

- Update @robotlegsjs/pixi to version 0.1.1 (see #17 and #24).

- Add Changelog (see #20).

- Add Code of Conduct (see #21).

- Add Issue Template (see #22).

- Add Pull Request Template (see #23).

- Use IContextView to get a reference of the stage (see #24).

- Update dev dependencies to latest version.

## RobotlegsJS-Pixi-Palidor 0.0.1

### [v0.0.6](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.0.6) - 2017-10-18

- Update @robotlegsjs/pixi to version 0.0.6 (see #14).

- Remove direct dependency of @robotlegsjs/core, since @robotlegsjs/pixi already have it as a direct dependency.

- Update dev dependencies to latest version.

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.0.5) - 2017-10-11

- Update @robotlegsjs/pixi to version 0.0.5 (see #12).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.0.4) - 2017-09-26

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #5).

- Update @robotlegsjs/core to version 0.0.6 (see #7).

- Update @robotlegsjs/pixi to version 0.0.4 (see #8).

- Update pixi.js to version 4.5.6 (see #9).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.0.3) - 2017-09-15

- Update @robotlegsjs/core to version 0.0.5 (see #2).

- Update @robotlegsjs/pixi to version 0.0.3 (see #3).

- Update TSLint rules (see #4).

- Add support to [Prettier](https://prettier.io) code formatter (see #4).

- Add integration with [CodeBeat](https://codebeat.co) (see #4).

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.0.2) - 2017-09-03

- Add copyright.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/releases/tag/0.0.1) - 2017-09-03

- Project migrated to [TypeScript](https://www.typescriptlang.org/), from it's original [AS3 Version](https://github.com/RonaldoSetzer/robotlegs-extensions-Palidor).
