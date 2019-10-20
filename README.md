RobotlegsJS Phaser-CE SignalCommandMap Extension
===

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-SignalCommandMap/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap)
[![codebeat badge](https://codebeat.co/badges/5a3a6779-ae1f-4b31-9091-d24503a6b2d7)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-phaser-ce-signalcommandmap-master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/be8024a4f08a2f6bdfc0/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fphaser-ce-signalcommandmap.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fphaser-ce-signalcommandmap)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Phaser-CE-SignalCommandMap.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS) Extension that allows the mapping of
[Phaser.Signal](https://photonstorm.github.io/phaser-ce/Phaser.Signal.html) class to commands.

Installation
---

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

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [Phaser-CE](https://github.com/photonstorm/phaser-ce)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

License
---

[MIT](LICENSE)
