// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event, IClass, IEvent, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";
import { IEventEmitterMap } from "@robotlegsjs/eventemitter3";
import { DisplayObject, utils } from "pixi.js";
import { IMediator } from "../api/IMediator";

/**
 * Classic Robotlegs mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class Mediator<T extends DisplayObject> implements IMediator {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    @inject(IEventEmitterMap)
    protected eventMap: IEventEmitterMap;

    @inject(IEventDispatcher)
    protected eventDispatcher: IEventDispatcher;

    protected _viewComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set view(view: T) {
        this._viewComponent = view;
    }

    public get view(): T {
        return this._viewComponent;
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
        this.eventMap.unmapAllListeners();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected addViewListener(
        eventString: string,
        listener: utils.EventEmitter.ListenerFn,
        thisObject?: any
    ): void {
        this.eventMap.on(this._viewComponent, eventString, listener, thisObject);
    }

    protected addContextListener(
        eventString: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean,
        priority?: number
    ): void {
        this.eventMap.mapListener(
            this.eventDispatcher,
            eventString,
            listener,
            thisObject,
            eventClass,
            useCapture,
            priority
        );
    }

    protected addDomListener(
        eventTarget: EventTarget,
        eventString: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void {
        this.eventMap.mapDomListener(eventTarget, eventString, listener, options);
    }

    protected removeViewListener(
        eventString: string,
        listener: utils.EventEmitter.ListenerFn,
        thisObject?: any
    ): void {
        this.eventMap.off(this._viewComponent, eventString, listener, thisObject);
    }

    protected removeContextListener(
        eventString: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean
    ): void {
        this.eventMap.unmapListener(
            this.eventDispatcher,
            eventString,
            listener,
            thisObject,
            eventClass,
            useCapture
        );
    }

    protected removeDomListener(
        eventTarget: EventTarget,
        eventString: string,
        listener: EventListenerOrEventListenerObject
    ): void {
        this.eventMap.unmapDomListener(eventTarget, eventString, listener);
    }

    protected dispatch(event: Event): void {
        if (this.eventDispatcher.hasEventListener(event.type)) {
            this.eventDispatcher.dispatchEvent(event);
        }
    }
}
