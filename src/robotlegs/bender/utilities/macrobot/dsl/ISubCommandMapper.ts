// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ISubCommandConfigurator } from "./ISubCommandConfigurator";

export interface ISubCommandMapper {
    add(commandClass: any): ISubCommandConfigurator;
}
