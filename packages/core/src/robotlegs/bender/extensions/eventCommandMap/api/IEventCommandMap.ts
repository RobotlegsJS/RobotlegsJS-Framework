// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEvent } from "../../../events/api/IEvent";
import { ICommandMapper } from "../../commandCenter/dsl/ICommandMapper";
import { ICommandUnmapper } from "../../commandCenter/dsl/ICommandUnmapper";
import { IClass } from "../../matching/IClass";

// eslint-disable-next-line @rushstack/typedef-var
export const IEventCommandMap = Symbol("IEventCommandMap");

/**
 * The Event Command Map allows you to bind Events to Commands
 */
export interface IEventCommandMap {
    /**
     * Creates a mapping for an Event based trigger
     *
     * @param type The Event type
     * @param eventClass The concrete Event class
     * @return Command Mapper
     */
    map(type: string, eventClass?: IClass<IEvent>): ICommandMapper;

    /**
     * Unmaps an Event based trigger from a Command
     *
     * @param type The Event type
     * @param eventClass The concrete Event class
     * @return Command Unmapper
     */
    unmap(type: string, eventClass?: IClass<IEvent>): ICommandUnmapper;

    /**
     * Adds a handler to process mappings
     *
     * @param handler Function that accepts a mapping
     * @return Self
     */
    addMappingProcessor(handler: Function): IEventCommandMap;
}
