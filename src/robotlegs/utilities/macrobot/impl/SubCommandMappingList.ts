/**
 * Author:  alessandro.bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 12/06/2013 11:27
 *
 * Copyright © 2013 Alessandro Bianco
 */

import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandMappingList } from "../dsl/ISubCommandMappingList";

export class SubCommandMappingList implements ISubCommandMappingList {

    private _mappings: ISubCommandMapping[] = [];
    private _mappingByCommand: Map<any, any> = new Map<any, any>();

    public getList(): ISubCommandMapping[] {
        return this._mappings.concat();
    }

    public addMapping(mapping: ISubCommandMapping): void {
        this.storeMapping(mapping);
    }

    public removeMapping(mapping: ISubCommandMapping): void {
        this.deleteMapping(mapping);
    }

    public removeMappingsFor(commandClass: any): void {
        if (this._mappingByCommand[commandClass]) {
            let list: ISubCommandMapping[] = this._mappingByCommand[commandClass];
            let length: number = list.length;
            while (length--) {
                this.deleteMapping(list[length]);
            }
            delete this._mappingByCommand[commandClass];
        }
    }

    public removeAllMappings(): void {
        if (this._mappings.length > 0) {
            let list: ISubCommandMapping[] = this._mappings.concat();
            let length: number = list.length;
            while (length--) {
                this.deleteMapping(list[length]);
            }
        }
    }

    private storeMapping(mapping: ISubCommandMapping): void {
        if (!this._mappingByCommand[mapping.commandClass]) {
            this._mappingByCommand[mapping.commandClass] = new Array<ISubCommandMapping>();
        }
        this._mappingByCommand[mapping.commandClass].push(mapping);
        this._mappings.push(mapping);
    }

    private deleteMapping(mapping: ISubCommandMapping): void {
        if (this._mappingByCommand[mapping.commandClass]) {
            this._mappingByCommand[mapping.commandClass].splice(this._mappings.indexOf(mapping), 1);
            if (this._mappingByCommand[mapping.commandClass].length === 0) {
                delete this._mappingByCommand[mapping.commandClass];
            }
        }
        this._mappings.splice(this._mappings.indexOf(mapping), 1);
    }
}
