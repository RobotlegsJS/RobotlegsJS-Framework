// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommand, IInjector, instantiateUnmapped } from "@robotlegsjs/core";

import { ISubCommandPayload } from "../api/ISubCommandPayload";
import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandConfigurator } from "../dsl/ISubCommandConfigurator";

import { SubCommandPayload } from "./SubCommandPayload";

export class SubCommandMapping implements ISubCommandMapping, ISubCommandConfigurator {
    private _commandClass: IClass<ICommand>;

    private _guards: any[] = [];
    private _payloads: ISubCommandPayload<any>[] = [];
    private _hooks: any[] = [];

    public constructor(commandClass: IClass<ICommand>) {
        this._commandClass = commandClass;
    }

    public get commandClass(): IClass<ICommand> {
        return this._commandClass;
    }

    public get guards(): any[] {
        return this._guards.slice();
    }

    public get hooks(): any[] {
        return this._hooks.slice();
    }

    public get payloads(): ISubCommandPayload<any>[] {
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

    public withPayloads(...payloads: any[]): ISubCommandConfigurator {
        payloads.forEach((payload: any) => {
            if (payload instanceof SubCommandPayload) {
                this._payloads.push(payload);
            } else {
                this._payloads.push(new SubCommandPayload(payload));
            }
        });
        return this;
    }

    public getOrCreateCommandInstance(injector: IInjector): ICommand {
        return instantiateUnmapped<ICommand>(injector, this.commandClass);
    }
}
