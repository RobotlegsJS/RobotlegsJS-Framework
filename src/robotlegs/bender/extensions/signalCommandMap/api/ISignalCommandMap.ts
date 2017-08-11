// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    ICommandMapper,
    ICommandUnmapper
} from "@robotlegsjs/core";

/**
 * The Signal Command Map allows you to bind Phaser.Signal to Commands
 */
export let ISignalCommandMap = Symbol("ISignalCommandMap");
export interface ISignalCommandMap {

    /**
     * Creates a mapping for a Phaser.Signals based trigger
     * @param signalClass The concrete Phaser.Signals class
     * @return Command mapper
     */
    map(signalClass: Object): ICommandMapper;

    /**
     * Unmaps a Phaser.Signal based trigger from a command
     * @param signalClass The concrete Phaser.Signal class
     * @return Command unmapper
     */
    unmap(signalClass: Object): ICommandUnmapper;

    /**
     * Adds a handler to process mappings
     * @param handler Function that accepts a mapping
     * @return Self
     */
    addMappingProcessor(handler: Function): ISignalCommandMap;
}
