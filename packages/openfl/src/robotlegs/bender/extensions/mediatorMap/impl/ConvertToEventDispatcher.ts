// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEvent, IEventDispatcher } from "@robotlegsjs/core";

import EventDispatcher from "openfl/events/EventDispatcher";
import Event from "openfl/events/Event";

/**
 * Makes the bridge between the EventDispatcher from OpenFL and IEventDispatcher.
 */
export class ConvertToEventDispatcher implements IEventDispatcher {
    private _openflEventDispatcher: EventDispatcher;

    constructor(openflEventDispatcher: EventDispatcher) {
        this._openflEventDispatcher = openflEventDispatcher;
    }

    public addEventListener(type: string, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void {
        this._openflEventDispatcher.addEventListener(type, <any>listener, useCapture, priority);
    }

    public once(type: string, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void {
        console.warn("unsuported method on OpenFL, the listener will not be removed automatically");
        this._openflEventDispatcher.addEventListener(type, <any>listener, useCapture, priority);
    }

    public removeEventListener(type: string, listener: Function, thisObject?: any, useCapture?: boolean): void {
        this._openflEventDispatcher.removeEventListener(type, <any>listener, useCapture);
    }

    public hasEventListener(type: string): boolean {
        return this._openflEventDispatcher.hasEventListener(type);
    }

    public dispatchEvent(event: IEvent): boolean {
        console.warn("event dispatched may loose reference of target and currentTarget");
        let openEvent: Event = new Event(event.type, event.bubbles, event.cancelable);
        return this._openflEventDispatcher.dispatchEvent(openEvent);
    }

    public willTrigger(type: string): boolean {
        return this._openflEventDispatcher.willTrigger(type);
    }
}
