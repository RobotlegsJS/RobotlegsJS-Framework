# RobotlegsJS Phaser-CE SignalCommandMap Extension

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/phaser-ce-signalcommandmap/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fphaser-ce-signalcommandmap.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fphaser-ce-signalcommandmap)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A [RobotlegsJS](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/core) Extension that allows the mapping of
[Phaser.Signal](https://photonstorm.github.io/phaser-ce/Phaser.Signal.html) class to commands.

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/phaser-ce-signalcommandmap --save-prod
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/phaser-ce-signalcommandmap
```

From version `0.2.0` of this package, the [Phaser-CE](https://github.com/photonstorm/phaser-ce) dependency was moved to **peerDependencies**,
allowing the final user to choose the desired version of the `phaser-ce` library on each project.

The `@robotlegsjs/phaser-ce-signalcommandmap` package is compatible with versions between the `>=2.8.1 <3` version range of `phaser-ce` library.

As example, when you would like to use the version `2.8.1` of `phaser-ce` library, you can run:

```bash
npm install phaser-ce@2.8.1 reflect-metadata --save-prod
```

or

```bash
yarn add phaser-ce@2.8.1 reflect-metadata
```

Then follow the [installation instructions](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/core#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/core)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [Phaser-CE](https://github.com/photonstorm/phaser-ce)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## RobotlegsJS Phaser-CE SignalCommandMap for enterprise

Available as part of the Tidelift Subscription

The maintainers of [@robotlegsjs/phaser-ce-signalcommandmap](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/phaser-ce-signalcommandmap) and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-robotlegsjs-phaser-ce-signalcommandmap?utm_source=npm-robotlegsjs-phaser-ce-signalcommandmap&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

[MIT](LICENSE)
