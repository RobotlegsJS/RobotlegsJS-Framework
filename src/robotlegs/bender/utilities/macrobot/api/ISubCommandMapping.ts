// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, IInjector, ICommand } from "@robotlegsjs/core";

import { ISubCommandPayload } from "./ISubCommandPayload";

export interface ISubCommandMapping {
    commandClass: IClass<ICommand>;

    guards: any[];

    hooks: any[];

    payloads: ISubCommandPayload<any>[];

    getOrCreateCommandInstance(injector: IInjector): ICommand;
}
