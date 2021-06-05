// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ILogger, ITypeFilter } from "@robotlegsjs/core";

import { IStateMediatorMapping } from "../api/IStateMediatorMapping";
import { IStateMediatorConfigurator } from "../dsl/IStateMediatorConfigurator";
import { IStateMediatorMapper } from "../dsl/IStateMediatorMapper";
import { IStateMediatorUnmapper } from "../dsl/IStateMediatorUnmapper";

import { StateMediatorStateHandler } from "./StateMediatorStateHandler";
import { StateMediatorMapping } from "./StateMediatorMapping";

/**
 * @private
 */
export class StateMediatorMapper implements IStateMediatorMapper, IStateMediatorUnmapper {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: Map<IClass<any>, IStateMediatorMapping> = new Map<
        IClass<any>,
        IStateMediatorMapping
    >();

    private _typeFilter: ITypeFilter;

    private _handler: StateMediatorStateHandler;

    private _logger: ILogger;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(
        typeFilter: ITypeFilter,
        handler: StateMediatorStateHandler,
        logger?: ILogger
    ) {
        this._typeFilter = typeFilter;
        this._handler = handler;
        this._logger = logger;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public toMediator(mediatorClass: IClass<any>): IStateMediatorConfigurator {
        let mapping: IStateMediatorMapping = this._mappings.get(mediatorClass);
        return mapping ? this._overwriteMapping(mapping) : this._createMapping(mediatorClass);
    }

    /**
     * @inheritDoc
     */
    public fromMediator(mediatorClass: IClass<any>): void {
        let mapping: IStateMediatorMapping = this._mappings.get(mediatorClass);

        if (mapping) {
            this._deleteMapping(mapping);
        }
    }

    /**
     * @inheritDoc
     */
    public fromAll(): void {
        this._mappings.forEach(this._deleteMapping, this);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _createMapping(mediatorClass: IClass<any>): StateMediatorMapping {
        let mapping: StateMediatorMapping = new StateMediatorMapping(
            this._typeFilter,
            mediatorClass
        );
        this._handler.addMapping(mapping);
        this._mappings.set(mediatorClass, mapping);

        if (this._logger) {
            this._logger.debug("{0} mapped to {1}", [this._typeFilter, mapping]);
        }

        return mapping;
    }

    private _deleteMapping(mapping: IStateMediatorMapping): void {
        this._handler.removeMapping(mapping);
        this._mappings.delete(mapping.mediatorClass);

        if (this._logger) {
            this._logger.debug("{0} unmapped from {1}", [this._typeFilter, mapping]);
        }
    }

    private _overwriteMapping(mapping: IStateMediatorMapping): IStateMediatorConfigurator {
        if (this._logger) {
            this._logger.warn(
                "{0} already mapped to {1}\n" +
                    'If you have overridden this mapping intentionally you can use "unmap()" ' +
                    "prior to your replacement mapping in order to avoid seeing this message.\n",
                [this._typeFilter, mapping]
            );
        }
        this._deleteMapping(mapping);
        return this._createMapping(mapping.mediatorClass);
    }
}
