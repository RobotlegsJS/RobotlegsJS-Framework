RobotlegsJS OpenFL Extension
===

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-OpenFL/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.org/RobotlegsJS/RobotlegsJS-OpenFL.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-OpenFL)
[![codebeat badge](https://codebeat.co/badges/3c965965-2ab8-4470-a83b-765365b7c530)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-openfl-master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1b5077e213ada0659e63/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-OpenFL/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fopenfl.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fopenfl)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-OpenFL.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [OpenFL](http://www.openfl.org/).

Installation
---

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

Usage
---

```typescript
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

Running the example
---

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

License
---

[MIT](LICENSE)
