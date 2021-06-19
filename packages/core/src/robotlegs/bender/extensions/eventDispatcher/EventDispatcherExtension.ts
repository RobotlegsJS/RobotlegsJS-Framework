// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventDispatcher } from "../../events/api/IEventDispatcher";
import { EventDispatcher } from "../../events/impl/EventDispatcher";
import { IContext } from "../../framework/api/IContext";
import { IExtension } from "../../framework/api/IExtension";
import { LifecycleEventRelay } from "./impl/LifecycleEventRelay";

/**
 * This extension maps an IEventDispatcher into a context's injector.
 */
export class EventDispatcherExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _context: IContext;

    private _eventDispatcher: IEventDispatcher;

    private _lifecycleRelay: LifecycleEventRelay;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates an Event Dispatcher Extension
     *
     * @param eventDispatcher Optional IEventDispatcher instance to share
     */
    public constructor(eventDispatcher: IEventDispatcher = null) {
        this._eventDispatcher = eventDispatcher || new EventDispatcher();
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        this._context = context;
        this._context.injector.bind(IEventDispatcher).toConstantValue(this._eventDispatcher);
        this._context.beforeInitializing(this._configureLifecycleEventRelay.bind(this));
        this._context.afterDestroying(this._destroyLifecycleEventRelay.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _configureLifecycleEventRelay(): void {
        this._lifecycleRelay = new LifecycleEventRelay(this._context, this._eventDispatcher);
    }

    private _destroyLifecycleEventRelay(): void {
        this._lifecycleRelay.destroy();
    }
}
