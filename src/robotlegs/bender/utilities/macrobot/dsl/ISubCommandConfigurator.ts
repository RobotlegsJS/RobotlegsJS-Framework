// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ISubCommandPayload } from "../api/ISubCommandPayload";

export interface ISubCommandConfigurator {

    withGuards(...guards: any[]): ISubCommandConfigurator;

    withHooks(...hooks: any[]): ISubCommandConfigurator;

    withPayloads(...payloads: ISubCommandPayload[]): ISubCommandConfigurator;

    withExecuteMethod(name: String): ISubCommandConfigurator;
}
