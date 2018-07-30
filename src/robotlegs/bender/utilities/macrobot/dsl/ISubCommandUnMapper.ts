// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommand } from "@robotlegsjs/core";

export interface ISubCommandUnMapper {
    remove(commandClass: IClass<ICommand>): void;
}
