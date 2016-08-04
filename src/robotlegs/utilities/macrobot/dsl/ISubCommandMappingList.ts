/**
 * Author:  alessandro.bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 11/06/2013 14:50
 *
 * Copyright © 2013 Alessandro Bianco
 */

import { ISubCommandMapping } from "../api/ISubCommandMapping";

export interface ISubCommandMappingList {

    addMapping(mapping: ISubCommandMapping): void;

    removeMapping(mapping: ISubCommandMapping): void;

    removeMappingsFor(commandClass: any): void;

    removeAllMappings(): void;

    getList(): ISubCommandMapping[];
}
