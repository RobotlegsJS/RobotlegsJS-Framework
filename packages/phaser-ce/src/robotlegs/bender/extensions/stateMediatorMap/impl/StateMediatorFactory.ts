// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    applyHooks,
    guardsApprove,
    IClass,
    IInjector,
    instantiateUnmapped,
    IType,
    ITypeFilter
} from "@robotlegsjs/core";
import { IStateMediatorMapping } from "../api/IStateMediatorMapping";
import { StateMediatorManager } from "./StateMediatorManager";

/**
 * @private
 */
export class StateMediatorFactory {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mediators: Map<any, any> = new Map<any, any>();

    private _injector: IInjector;

    private _manager: StateMediatorManager;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(injector: IInjector, manager?: StateMediatorManager) {
        this._injector = injector;
        this._manager = manager || new StateMediatorManager(this);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public getMediator(item: any, mapping: IStateMediatorMapping): any {
        return this._mediators.get(item) ? this._mediators.get(item).get(<any>mapping) : null;
    }

    /**
     * @private
     */
    public createMediators(item: any, type: IClass<any>, mappings: any[]): any[] {
        let createdMediators: any[] = [];
        let mediator: any;

        mappings.forEach((mapping: IStateMediatorMapping) => {
            mediator = this.getMediator(item, mapping);

            if (!mediator) {
                this._mapTypeForFilterBinding(mapping.matcher, type, item);
                mediator = this._createMediator(item, mapping);
                this._unmapTypeForFilterBinding(mapping.matcher, type, item);
            }

            if (mediator) {
                createdMediators.push(mediator);
            }
        });

        return createdMediators;
    }

    /**
     * @private
     */
    public removeMediators(item: any): void {
        let mediators: Map<any, IStateMediatorMapping> = this._mediators.get(item);
        if (!mediators) {
            return;
        }

        mediators.forEach((value, key) => this._manager.removeMediator(value, item, key));

        this._mediators.delete(item);
    }

    /**
     * @private
     */
    public removeAllMediators(): void {
        this._mediators.forEach((value, key) => this.removeMediators(key));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _createMediator(item: any, mapping: IStateMediatorMapping): any {
        let mediator: any = this.getMediator(item, mapping);

        if (mediator) {
            return mediator;
        }

        if (mapping.guards.length === 0 || guardsApprove(mapping.guards, this._injector)) {
            let mediatorClass: IClass<any> = mapping.mediatorClass;
            mediator = instantiateUnmapped(this._injector, mediatorClass);
            if (mapping.hooks.length > 0) {
                this._injector.bind(mediatorClass).toConstantValue(mediator);
                applyHooks(mapping.hooks, this._injector);
                this._injector.unbind(mediatorClass);
            }
            this._addMediator(mediator, item, mapping);
        }
        return mediator;
    }

    private _addMediator(mediator: any, item: any, mapping: IStateMediatorMapping): void {
        let mediatorMap = this._mediators.get(item) || new Map<any, IStateMediatorMapping>();
        this._mediators.set(item, mediatorMap);
        mediatorMap.set(<any>mapping, mediator);
        this._manager.addMediator(mediator, item, mapping);
    }

    private _mapTypeForFilterBinding(filter: ITypeFilter, type: IClass<any>, item: any): void {
        let requiredTypes = this._requiredTypesFor(filter, type);
        requiredTypes.forEach((requiredType: IType<any>) => {
            this._injector.bind(requiredType).toConstantValue(item);
        });
    }

    private _unmapTypeForFilterBinding(filter: ITypeFilter, type: IClass<any>, item: any): void {
        let requiredTypes = this._requiredTypesFor(filter, type);

        requiredTypes.forEach((requiredType: IType<any>) => {
            if (this._injector.isBound(requiredType)) {
                this._injector.unbind(requiredType);
            }
        });
    }

    private _requiredTypesFor(filter: ITypeFilter, type: IClass<any>): IType<any>[] {
        let requiredTypes: IType<any>[] = filter.allOfTypes.concat(filter.anyOfTypes);

        if (requiredTypes.indexOf(type) === -1) {
            requiredTypes.push(type);
        }

        return requiredTypes;
    }
}
