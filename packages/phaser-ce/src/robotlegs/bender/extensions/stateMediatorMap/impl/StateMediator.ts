// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event, IEventDispatcher, IEventMap, inject, injectable } from "@robotlegsjs/core";
import { IStateMediator } from "../api/IStateMediator";

/**
 * Classic Robotlegs mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class StateMediator<T extends Phaser.State> implements IStateMediator {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    @inject(IEventMap)
    protected eventMap: IEventMap;

    @inject(IEventDispatcher)
    protected eventDispatcher: IEventDispatcher;

    protected _stateComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set state(state: T) {
        this._stateComponent = state;
    }

    public get state(): T {
        return this._stateComponent;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public abstract initialize(): void;

    /**
     * @inheritDoc
     */
    public abstract destroy(): void;

    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventMap.
     */
    public postDestroy(): void {
        this.eventMap.unmapListeners();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected addViewListener(eventString: string, listener: Function, eventClass?: Object): void {
        // this.eventMap.mapListener(this._stateComponent, eventString, listener, eventClass);
    }

    protected addContextListener(
        eventString: string,
        listener: Function,
        eventClass?: Object
    ): void {
        // this.eventMap.mapListener(this.eventDispatcher, eventString, listener, eventClass);
    }

    protected removeViewListener(
        eventString: string,
        listener: Function,
        eventClass?: Object
    ): void {
        // this.eventMap.unmapListener(this._stateComponent, eventString, listener, eventClass);
    }

    protected removeContextListener(
        eventString: string,
        listener: Function,
        eventClass?: Object
    ): void {
        // this.eventMap.unmapListener(this.eventDispatcher, eventString, listener, eventClass);
    }

    protected dispatch(event: Event): void {
        if (this.eventDispatcher.hasEventListener(event.type)) {
            this.eventDispatcher.dispatchEvent(event);
        }
    }
}
