// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand } from "../../commandCenter/api/ICommand";
import { IClass } from "../../matching/IClass";
import { IDirectCommandMapper } from "./IDirectCommandMapper";

// eslint-disable-next-line @rushstack/typedef-var
export const IDirectCommandMap = Symbol("IDirectCommandMap");

/**
 * Maps commands for direct (manual) execution
 */
export interface IDirectCommandMap extends IDirectCommandMapper {
    /**
     * Pins a command in memory
     *
     * @param command the command instance to pin
     */
    detain(command: IClass<ICommand>): void;

    /**
     * Unpins a command instance from memory
     *
     * @param command the command instance to unpin
     */
    release(command: IClass<ICommand>): void;

    /**
     * Adds a handler to process mappings
     *
     * @param handler Function that accepts a mapping
     * @return Self
     */
    addMappingProcessor(handler: Function): IDirectCommandMap;
}
