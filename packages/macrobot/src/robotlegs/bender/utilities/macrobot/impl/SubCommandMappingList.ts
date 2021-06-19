// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ICommand } from "@robotlegsjs/core";
import { ISubCommandMapping } from "../api/ISubCommandMapping";
import { ISubCommandMappingList } from "../dsl/ISubCommandMappingList";

export class SubCommandMappingList implements ISubCommandMappingList {
    private _mappings: ISubCommandMapping[] = [];
    private _mappingsByCommand: Map<IClass<ICommand>, ISubCommandMapping[]> = new Map<
        IClass<ICommand>,
        ISubCommandMapping[]
    >();

    public getList(): ISubCommandMapping[] {
        return this._mappings.concat();
    }

    public addMapping(mapping: ISubCommandMapping): void {
        this._storeMapping(mapping);
    }

    public removeMapping(mapping: ISubCommandMapping): void {
        this._deleteMapping(mapping);
    }

    public removeMappingsFor(commandClass: IClass<ICommand>): void {
        if (this._mappingsByCommand.has(commandClass)) {
            let subCommandList: ISubCommandMapping[] = this._mappingsByCommand
                .get(commandClass)
                .concat();
            while (subCommandList.length > 0) {
                this._deleteMapping(subCommandList.pop());
            }
        }
    }

    public removeAllMappings(): void {
        if (this._mappings.length > 0) {
            let subCommandList: ISubCommandMapping[] = this._mappings.concat();
            while (subCommandList.length > 0) {
                this._deleteMapping(subCommandList.pop());
            }
        }
    }

    private _storeMapping(mapping: ISubCommandMapping): void {
        let subCommandList: ISubCommandMapping[];

        if (!this._mappingsByCommand.has(mapping.commandClass)) {
            subCommandList = [];
            this._mappingsByCommand.set(mapping.commandClass, subCommandList);
        } else {
            subCommandList = this._mappingsByCommand.get(mapping.commandClass);
        }

        subCommandList.push(mapping);

        this._mappings.push(mapping);
    }

    private _deleteMapping(mapping: ISubCommandMapping): void {
        if (this._mappingsByCommand.has(mapping.commandClass)) {
            let subCommandList: ISubCommandMapping[] = this._mappingsByCommand.get(
                mapping.commandClass
            );

            // Ensure that duplicates are removed
            subCommandList.concat().forEach((m: ISubCommandMapping) => {
                if (m === mapping) {
                    subCommandList.splice(subCommandList.indexOf(m), 1);
                }
            });

            if (subCommandList.length === 0) {
                this._mappingsByCommand.delete(mapping.commandClass);
            }
        }

        // Ensure that duplicates are removed
        this._mappings.concat().forEach((m: ISubCommandMapping) => {
            if (m === mapping) {
                this._mappings.splice(this._mappings.indexOf(m), 1);
            }
        });
    }
}
