RobotlegsJS Macrobot
===

[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Macrobot.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Macrobot)
[![codebeat badge](https://codebeat.co/badges/412a0f0c-3e20-40a5-9543-3384e87e2730)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-macrobot-master)
[![Test Coverage](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Macrobot/badges/coverage.svg)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Macrobot/coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fmacrobot.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fmacrobot)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Macrobot.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

**Macrobot** is a macro command utility for Robotlegs which provides the ability to execute batches of commands in sequential or parallel fashion.

**Macrobot** was originally implemented by [Alessandro Bianco](https://github.com/alebianco) in [AS3](https://github.com/alebianco/robotlegs-utilities-macrobot).

Introduction
---

While using [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS) and encapsulating your business logic inside commands, you may find yourself in a situation where you wish to batch commands, instead of relying on events to trigger every step.

**Macrobot** simplifies this process and provide two way to group commands:

- **Sequence**: The commands will be executed in order one after the other. A command will not be executed until the previous one is complete. The macro itself will not be complete until all its commands are complete.

- **Parallel**: The commands will be executed as quickly as possible, with no regards on the order in which they were registered. The macro itself will not be complete until all its commands are complete.

Installation
---

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/macrobot
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/macrobot

Usage
---

To create a macro command, extend on the two classes Macrobot provides: `ParallelMacro` or `SequenceMacro`.
Override the `prepare()` method and add sub commands by calling `addSubCommand()` specifying the command class to use.
At the appropriate time the command will be created, initiated by satisfying the injection points and then executed.
This automated process of instantiation, injection, and execution is very similar to how commands are normally prepared and executed in RobotlegsJS.

You could use _Guards_ and _Hooks_ as you would normally use with regular commands to control the execution workflow.
Additionally you could use the `withPayloads()` method to add some data that can be used to satisfy the injection points of the sub commands. The data provided will be available to the guards and hooks applied to the sub command as well.

Here's an example of a simple sequential macro:

```typescript
public class MyMacro extends SequenceMacro {
	override public function prepare() {
		add(CommandA);
		add(CommandB);
		add(CommandC);
	}
}
```

### Using Guards

Guards are used to approve or deny the execution of one of the subcommands.

```typescript
public class DailyRoutine extends SequenceMacro {
	override public function prepare() {
		add(Work);
		add(Party).withGuards(IsFriday); // It will only party on fridays
		add(Sleep);
	}
}

public class IsFriday implements IGuard {
	public funciton approve():Boolean {
		return new Date().day == 5;
	}
}
```

### Using Hooks

Hooks run before the subcommands. They are typically used to run custom actions based on environmental conditions.
Hooks will run only if the applied Guards approve the execution of the command.

```typescript
public class DailyRoutine extends SequenceMacro {
	override public function prepare() {
		add(Work);
		add(Party).withGuards(IsFriday); // It will only party on fridays
		add(Sleep).withHook(GoToHome); // Try to avoid sleeping at the office or the pub
	}
}

public class IsFriday implements IHook {
	[Inject] public var me:Person;
	public funciton hook():void {
		me.goHome();
	}
}
```

### Using Payloads

Payloads are used to temporary inject some data, which would not be available otherwise, and make it available to the subcommand, it's guards and it's hooks.

You can use pass the data to be injected directly to the `withPayloads()` method, for a normal injection.

```typescript
public class Macro extends SequenceMacro {
	override public function prepare() {
		const data:SomeModel = new SomeModel()
		add(Action).withPayloads(data);
	}
}

public class Action implements ICommand {
	[Inject] public var data:SomeModel;
	public function execute():void {
		data.property = 'value'
	}
}
```

Or you can use the `SubCommandPayload` class to create a more complex injection.

```typescript
public class Macro extends SequenceMacro {
	override public function prepare() {
		const data:SomeModel = new SomeModel()
		const payload:SubCommandPayload = new SubCommandPayload(data).withName('mydata').ofClass(IModel)
		add(Action).withPayloads(payload);
	}
}

public class Action implements ICommand {
	[Inject(name='mydata')] public var data:IModel;
	public function execute():void {
		data.property = 'value'
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
public class DelayCommand extends AsyncCommand     {
   protected var timer:Timer;
   override public function execute():void {
   	super.execute();
   	timer = new Timer(1000, 1);
   	timer.addEventListener(TimerEvent.TIMER_COMPLETE, timerCompleteHandler);
   	timer.start();
   }
   protected function timerCompleteHandler(event:TimerEvent):void {
   	timer.removeEventListener(TimerEvent.TIMER_COMPLETE, timerCompleteHandler);
   	timer = null;
   	dispatchComplete(true);
   }
}

public class MyMacro extends SequenceMacro     {
   override public function prepare():void {
   	add(DelayCommand)
   	add(OtherCommand)
   	registerCompleteCallback(onComplete)
   }
   protected function onComplete(success):void {
   	trace('all commands have been executed')
   }
}
```

### Atomic execution

For sequential macros, when the_ atomic_ property is set to **false** (it is **true** by default) and one of the sub commands dispatches a failure (using `dispatchComplete(false)`), subsequent sub commands will not be executed and the macro itself will dispatch failure.

This behaviour does not apply to parallel commands.

Contributing
---

If you want to contribute to the project refer to the [contributing document](CONTRIBUTING.md) for guidelines.

License
---

[MIT](LICENSE)