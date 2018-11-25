RobotlegsJS Pixi Palidor Extension
===

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://secure.travis-ci.org/RobotlegsJS/RobotlegsJS-Pixi-Palidor.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Pixi-Palidor)
[![codebeat badge](https://codebeat.co/badges/2738dc26-f93e-48a9-b3ba-0632a4dfd3b5)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-pixi-palidor-master)
[![Test Coverage](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi-Palidor/badges/coverage.svg)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Pixi-Palidor/coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fpixi-palidor.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fpixi-palidor)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Pixi-Palidor.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Palidor is an extension of RobotlegsJS for Pixi, designed to help the management of the Main Container, taking the responsibility to add, remove and switch the views. Perfect for game development.

Installation
---

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/pixi-palidor
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/pixi-palidor
```

From version `0.2.0` of this package, the [PixiJS](https://github.com/pixijs/pixi.js) dependencies were moved to **peerDependencies**,
allowing the final user to choose the desired version of the `pixi.js` library on each project.

The `@robotlegsjs/pixi-palidor` package is compatible with versions between the `>=4.2.1 <5` version range of `pixi.js` library.

Since each version of `pixi.js` library defines which version of `eventemitter3` library is being used, remember to also install the proper version of `eventemitter3` in your project.

As example, when you would like to use the version `4.2.1` of `pixi.js` library, you can run:

```bash
npm install pixi.js@4.2.1 eventemitter3@^2.0.0 reflect-metadata --save
```

or

```bash
yarn add pixi.js@4.2.1 eventemitter3@^2.0.0 reflect-metadata --save
```

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
+ [RobotlegsJS-Pixi](https://github.com/RobotlegsJS/RobotlegsJS-Pixi)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [PixiJS](https://github.com/pixijs/pixi.js)
+ [eventemitter3](https://github.com/primus/eventemitter3)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

Usage
===
Palidor was designed to be simple and, practical. You just need to follow three steps to start to use.

### Step 1 - Install/Configure

Firstly, you need to instantiate your RobotlegsJS's context, and then install and configure the PalidorPixiExtension:

```typescript
let stage = new PIXI.Container();
let context = new Context()
    .install(MVCSBundle)
    .install(PixiBundle)
    .install(PalidorPixiExtension)
    .configure(new ContextView(this.stage))
    .configure(MyPalidorConfig)
    .initialize();
```

+ **MVCSBundle:** Installs a number of extensions and configurations for developers who are comfortable with the typical [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS) setup.
+ **PixiBundle:** Installs a view / mediator layer provided by [RobotlegsJS-Pixi](https://github.com/RobotlegsJS/RobotlegsJS-Pixi).
+ **PalidorPixiExtension:** It is the extension itself.
+ **MyPalidorConfig:** The Class that implements the Robotlegs's IConfig and will be responsible for map all your Views and FloatingViews.

### Step 2 - Mapping the Views/FloatingViews

In the Second step, you must map all views that you need. Palidor works with two types of views (FloatingViews and Views) and the main difference between them is the way that Palidor will add it on the Stage.

Palidor splits the Main Container into two distinct Layers, one to each type of View. The FloatingView always will be in a layer above the others Views.

<img src="https://raw.githubusercontent.com/RobotlegsJS/RobotlegsJS-Pixi-Palidor/master/media/layers.png" />

+ **View:** A View is a screen added into the Static Layer which is behind all FloatingViews. Palidor allows only one View per time and will remove the current view before to add a new View.
+ **FloatingView:** A FloatingView is a screen added into the Dynamic Layer and always will be above the view and also others FloatingViews. Palidor allows any number of FloatingView that you want. FloatingViews is the best choice to create temporary views such as AlertsScreen, PauseScreen, GameOverScreen and Popups.

The FlowManager will be the responsible to tells to Palidor each event mapped to each View.

```typescript
import { IFlowManager } from "@robotlegsjs/pixi-palidor";
import { IConfig, injectable, inject } from "@robotlegsjs/core";

@injectable()
export class MyPalidorConfig implements IConfig {
    @inject(IFlowManager)
    public flowManager: IFlowManager;

    public configure(): void {
        this.flowManager.map( CustomEvent.SHOW_FIRST_VIEW ).toView( FirstView );
        this.flowManager.map( CustomEvent.SHOW_FIRST_FLOATING_VIEW ).toFloatingView( FirstFloatingView );
    }
}
```

### Step 3 - Adding a View

The last part it is the way that Palidor will add the views on the stage, you just need to dispatch an event using the IEventDispatcher which is available for Injection like any other Robotlegs Command.

```typescript
this.eventDispatcher.dispatchEvent(new CustomEvent(CustomEvent.SHOW_FIRST_VIEW));
```

#### Events

There are some predefined events on the  Palidor to help to remove a view or floating view from the stage.

+ PalidorEvent.REMOVE_CURRENT_VIEW:
+ PalidorEvent.REMOVE_ALL_FLOATING_VIEWS:
+ PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED:

Examples
===

+ [Game - Battleship](https://github.com/RonaldoSetzer/GAME-Battleship)
+ [Game - Minesweeper](https://github.com/RonaldoSetzer/GAME-Minesweeper)
+ [Game - Space Invaders](https://github.com/RonaldoSetzer/GAME-SpaceInvaders)
+ [Game - Tetris](https://github.com/RonaldoSetzer/GAME-Tetris)
+ [Game - Match 3](https://github.com/RonaldoSetzer/GAME-Match3)

License
---

[MIT](LICENSE)
