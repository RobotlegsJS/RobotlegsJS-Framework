RobotlegsJS PixiJS Extension
===

[![Join the chat at https://gitter.im/GoodgameStudios/RobotlegsJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/GoodgameStudios/RobotlegsJS)
[![Build Status](https://secure.travis-ci.org/GoodgameStudios/RobotlegsJS-Pixi.svg?branch=master)](https://travis-ci.org/GoodgameStudios/RobotlegsJS-Pixi)
[![Code Climate](https://codeclimate.com/github/GoodgameStudios/RobotlegsJS-Pixi/badges/gpa.svg)](https://codeclimate.com/github/GoodgameStudios/RobotlegsJS-Pixi)
[![Test Coverage](https://codeclimate.com/github/GoodgameStudios/RobotlegsJS-Pixi/badges/coverage.svg)](https://codeclimate.com/github/GoodgameStudios/RobotlegsJS-Pixi/coverage)
[![npm version](https://badge.fury.io/js/robotlegs-pixi.svg)](https://badge.fury.io/js/robotlegs-pixi)

[![NPM](https://nodei.co/npm/robotlegs-pixi.png?downloads=true&downloadRank=true)](https://nodei.co/npm/robotlegs-pixi/)
[![NPM](https://nodei.co/npm-dl/robotlegs-pixi.png?months=9&height=3)](https://nodei.co/npm/robotlegs-pixi/)

Integrate [RobotlegsJS](https://github.com/goodgamestudios/RobotlegsJs)
framework with [PixiJS](https://github.com/pixijs/pixi.js).

Usage
---

```ts
/// <reference path="node_modules/robotlegs-pixi/definitions/pixi.d.ts" />

import { Context, MVCSBundle } from "robotlegs";
import { PixiExtension ,ContextView } from "robotlegs-pixi";

let context = new Context();
context.
  install( MVCSBundle, PixiExtension ).
  configure( new ContextView((<any>this.renderer).plugins.interaction) );
```


License
---

[MIT](LICENSE.md)
