SignalsJS
===

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/Robotlegs/blob/master/packages/signals/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fsignals.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fsignals)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**SignalsJS** is a [TypeScript](https://www.typescriptlang.org/) port of [AS3 Signals](https://github.com/robertpenner/as3-signals).
[15KB compressed](dist/signals.min.js).

About
---

**Signals** are light-weight, strongly-typed messaging tools.
Wire your application with better APIs and less boilerplate than normal event systems.

Concept
---

* A **Signal** is essentially a mini-dispatcher specific to one event, with its own array of listeners.
* A **Signal** gives an event a concrete membership in a class.
* Listeners subscribe to real objects, not to string-based channels.
* Event string constants are no longer needed.
* **Signals** was originally implemented by [Robert Penner](https://github.com/robertpenner) in [AS3](https://github.com/robertpenner/as3-signals).
* **Signals** are inspired by [C# events](http://en.wikipedia.org/wiki/C_Sharp_syntax#Events) and [signals/slots](http://en.wikipedia.org/wiki/Signals_and_slots) in Qt.

Syntax
---

```typescript
// with DOM EventListener
button.addEventListener("click", onClick);

// Signal equivalent; past tense is recommended
button.clicked.add(onClicked);
```

Installation
---

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/signals
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/signals
```

Usage
---

```typescript
import { Signal } from "@robotlegsjs/signals";

let signal = new Signal();

signal.add(data => {
    console.log(data.message);
});

signal.dispatch({ message: "hello signal!" });
```

SignalsJS for enterprise
---

Available as part of the Tidelift Subscription

The maintainers of [@robotlegsjs/signals](https://github.com/RobotlegsJS/SignalsJS) and thousands of other packages are working with **Tidelift** to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-robotlegsjs-signals?utm_source=npm-robotlegsjs-signals&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

License
---

[MIT](LICENSE)
