// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";
import { IStateHandler } from "../../stateManager/api/IStateHandler";
import { IStateMediatorMapping } from "../api/IStateMediatorMapping";
import { StateMediatorFactory } from "./StateMediatorFactory";

/**
 * @private
 */
export class StateMediatorStateHandler implements IStateHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: IStateMediatorMapping[] = [];

    private _knownMappings: Map<IClass<any>, IStateMediatorMapping[] | boolean> = new Map<
        IClass<any>,
        IStateMediatorMapping[]
    >();

    private _factory: StateMediatorFactory;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(factory: StateMediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMapping(mapping: IStateMediatorMapping): void {
        let index: number = this._mappings.indexOf(mapping);
        if (index > -1) {
            return;
        }
        this._mappings.push(mapping);
        this._flushCache();
    }

    /**
     * @private
     */
    public removeMapping(mapping: IStateMediatorMapping): void {
        let index: number = this._mappings.indexOf(mapping);
        if (index === -1) {
            return;
        }
        this._mappings.splice(index, 1);
        this._flushCache();
    }

    /**
     * @private
     */
    public handleState(state: Phaser.State, type: IClass<any>): void {
        let interestedMappings = this._getInterestedMappingsFor(state, type);
        if (interestedMappings) {
            this._factory.createMediators(state, type, interestedMappings);
        }
    }

    /**
     * @private
     */
    public handleItem(item: any, type: IClass<any>): void {
        let interestedMappings = this._getInterestedMappingsFor(item, type);
        if (interestedMappings) {
            this._factory.createMediators(item, type, interestedMappings);
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _flushCache(): void {
        this._knownMappings = new Map<IClass<any>, IStateMediatorMapping[]>();
    }

    private _getInterestedMappingsFor(item: any, type: any): IStateMediatorMapping[] {
        // we've seen this type before and nobody was interested
        if (this._knownMappings.get(type) === false) {
            return null;
        }

        // we haven't seen this type before
        if (this._knownMappings.get(type) === undefined) {
            this._knownMappings.set(type, false);

            this._mappings.forEach((mapping: IStateMediatorMapping) => {
                if (mapping.matcher.matches(item)) {
                    if (!this._knownMappings.get(type)) {
                        this._knownMappings.set(type, []);
                    }
                    (this._knownMappings.get(type) as IStateMediatorMapping[]).push(mapping);
                }
            });

            // nobody cares, let's get out of here
            if (this._knownMappings.get(type) === false) {
                return null;
            }
        }

        // these mappings really do care
        return this._knownMappings.get(type) as IStateMediatorMapping[];
    }
}
