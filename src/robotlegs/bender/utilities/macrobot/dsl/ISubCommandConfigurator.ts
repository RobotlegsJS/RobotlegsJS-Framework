// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export interface ISubCommandConfigurator {
    withGuards(...guards: any[]): ISubCommandConfigurator;

    withHooks(...hooks: any[]): ISubCommandConfigurator;

    withPayloads(...payloads: any[]): ISubCommandConfigurator;
}
