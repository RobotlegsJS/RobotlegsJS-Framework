// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ISubCommandMapping } from "../api/ISubCommandMapping";

export interface ISubCommandMappingList {

    addMapping(mapping: ISubCommandMapping): void;

    removeMapping(mapping: ISubCommandMapping): void;

    removeMappingsFor(commandClass: any): void;

    removeAllMappings(): void;

    getList(): ISubCommandMapping[];
}
