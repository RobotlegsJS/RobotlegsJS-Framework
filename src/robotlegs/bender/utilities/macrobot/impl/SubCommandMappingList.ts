// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommand } from "@robotlegsjs/core";

import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandMappingList } from "../dsl/ISubCommandMappingList";

export class SubCommandMappingList implements ISubCommandMappingList {
    private _mappings: ISubCommandMapping[] = [];
    private _mappingByCommand: Map<
        IClass<ICommand>,
        ISubCommandMapping[]
    > = new Map<IClass<ICommand>, ISubCommandMapping[]>();

    public getList(): ISubCommandMapping[] {
        return this._mappings.concat();
    }

    public addMapping(mapping: ISubCommandMapping): void {
        this.storeMapping(mapping);
    }

    public removeMapping(mapping: ISubCommandMapping): void {
        this.deleteMapping(mapping);
    }

    public removeMappingsFor(commandClass: IClass<ICommand>): void {
        if (this._mappingByCommand.has(commandClass)) {
            let list: ISubCommandMapping[] = this._mappingByCommand.get(
                commandClass
            );
            let length: number = list.length;
            while (length--) {
                this.deleteMapping(list[length]);
            }
            this._mappingByCommand.delete(commandClass);
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
        let mappingByCommand = this._mappingByCommand.get(mapping.commandClass);
        if (!mappingByCommand) {
            mappingByCommand = [];
            this._mappingByCommand.set(mapping.commandClass, mappingByCommand);
        }
        mappingByCommand.push(mapping);
        this._mappings.push(mapping);
    }

    private deleteMapping(mapping: ISubCommandMapping): void {
        if (this._mappingByCommand.has(mapping.commandClass)) {
            let mappingByCommand = this._mappingByCommand.get(
                mapping.commandClass
            );
            mappingByCommand.splice(this._mappings.indexOf(mapping), 1);
            if (mappingByCommand.length === 0) {
                this._mappingByCommand.delete(mapping.commandClass);
            }
        }
        this._mappings.splice(this._mappings.indexOf(mapping), 1);
    }
}
