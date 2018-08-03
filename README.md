RobotlegsJS Phaser-CE Extension
===

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://secure.travis-ci.org/RobotlegsJS/RobotlegsJS-Phaser-CE.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Phaser-CE)
[![codebeat badge](https://codebeat.co/badges/23774a85-7477-4f53-822f-11afa0f5f78a)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-phaser-ce-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/860c6f9a213f42b8c543/maintainability)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser-CE/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/860c6f9a213f42b8c543/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser-CE/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fphaser%2Fce.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fphaser%2Fce)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Phaser-CE.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [Phaser-CE](https://github.com/photonstorm/phaser-ce).

Installation
===

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/phaser-ce --save
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/phaser-ce
````

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

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

License
---

[MIT](LICENSE)
