// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, IInjector, ICommand } from "@robotlegsjs/core";

import { SubCommandMapping } from "./SubCommandMapping";

export class SubCommandInstanceMapping extends SubCommandMapping {
    private _instance: ICommand;

    constructor(instance: ICommand) {
        super(<IClass<ICommand>>instance.constructor);

        this._instance = instance;
    }

    public getOrCreateCommandInstance(injector: IInjector): ICommand {
        return this._instance;
    }
}
