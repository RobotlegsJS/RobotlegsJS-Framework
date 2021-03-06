// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { CommandPayload } from "./CommandPayload";
import { ICommandMapping } from "./ICommandMapping";

/**
 * @private
 */
export interface ICommandExecutor {
    /**
     * Execute a command for a given mapping
     *
     * @param mapping The Command Mapping
     * @param payload The Command Payload
     */
    executeCommand(mapping: ICommandMapping, payload?: CommandPayload): void;

    /**
     * Execute a list of commands for a given list of mappings
     *
     * @param mappings The Command Mappings
     * @param payload The Command Payload
     */
    executeCommands(mappings: ICommandMapping[], payload?: CommandPayload): void;
}
