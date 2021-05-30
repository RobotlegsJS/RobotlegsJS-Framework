# RobotlegsJS Pixi SignalMediator Extension

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/pixi-signalmediator/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fpixi-signalmediator.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fpixi-signalmediator)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A port of [Robotlegs SignalMediator Extension](https://github.com/MrDodson/robotlegs-extensions-SignalMediator) to TypeScript.

Originally published on [RobotlegsJS-SignalMediator](https://github.com/cuongdd2/RobotlegsJS-SignalMediator).

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/pixi-signalmediator --save
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/pixi-signalmediator
```

From version `0.2.0` of this package, the [PixiJS](https://github.com/pixijs/pixi.js) dependencies were moved to **peerDependencies**,
allowing the final user to choose the desired version of the `pixi.js` library on each project.

#### For `pixi.js` version 5

The `@robotlegsjs/pixi-signalmediator` package version `^2.0.0` is compatible with versions between the `>=5.0.0 <6` version range of `pixi.js` library.

Since version `5.0.0` of `pixi.js`, the `eventemitter3` library was removed and is not necessary anymore.

You can setup your project for version 5 of `pixi.js` using:

```bash
npm install pixi.js@^5.0.0 reflect-metadata --save
```

or

```bash
yarn add pixi.js@^5.0.0 reflect-metadata
```

#### For `pixi.js` version 4

The `@robotlegsjs/pixi-signalmediator` package version `^1.0.0` is compatible with versions between the `>=4.2.1 <5` version range of `pixi.js` library.

Since each version of `pixi.js` library defines which version of `eventemitter3` library is being used, remember to also install the proper version of `eventemitter3` in your project.

As example, when you would like to use the version `4.2.1` of `pixi.js` library, you can run:

```bash
npm install pixi.js@4.2.1 eventemitter3@^2.0.0 reflect-metadata --save
```

or

```bash
yarn add pixi.js@4.2.1 eventemitter3@^2.0.0 reflect-metadata
```

Then follow the [installation instructions](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/core#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/core)
+ [RobotlegsJS-Pixi](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/pixi)
+ [SignalsJS](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/signals)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [PixiJS](https://github.com/pixijs/pixi.js)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## Usage

```typescript
import { inject, injectable } from "@robotlegsjs/core";

import { SignalMediator } from "@robotlegsjs/pixi-signalmediator";

@injectable()
export class MyUserMediator extends SignalMediator<MyUserView> {

    @inject(UserLoggedInSignal) protected userLoggedInSignal: UserLoggedInSignal;
    @inject(UserLoggedOutSignal) protected userLoggedOutSignal: UserLoggedOutSignal;

    constructor() {
        super();
    }

    private onUserLoggedIn(): void {
        // user is logged in, do something...
    }

    private onUserLoggedOut(): void {
        // user is logged out, do something...
    }

    public initialize(): void {
        this.addToSignal(this.userLoggedInSignal, this.onUserLoggedIn.bind(this));
        this.addToSignal(this.userLoggedOutSignal, this.onUserLoggedOut.bind(this));
    }

    public destroy(): void {
        // clean up memory...
    }
}
```

## RobotlegsJS Pixi SignalMediator for enterprise

Available as part of the Tidelift Subscription

The maintainers of [@robotlegsjs/pixi-signalmediator](https://github.com/RobotlegsJS/Robotlegs/tree/master/packages/pixi-signalmediator) and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-robotlegsjs-pixi-signalmediator?utm_source=npm-robotlegsjs-pixi-signalmediator&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

[MIT](LICENSE)
