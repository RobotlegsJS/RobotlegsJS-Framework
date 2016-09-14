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

import { ISubCommandPayload } from "./ISubCommandPayload";

export interface ISubCommandMapping {

    commandClass: any;

    executeMethod: string;

    guards: any[];

    hooks: any[];

    payloads: ISubCommandPayload[];

    getOrCreateCommandInstance(injector: IInjector): ICommand;
}
