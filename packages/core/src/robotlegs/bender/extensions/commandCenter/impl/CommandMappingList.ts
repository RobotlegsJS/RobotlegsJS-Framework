// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ILogger } from "../../../framework/api/ILogger";
import { IClass } from "../../matching/IClass";
import { ICommand } from "../api/ICommand";
import { ICommandMapping } from "../api/ICommandMapping";
import { ICommandMappingList } from "../api/ICommandMappingList";
import { ICommandTrigger } from "../api/ICommandTrigger";

export type CommandMappingCompareFunction = (a: ICommandMapping, b: ICommandMapping) => number;

/**
 * @private
 */
export class CommandMappingList implements ICommandMappingList {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappingsByCommand: Map<IClass<ICommand>, ICommandMapping> = new Map<
        IClass<ICommand>,
        ICommandMapping
    >();

    private _mappings: ICommandMapping[] = [];

    private _trigger: ICommandTrigger;

    private _processors: Function[];

    private _logger: ILogger;

    private _compareFunction: CommandMappingCompareFunction;

    private _sorted: boolean;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Create a command mapping list
     *
     * @param trigger The trigger that owns this list
     * @param processors A reference to the mapping processors for this command map
     * @param logger Optional logger
     */
    public constructor(trigger: ICommandTrigger, processors: Function[], logger?: ILogger) {
        this._trigger = trigger;
        this._processors = processors;
        this._logger = logger;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public getList(): ICommandMapping[] {
        if (!this._sorted) {
            this._sortMappings();
        }
        return this._mappings.concat();
    }

    /**
     * @inheritDoc
     */
    public withSortFunction(sorter: CommandMappingCompareFunction): ICommandMappingList {
        this._sorted = false;
        this._compareFunction = sorter;
        return this;
    }

    /**
     * @inheritDoc
     */
    public addMapping(mapping: ICommandMapping): void {
        this._sorted = false;
        this._applyProcessors(mapping);
        let oldMapping: ICommandMapping = this._mappingsByCommand.get(mapping.commandClass);
        if (oldMapping) {
            this._overwriteMapping(oldMapping, mapping);
        } else {
            this._storeMapping(mapping);
            if (this._mappings.length === 1) {
                this._trigger.activate();
            }
        }
    }

    /**
     * @inheritDoc
     */
    public removeMapping(mapping: ICommandMapping): void {
        if (this._mappingsByCommand.has(mapping.commandClass)) {
            this._deleteMapping(mapping);
            if (this._mappings.length === 0) {
                this._trigger.deactivate();
            }
        }
    }

    /**
     * @inheritDoc
     */
    public removeMappingFor(commandClass: IClass<ICommand>): void {
        let mapping: ICommandMapping = this._mappingsByCommand.get(commandClass);
        if (mapping) {
            this.removeMapping(mapping);
        }
    }

    /**
     * @inheritDoc
     */
    public removeAllMappings(): void {
        if (this._mappings.length > 0) {
            let list: ICommandMapping[] = this._mappings.concat();
            let length: number = list.length;
            while (length--) {
                this._deleteMapping(list[length]);
            }
            this._trigger.deactivate();
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _storeMapping(mapping: ICommandMapping): void {
        this._mappingsByCommand.set(mapping.commandClass, mapping);
        this._mappings.push(mapping);
        if (this._logger) {
            this._logger.debug("{0} mapped to {1}", [this._trigger, mapping]);
        }
    }

    private _deleteMapping(mapping: ICommandMapping): void {
        this._mappingsByCommand.delete(mapping.commandClass);
        this._mappings.splice(this._mappings.indexOf(mapping), 1);
        if (this._logger) {
            this._logger.debug("{0} unmapped from {1}", [this._trigger, mapping]);
        }
    }

    private _overwriteMapping(oldMapping: ICommandMapping, newMapping: ICommandMapping): void {
        if (this._logger) {
            this._logger.warn(
                "{0} already mapped to {1}\n" +
                    "If you have overridden this mapping intentionally you can use 'unmap()' " +
                    "prior to your replacement mapping in order to avoid seeing this message.\n",
                [this._trigger, oldMapping]
            );
        }
        this._deleteMapping(oldMapping);
        this._storeMapping(newMapping);
    }

    private _sortMappings(): void {
        if (this._compareFunction != null) {
            this._mappings = this._mappings.sort(this._compareFunction);
        }
        this._sorted = true;
    }

    private _applyProcessors(mapping: ICommandMapping): void {
        this._processors.forEach((processor: Function) => {
            processor(mapping);
        });
    }
}
