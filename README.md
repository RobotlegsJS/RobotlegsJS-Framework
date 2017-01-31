SignalsJS
===

[![Join the chat at https://gitter.im/GoodgameStudios/RobotlegsJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/GoodgameStudios/RobotlegsJS)
[![Build Status](https://travis-ci.org/GoodgameStudios/SignalsJS.svg?branch=master)](https://travis-ci.org/GoodgameStudios/SignalsJS)
[![Code Climate](https://codeclimate.com/github/GoodgameStudios/SignalsJS/badges/gpa.svg)](https://codeclimate.com/github/GoodgameStudios/SignalsJS)
[![Test Coverage](https://codeclimate.com/github/GoodgameStudios/SignalsJS/badges/coverage.svg)](https://codeclimate.com/github/GoodgameStudios/SignalsJS/coverage)
[![npm version](https://badge.fury.io/js/signals.js.svg)](https://badge.fury.io/js/signals.js)
[![Greenkeeper badge](https://badges.greenkeeper.io/GoodgameStudios/SignalsJS.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/signals.js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/signals.js/)
[![NPM](https://nodei.co/npm-dl/signals.js.png?months=9&height=3)](https://nodei.co/npm/signals.js/)


TypeScript port of [AS3 Signals](https://github.com/robertpenner/as3-signals).
[13kb compressed](dist/signals.min.js).

Usage
---

```ts
import { Signal } from "signals.js";
var signal = new Signal();

signal.add(data => {
  console.log(data.message);
});

signal.dispatch({ message: "hello signal!" });
```

License
---

[MIT](LICENSE.md)
