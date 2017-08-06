SignalsJS
===

[![Join the chat at https://gitter.im/GoodgameStudios/RobotlegsJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/GoodgameStudios/RobotlegsJS)
[![Build Status](https://travis-ci.org/RobotlegsJS/SignalsJS.svg?branch=master)](https://travis-ci.org/RobotlegsJS/SignalsJS)
[![Code Climate](https://codeclimate.com/github/RobotlegsJS/SignalsJS/badges/gpa.svg)](https://codeclimate.com/github/RobotlegsJS/SignalsJS)
[![Test Coverage](https://codeclimate.com/github/RobotlegsJS/SignalsJS/badges/coverage.svg)](https://codeclimate.com/github/RobotlegsJS/SignalsJS/coverage)
[![npm version](https://badge.fury.io/js/@robotlegsjs/signals.svg)](https://badge.fury.io/js/@robotlegsjs/signals)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/SignalsJS.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/@robotlegsjs/signals.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@robotlegsjs/signals/)
[![NPM](https://nodei.co/npm-dl/@robotlegsjs/signals.png?months=9&height=3)](https://nodei.co/npm/@robotlegsjs/signals/)


TypeScript port of [AS3 Signals](https://github.com/robertpenner/as3-signals).
[13kb compressed](dist/signals.min.js).

Usage
---

```ts
import { Signal } from "@robotlegsjs/signals";
var signal = new Signal();

signal.add(data => {
  console.log(data.message);
});

signal.dispatch({ message: "hello signal!" });
```

License
---

[MIT](LICENSE)
