/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import { ISubCommandPayload } from "../api/ISubCommandPayload";
import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandConfigurator } from "../dsl/ISubCommandConfigurator";

import {
    ICommand,
    IInjector
} from "robotlegs";

export class SubCommandMapping implements ISubCommandMapping, ISubCommandConfigurator {

    private _commandClass: any;
    private _executeMethod: string = "execute";

    private _guards: any[] = [];
    private _payloads: ISubCommandPayload[] = [];
    private _hooks: any[] = [];

    constructor(commandClass: any) {
        this._commandClass = commandClass;
    }

    public get commandClass(): any {
        return this._commandClass;
    }

    public get executeMethod(): string {
        return this._executeMethod;
    }

    public get guards(): any[] {
        return this._guards.slice();
    }

    public get hooks(): any[] {
        return this._hooks.slice();
    }

    public get payloads(): ISubCommandPayload[] {
        return this._payloads.slice();
    }

    public withGuards(...guards: any[]): ISubCommandConfigurator {
        this._guards = this._guards.concat(guards);
        return this;
    }

    public withHooks(...hooks: any[]): ISubCommandConfigurator {
        this._hooks = this._hooks.concat(hooks);
        return this;
    }

    public withPayloads(...payloads: ISubCommandPayload[]): ISubCommandConfigurator {
        for (let i: number = 0; i < payloads.length; i++) {
            let payload: ISubCommandPayload = payloads[i];
            this._payloads.push(payload);
        }
        return this;
    }

    public withExecuteMethod(name: string): ISubCommandConfigurator {
        this._executeMethod = name;
        return this;
    }

    public getOrCreateCommandInstance(injector: IInjector): ICommand {
        return <ICommand>injector.instantiateUnmapped(this.commandClass);
    }
}
