# RobotlegsJS EventEmitter3

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-EventEmitter3/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.org/RobotlegsJS/RobotlegsJS-EventEmitter3.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-EventEmitter3)
[![codebeat badge](https://codebeat.co/badges/d5162c9e-5040-4bf1-a756-77612acfdb1f)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-eventemitter3-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/c8ef7ccb9caade45214c/maintainability)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-EventEmitter3/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c8ef7ccb9caade45214c/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-EventEmitter3/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Feventemitter3.svg)](https://badge.fury.io/js/%40robotlegsjs%2Feventemitter3)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-EventEmitter3.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/eventemitter3 --save
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/eventemitter3
````

The [EventEmitter3](https://github.com/primus/eventemitter3) dependency is added as **peerDependencies**,
allowing the final user to choose the desired version of the [eventemitter3](https://www.npmjs.com/package/eventemitter3) library on each project.

The `@robotlegsjs/eventemitter3` package is compatible with any version of `eventemitter3` library.

As example, when you would like to use the version `3.1.0` of `eventemitter3` library, you can run:

```bash
npm install eventemitter3@3.1.0 reflect-metadata --save
```

or

```bash
yarn add eventemitter3@3.1.0 reflect-metadata
```

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [eventemitter3](https://github.com/primus/eventemitter3)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## License

[MIT](LICENSE)
