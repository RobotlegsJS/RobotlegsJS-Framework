# RobotlegsJS OpenFL Extension

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-OpenFL/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.com/RobotlegsJS/RobotlegsJS-OpenFL.svg?branch=master)](https://travis-ci.com/RobotlegsJS/RobotlegsJS-OpenFL)
[![codebeat badge](https://codebeat.co/badges/d1319321-9119-4546-9a91-2bb8c6969e39)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-openfl-master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1b5077e213ada0659e63/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-OpenFL/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fopenfl.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fopenfl)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-OpenFL.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [OpenFL](http://www.openfl.org/).

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/openfl --save
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/openfl
```

The [OpenFL](http://www.openfl.org) dependency is added as **peerDependencies**,
allowing the final user to choose the desired version of the [openfl](https://www.npmjs.com/package/openfl) library on each project.

The `@robotlegsjs/openfl` package is compatible with versions between the `>=8.3.0` version range of `openfl` library.

As example, when you would like to use the version `8.3.0` of `openfl` library, you can run:

```bash
npm install openfl@8.3.0 reflect-metadata --save
```

or

```bash
yarn add openfl@8.3.0 reflect-metadata
```

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [OpenFL](https://github.com/openfl/openfl)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## Usage

```typescript
import "reflect-metadata";

import { Context, MVCSBundle } from "@robotlegsjs/core";

import { ContextView, OpenFLBundle } from "@robotlegsjs/openfl";

import { MyConfig } from "./config/MyConfig";

import { GameView } from "./view/GameView";

import Stage from "openfl/display/Stage";

export class Game {
    private _loading: HTMLDivElement;
    private _canvas: HTMLDivElement;

    private _stage: Stage;

    private _context: Context;

    constructor() {
        this.init();
    }

    private init(): void {
        // remove loader
        this._loading = <HTMLDivElement>(document.getElementById("loading"));
        document.body.removeChild(this._loading);

        // create stage
        this._stage = new Stage(960, 400, 0xffffff, GameView);

        // create robotlegs context
        this._context = new Context();
        this._context.install(MVCSBundle, OpenFLBundle).
            configure(new ContextView(this._stage)).
            configure(MyConfig).
            initialize();

        // add stage to html body
        this._canvas = <HTMLDivElement>(document.getElementById("canvas"));
        this._canvas.appendChild(this._stage.element);
    }
}
```

[See full example here](example/index.ts)

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

## Checking the example

You can check our example project [here](http://robotlegsjs.io/RobotlegsJS-OpenFL).

## RobotlegsJS OpenFL for enterprise

Available as part of the Tidelift Subscription

The maintainers of [@robotlegsjs/openfl](https://github.com/RobotlegsJS/RobotlegsJS-OpenFL) and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-robotlegsjs-openfl?utm_source=npm-robotlegsjs-openfl&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

[MIT](LICENSE)
