# RobotlegsJS OpenFL Changelog:

## Robotlegs-OpenFL 1.0.0

### v1.0.0 - Planned stable version

- [x] Add instructions of how to install the **@robotlegsjs/openfl** package into **README.md**.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and OpenFL.

## Robotlegs-OpenFL 0.2.0

### v0.2.1

- Update `openfl` to version `8.6.4` (see #22).

- Update dev dependencies to latest version.

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-OpenFL/releases/tag/0.2.0) - 2018-08-18

- Added integration with [openfl](https://www.npmjs.com/package/openfl) library (see #1).

- Update `openfl` to version `8.4.1` (see #6).

- Generate code coverage report only for src folder (see #4).

- Improve webpack configuration used to run example project. The `npm start` script will generate hashed files (to avoid browser cache) and open the broswer automatically (see #5).

- Enable `greenkeeper` (see #2).

- Update dev dependencies to latest version.
