# RobotlegsJS Phaser-CE Extension

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.com/RobotlegsJS/RobotlegsJS-Phaser-CE.svg?branch=master)](https://travis-ci.com/RobotlegsJS/RobotlegsJS-Phaser-CE)
[![codebeat badge](https://codebeat.co/badges/d12114d1-c839-4e43-aa22-72935420d4e6)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-phaser-ce-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/860c6f9a213f42b8c543/maintainability)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser-CE/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/860c6f9a213f42b8c543/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser-CE/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fphaser-ce.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fphaser-ce)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Phaser-CE.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [Phaser-CE](https://github.com/photonstorm/phaser-ce).

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/phaser-ce --save-prod
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/phaser-ce
```

From version `0.2.0` of this package, the [Phaser-CE](https://github.com/photonstorm/phaser-ce) dependency was moved to **peerDependencies**,
allowing the final user to choose the desired version of the `phaser-ce` library on each project.

The `@robotlegsjs/phaser-ce` package is compatible with versions between the `>=2.8.1 <3` version range of `phaser-ce` library.

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

Usage
---

```ts
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import "reflect-metadata";

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";
import { PhaserBundle, ContextStateManager } from "@robotlegsjs/phaser-ce";

import { StateKey } from "./constants/StateKey";

import { Boot } from "./states/Boot";
import { Preload } from "./states/Preload";
import { GameTitle } from "./states/GameTitle";
import { Main } from "./states/Main";
import { GameOver } from "./states/GameOver";

import { GameConfig } from "./config/GameConfig";
import { StateMediatorConfig } from "./config/StateMediatorConfig";

class Game extends Phaser.Game {

    private _context: IContext;

    constructor() {

        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

        this._context = new Context();
        this._context.install(MVCSBundle, PhaserBundle)
            .configure(new ContextStateManager(this.state))
            .configure(StateMediatorConfig)
            .configure(GameConfig)
            .initialize();

        this.state.add(StateKey.BOOT, Boot, false);
        this.state.add(StateKey.PRELOAD, Preload, false);
        this.state.add(StateKey.GAME_TITLE, GameTitle, false);
        this.state.add(StateKey.MAIN, Main, false);
        this.state.add(StateKey.GAME_OVER, GameOver, false);

        this.state.start(StateKey.BOOT);
    }
}

new Game();
```

[See example](example)

## Running the example

Run the following commands to run the example:

```bash
npm install
npm start
```

or:

```bash
yarn install
yarn start
```

## RobotlegsJS Phaser-CE for enterprise

Available as part of the Tidelift Subscription

The maintainers of [@robotlegsjs/phaser-ce](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE) and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-robotlegsjs-phaser-ce?utm_source=npm-robotlegsjs-phaser-ce&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

[MIT](LICENSE)
