// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommand } from "@robotlegsjs/core";

import { ISubCommandConfigurator } from "./ISubCommandConfigurator";

export interface ISubCommandMapper {
    add(commandClass: IClass<ICommand>): ISubCommandConfigurator;
}
