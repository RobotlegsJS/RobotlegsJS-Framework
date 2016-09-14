// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IInjector,
    ICommand
} from "robotlegs";

import { SubCommandMapping } from "./SubCommandMapping";

export class SubCommandInstanceMapping extends SubCommandMapping {

    private _instance: ICommand;

    constructor(instance: ICommand) {
        super(instance);

        this._instance = instance;
    }

    public getOrCreateCommandInstance(injector: IInjector): ICommand {
        return this._instance;
    }
}
