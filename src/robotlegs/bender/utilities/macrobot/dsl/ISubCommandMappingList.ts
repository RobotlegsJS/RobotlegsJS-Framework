// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommand } from "@robotlegsjs/core";

import { ISubCommandMapping } from "../api/ISubCommandMapping";

export interface ISubCommandMappingList {
    addMapping(mapping: ISubCommandMapping): void;

    removeMapping(mapping: ISubCommandMapping): void;

    removeMappingsFor(commandClass: IClass<ICommand>): void;

    removeAllMappings(): void;

    getList(): ISubCommandMapping[];
}
