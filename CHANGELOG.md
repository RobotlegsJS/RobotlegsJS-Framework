# RobotlegsJS CreateJS Changelog:

## Robotlegs-CreateJS 1.0.0

### v1.0.0 - Planned stable version

- [x] Add instructions of how to install the **@robotlegsjs/createjs** package into **README.md**.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [x] Update **Prettier** rules:

  - [x] **printWidth** should be around **140** characters per line.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and CreateJS.

## Robotlegs-CreateJS 0.2.0

### v0.2.1

- Update `karma` setup to generate code coverage report only for `src` folder (see #4).

- Improve webpack configuration used to run example project. The `npm start` script will generate hashed files (to avoid browser cache) and open the broswer automatically (see #5).

- Migrate to Headless Chrome and improve performance of Karma (see #15).

- Update dev dependencies to latest version.

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-CreateJS/releases/tag/0.2.0) - 2018-08-08

- Added integration with [createjs](https://createjs.com) library (see #1).

- Use [easeljs](https://www.npmjs.com/package/easeljs) package instead of full [createjs](https://www.npmjs.com/package/createjs) package (see #3).

- Enable `greenkeeper` (see #2).
