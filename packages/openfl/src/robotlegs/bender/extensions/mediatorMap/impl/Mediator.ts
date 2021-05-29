// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IClass, IEvent, IEventMap, IEventDispatcher, Event } from "@robotlegsjs/core";

import { IMediator } from "../api/IMediator";

import { ConvertToEventDispatcher } from "./ConvertToEventDispatcher";

import EventDispatcher from "openfl/events/EventDispatcher";

/**
 * Classic Robotlegs mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class Mediator<T extends EventDispatcher> implements IMediator {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _viewConverted: ConvertToEventDispatcher;

    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    @inject(IEventMap)
    protected _eventMap: IEventMap;

    @inject(IEventDispatcher)
    protected _eventDispatcher: IEventDispatcher;

    protected _viewComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set view(view: T) {
        this._viewComponent = view;
        this._viewConverted = new ConvertToEventDispatcher(this._viewComponent);
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
        this._eventMap.unmapAllListeners();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected addViewListener(
        eventString: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._eventMap.mapListener(this._viewConverted, eventString, listener, thisObject, eventClass, useCapture, priority);
    }

    protected addContextListener(
        eventString: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._eventMap.mapListener(this._eventDispatcher, eventString, listener, thisObject, eventClass, useCapture, priority);
    }

    protected addDomListener(
        eventTarget: EventTarget,
        eventString: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void {
        this._eventMap.mapDomListener(eventTarget, eventString, listener, options);
    }

    protected removeViewListener(
        eventString: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean
    ): void {
        this._eventMap.unmapListener(this._viewConverted, eventString, listener, thisObject, eventClass, useCapture);
    }

    protected removeContextListener(
        eventString: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean
    ): void {
        this._eventMap.unmapListener(this._eventDispatcher, eventString, listener, thisObject, eventClass, useCapture);
    }

    protected removeDomListener(eventTarget: EventTarget, eventString: string, listener: EventListenerOrEventListenerObject): void {
        this._eventMap.unmapDomListener(eventTarget, eventString, listener);
    }

    protected dispatch(event: Event): void {
        if (this._eventDispatcher.hasEventListener(event.type)) {
            this._eventDispatcher.dispatchEvent(event);
        }
    }
}
