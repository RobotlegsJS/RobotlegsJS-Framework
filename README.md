SignalsJS
===

[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.org/RobotlegsJS/SignalsJS.svg?branch=master)](https://travis-ci.org/RobotlegsJS/SignalsJS)
[![Code Climate](https://codeclimate.com/github/RobotlegsJS/SignalsJS/badges/gpa.svg)](https://codeclimate.com/github/RobotlegsJS/SignalsJS)
[![Test Coverage](https://codeclimate.com/github/RobotlegsJS/SignalsJS/badges/coverage.svg)](https://codeclimate.com/github/RobotlegsJS/SignalsJS/coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fsignals.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fsignals)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/SignalsJS.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

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
