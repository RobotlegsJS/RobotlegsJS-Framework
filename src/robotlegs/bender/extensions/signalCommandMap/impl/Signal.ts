import { injectable, ICommand } from "robotlegs";

import {
  ISignal,
  IListener
} from "../api/ISignal";

@injectable()
export class Signal implements ISignal {
  private listeners: IListener[] = [];

  public add(commandOrCallback: any, context?: any): number {
    let isCommand = (commandOrCallback.prototype.execute !== undefined);

    return this.listeners.push(<IListener>{
      fn: commandOrCallback,
      ctx: context,
      ctor: isCommand
    });
  }

  public addOnce(commandOrCallback: any, context?: any): void {
    let listener = (...args: any[]) => {
      commandOrCallback.apply(context, ...args);
      this.remove(commandOrCallback);
    };

    // keep reference to callback directly to be able to check on #remove
    // method
    (<any>listener)._once = commandOrCallback;
    this.add(listener, context);
  }

  public remove(commandOrCallback: any): boolean {
    for (let i = 0; i < this.listeners.length; i++) {
      if (this.listeners[i].fn === commandOrCallback ||
          this.listeners[i].fn._once === commandOrCallback) {
        this.listeners.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public removeAll(): boolean {
    if (this.listeners.length > 0) {
      this.listeners.length = 0;
      return true;
    }
    return false;
  }

  public dispatch(...args: any[]): void {
    for (let i = 0; i < this.listeners.length; i++) {
      this.run(this.listeners[i], ...args);
    }
  }

  public get numItems(): number {
    return this.listeners.length;
  }

  private run(listener: IListener, ...args: any[]): void {
    if (listener.ctor) {
      // instantiate and call command
      let command: ICommand = new listener.fn();
      command.execute.apply(command, args);

    } else {
      // callback
      (<Function>listener.fn).apply(listener.ctx, args);
    }
  }
}
