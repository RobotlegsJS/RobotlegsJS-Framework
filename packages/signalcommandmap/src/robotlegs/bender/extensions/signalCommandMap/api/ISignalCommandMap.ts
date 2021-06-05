// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommandMapper, ICommandUnmapper } from "@robotlegsjs/core";

import { ISignal } from "@robotlegsjs/signals";

// eslint-disable-next-line @rushstack/typedef-var
export const ISignalCommandMap = Symbol("ISignalCommandMap");

/**
 * The Signal Command Map allows you to bind Signals to Commands
 */
export interface ISignalCommandMap {
    /**
     * Creates a mapping for a Signal based trigger
     *
     * @param signalClass The concrete Signal class
     * @return Command mapper
     */
    map(signalClass: IClass<ISignal>): ICommandMapper;

    /**
     * Unmaps a Signal based trigger from a command
     *
     * @param signalClass The concrete Signal class
     * @return Command unmapper
     */
    unmap(signalClass: IClass<ISignal>): ICommandUnmapper;

    /**
     * Adds a handler to process mappings
     *
     * @param handler Function that accepts a mapping
     * @return Self
     */
    addMappingProcessor(handler: Function): ISignalCommandMap;
}
