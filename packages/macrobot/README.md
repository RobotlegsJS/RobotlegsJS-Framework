# RobotlegsJS Macrobot

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.com/RobotlegsJS/RobotlegsJS-Macrobot.svg?branch=master)](https://travis-ci.com/RobotlegsJS/RobotlegsJS-Macrobot)
[![codebeat badge](https://codebeat.co/badges/b94a4b05-0483-4add-afad-0850a587872d)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-macrobot-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/46031a693884b3c45506/maintainability)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Macrobot/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/46031a693884b3c45506/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Macrobot/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fmacrobot.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fmacrobot)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Macrobot.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**Macrobot** is a macro command utility for [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS) which provides the ability to execute batches of commands in sequential or parallel fashion. It was originally implemented by [Alessandro Bianco](https://github.com/alebianco) in [AS3](https://github.com/alebianco/robotlegs-utilities-macrobot) and now is
ported to [TypeScript](https://www.typescriptlang.org).

## Introduction

While using [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS) and encapsulating your business logic inside commands, you may find yourself in a situation where you wish to batch commands, instead of relying on events to trigger every step.

**Macrobot** simplifies the process and provide two ways to group commands:

- **Sequence**: The commands will be executed in order one after the other. A command will not be executed until the previous one is complete. The macro itself will not be complete until all its commands are complete.

- **Parallel**: The commands will be executed as quickly as possible, with no regards to the order in which they were registered. The macro itself will not be complete until all its commands are complete.

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/macrobot --save-prod
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/macrobot
```

## Usage

To create a macro command, extend one of the two classes Macrobot provides: `SequenceMacro` or `ParallelMacro`.
Override the `prepare()` method and add sub commands by calling `add()` specifying the command class to use.
At the appropriate time, the command will be created, instantiated by satisfying the injection points and then executed.
This automated process of instantiation, injection, and execution is very similar to how commands are normally prepared and executed in RobotlegsJS.

You could use _Guards_ and _Hooks_ as you would normally use with regular commands to control the execution workflow.
Additionally you could use the `withPayloads()` method to add some data that can be used to satisfy the injection points of the sub commands.
The data provided will be available to the guards and hooks applied to the sub command as well.

Here's an example of a simple sequential macro:

```typescript
import { injectable } from "@robotlegsjs/core";

import { SequenceMacro } from "@robotlegsjs/macrobot";

@injectable()
export class MyMacro extends SequenceMacro {
    public prepare(): void {
        this.add(CommandA);
        this.add(CommandB);
        this.add(CommandC);
    }
}
```

And here's an example of a simple parallel macro:

```typescript
import { injectable } from "@robotlegsjs/core";

import { ParallelMacro } from "@robotlegsjs/macrobot";

@injectable()
export class MyMacro extends ParallelMacro {
    public prepare(): void {
        this.add(AwaitForCommand).withPayloads(25);
        this.add(AwaitForCommand).withPayloads(50);
        this.add(AwaitForCommand).withPayloads(75);
    }
}
```

### Using Guards

Guards are used to approve or deny the execution of one of the subcommands.

```typescript
import { injectable, IGuard } from "@robotlegsjs/core";

import { SequenceMacro } from "@robotlegsjs/macrobot";

@injectable()
export class DailyRoutine extends SequenceMacro {
    public prepare() {
        this.add(Work);
        this.add(Party).withGuards(IsFriday); // It will only party on fridays
        this.add(Sleep);
    }
}

@injectable()
class IsFriday implements IGuard {
    public approve():boolean {
        return (new Date()).getDay() === 5;
    }
}
```

### Using Hooks

Hooks run before the subcommands. They are typically used to run custom actions based on environmental conditions.
Hooks will run only if the applied Guards approve the execution of the command.

```typescript
import { inject, injectable, IGuard, IHook } from "@robotlegsjs/core";

import { SequenceMacro } from "@robotlegsjs/macrobot";

@injectable()
export class DailyRoutine extends SequenceMacro {
    public prepare() {
        this.add(Work);
        this.add(Party).withGuards(IsFriday); // It will only party on fridays
        this.add(Sleep).withHook(GoToHome); // Try to avoid sleeping at the office or the pub
    }
}

@injectable()
class IsFriday implements IGuard {
    public approve():boolean {
        return (new Date()).getDay() === 5;
    }
}

@injectable()
class GoToHome implements IHook {
    @inject(Person)
    public me: Person;

    public hook():void {
        this.me.goHome();
    }
}
```

### Using Payloads

Payloads are used to temporary inject some data, which would not be available otherwise, and make it available to the subcommand, it's guards and it's hooks.

You can pass the data to be injected directly to the `withPayloads()` method, for a normal injection.

```typescript
import { inject, injectable, ICommand } from "@robotlegsjs/core";

import { SequenceMacro } from "@robotlegsjs/macrobot";

@injectable()
export class Macro extends SequenceMacro {
    public prepare() {
        const data: SomeModel = new SomeModel();

        this.add(Action).withPayloads(data);
    }
}

@injectable()
class Action implements ICommand {

    @inject(SomeModel)
    public data: SomeModel;

    public execute():void {
        this.data.property = "value";
    }
}
```

Or you can use the `SubCommandPayload` class to create a more complex injection.

```typescript
import { inject, injectable, ICommand } from "@robotlegsjs/core";

import { SequenceMacro, SubCommandPayload } from "@robotlegsjs/macrobot";

@injectable()
export class Macro extends SequenceMacro {

    public prepare() {
        const data: SomeModel = new SomeModel();
        const payload: SubCommandPayload = new SubCommandPayload(data);

        payload.
            .withName("mydata")
            .ofType(IModel);

        this.add(Action).withPayloads(payload);
	}
}

@injectable()
class Action implements ICommand {
    @inject(IModel) @named("mydata")
    public data: IModel;

    public function execute():void {
        this.data.property = "value";
	}
}
```

### Asynchronous commands

While Macrobot can work with synchronous commands, it is most effective when you have to deal with asynchronous ones.
Your sub command may wait for a response from a server or for user interaction before being marked as complete.
In this case you command can subclass Macrobot's AsyncCommand and call `dispatchComplete()` when it should be marked as complete.
`dispatchComplete()` receives a single parameter which reports whether the subcommand completed successfully.

Here's an example of a simulated asynchronous sub command:

```typescript
import { injectable, inject } from "@robotlegsjs/core";

import { AsyncCommand, SequenceMacro } from "@robotlegsjs/macrobot";

@injectable()
export class DelayCommand extends AsyncCommand {
    @inject(Number)
    protected _delay: number;

    public execute(): void {
        setTimeout(this.onTimeout.bind(this), this._delay);
    }

    protected onTimeout(): void {
        this.dispatchComplete(true);
    }
}

@injectable()
export class MyMacro extends SequenceMacro {

    public prepare():void {
        this.add(DelayCommand).withPayloads(50);
        this.add(DelayCommand).withPayloads(100);

        this.registerCompleteCallback(this.onComplete.bind(this));
    }

    protected onComplete(success): void {
        console.log("All commands have been executed!");
    }
}
```

### Atomic execution

For sequential macros, when the **atomic** property is set to **false** (it is **true** by default) and one of the sub commands dispatches a failure (using `dispatchComplete(false)`), subsequent sub commands will not be executed and the macro itself will dispatch failure.

Here's an example of a non atomic sequence:

```typescript
import { injectable, inject } from "@robotlegsjs/core";

import { SequenceMacro, AsyncCommand } from "@robotlegsjs/macrobot";

@injectable()
export class NonAtomicSequenceCommand extends SequenceMacro {
    public prepare(): void {
        this.atomic = false;

        this.add(DelayAsyncCommand).withPayloads(25, true);
        this.add(DelayAsyncCommand).withPayloads(50, false);
        this.add(DelayAsyncCommand).withPayloads(750, false);
        this.add(DelayAsyncCommand).withPayloads(100, false);
    }
}

@injectable()
class DelayAsyncCommand extends AsyncCommand {
    @inject(Number)
    protected _delay: number;

    @inject(Boolean)
    protected _succeed: boolean;

    public execute(): void {
        setTimeout(this.onTimeout.bind(this), this._delay);
    }

    protected onTimeout(): void {
        this.dispatchComplete(this._succeed);
    }
}
```

In the example above, the `DelayAsyncCommand` will be executed only two times, since the second execution will report a **failure** and all remaining
mappings will be ignored.

This behaviour does not apply to **parallel commands**.

## Macro Command Triggers

Macro commands can be triggered by **Events** or **Signals**. In both cases, it is common to have to send payloads to the macro command or sub-commands
through the **Event** or **Signal** trigger.

The macro command can capture the **CommandPayload** provided by the **CommandExecutor** and map it into the context of the sub-commands.

### Events

The **Event** class from `@robotlegsjs/core` package can send parameters through the optional `data` property. In more complex cases, you can create your
own **CustomEvent** class that extends the **Event** class, adding as many payloads as you wish.

When dispatching an event, the **IEventCommandMap** will map the triggered **Event** into the context of the macro command,
allowing you to access it from inside the macro, from inside guards and hooks or even from inside the context of each sub-command.

Here's an example of a macro command that will load all the assets for your application based on the options of each user.
In this case, the user can disable the sound system through user options. When loading the assets, you don't need to load the sound files when the **muted** option is enabled.

```typescript
import { inject, IEventCommandMap, IEventDispatcher } from "@robotlegsjs/core";

import { LoadAssetsMacro } from "./commands/LoadAssetsMacro";

import { AssetsEvent } from "./events/AssetsEvent";

export class LoadAssets {
    @inject(IEventCommandMap)
    protected _eventCommandMap: IEventCommandMap;

    @inject(IEventDispatcher)
    protected _eventDispatcher: IEventDispatcher;

    public loadAssets(): void {
        this._eventCommandMap.map(AssetsEvent.LOAD_ASSETS, AssetsEvent).toCommand(LoadAssetsMacro);

        let assetsEvent: AssetsEvent = new AssetsEvent(AssetsEvent.LOAD_ASSETS);
        assetsEvent.muted = false;

        this._eventDispatcher.dispatchEvent(assetsEvent);
    }
}
```

Since the `AssetsEvent` will be mapped into the context of the macro command, you can use it on a `Guard` that can allow the execution of the `LoadSoundsCommand`
only when the sound system is not muted:

```typescript
import { inject, injectable } from "@robotlegsjs/core";

import { ParallelMacro } from "@robotlegsjs/macrobot";

import { LoadDataCommand } from "./commands/LoadDataCommand";
import { LoadSpriteSheetsCommand } from "./commands/LoadSpriteSheetsCommand";
import { LoadSoundsCommand } from "./commands/LoadSoundsCommand";

@injectable()
export class LoadAssetsMacro extends ParallelMacro {
    public prepare(): void {
        // load data for all users
        this.add(LoadDataCommand);

        // load sprite sheets for all users
        this.add(LoadSpriteSheetsCommand);

        // load sounds only for users who enabled sound system
        this.add(LoadSoundsCommand).withGuards(NotMuted);
    }
}

@injectable()
class NotMuted implements IGuard {
    @inject(AssetsEvent)
    protected _assetsEvent: AssetsEvent;

    public approve():boolean {
        return !_assetsEvent.muted;
    }
}
```

### Signals

The **Signal** class from `@robotlegsjs/signals` package can be extended to send parameters through the `dispatch` trigger.

When dispatching an signal, the **ISignalCommandMap** from `@robotlegsjs/signalcommandmap` package will map the payloads into the context of the macro command,
allowing you to access them from inside the macro, from inside guards and hooks or even from inside the context of each sub-command.

Here's an example of a macro command that will load all the assets for your application based on the options of each user.
In this case, the user can disable the sound system through user options. When loading the assets, you don't need to load the sound files when the **muted** option is enabled.

The `AssetsSignal` extends the `Signal` class adding an `Boolean` as payload:

```typescript
import { injectable } from "@robotlegsjs/core";

import { Signal } from "@robotlegsjs/signals";

@injectable()
export class AssetsSignal extends Signal {
    constructor() {
        super(Boolean);
    }
}
```

Then you can map the `AssetsSignal` to the `LoadAssetsMacro` command using the `ISignalCommandMap` extension:

```typescript
import { inject, IInjector } from "@robotlegsjs/core";

import { ISignalCommandMap } from "@robotlegsjs/signalcommandmap";

import { LoadAssetsMacro } from "./commands/LoadAssetsMacro";

import { AssetsSignal } from "./signals/AssetsSignal";

export class LoadAssets {
    @inject(IInjector)
    protected _injector: IInjector;

    @inject(ISignalCommandMap)
    protected _signalCommandMap: ISignalCommandMap;

    public loadAssets(): void {
        this._signalCommandMap.map(AssetsSignal).toCommand(LoadAssetsMacro);

        let assetsSignal: AssetsSignal = this._injector.get(AssetsSignal);

        // dispatch the signal telling the macro command that the muted option is disabled
        assetsSignal.dispatch(false);
    }
}
```

Since the payload of the `AssetsSignal` will be mapped into the context of the macro command, you can use it on a `Guard` that can allow the execution of the `LoadSoundsCommand`
only when the sound system is not muted:

```typescript
import { inject, injectable } from "@robotlegsjs/core";

import { ParallelMacro } from "@robotlegsjs/macrobot";

import { LoadDataCommand } from "./commands/LoadDataCommand";
import { LoadSpriteSheetsCommand } from "./commands/LoadSpriteSheetsCommand";
import { LoadSoundsCommand } from "./commands/LoadSoundsCommand";

@injectable()
export class LoadAssetsMacro extends ParallelMacro {
    public prepare(): void {
        // load data for all users
        this.add(LoadDataCommand);

        // load sprite sheets for all users
        this.add(LoadSpriteSheetsCommand);

        // load sounds only for users who enabled sound system
        this.add(LoadSoundsCommand).withGuards(NotMuted);
    }
}

@injectable()
class NotMuted implements IGuard {
    @inject(Boolean)
    protected _muted: Boolean;

    public approve():boolean {
        return !this._muted;
    }
}
```

## Contributing

If you want to contribute to the project refer to the [contributing document](CONTRIBUTING.md) for guidelines.

## RobotlegsJS Macrobot for enterprise

Available as part of the Tidelift Subscription

The maintainers of [@robotlegsjs/macrobot](https://github.com/RobotlegsJS/RobotlegsJS-Macrobot) and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-robotlegsjs-macrobot?utm_source=npm-robotlegsjs-macrobot&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)

## License

[MIT](LICENSE)
