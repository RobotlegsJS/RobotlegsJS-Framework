// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEvent, IEventDispatcher } from "@robotlegsjs/core";
import { DisplayObject, utils } from "pixi.js";

/**
 * Makes the bridge between the DisplayObject from pixi.js and IEventDispatcher.
 */
export class ConvertToEventDispatcher implements IEventDispatcher {
    private _displayObject: DisplayObject;

    public constructor(displayObject: DisplayObject) {
        this._displayObject = displayObject;
    }

    public addEventListener(
        type: string,
        listener: Function,
        thisObject?: any,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._displayObject.on(type, <utils.EventEmitter.ListenerFn>listener, thisObject);
    }

    public once(
        type: string,
        listener: Function,
        thisObject?: any,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._displayObject.once(type, <utils.EventEmitter.ListenerFn>listener, thisObject);
    }

    public removeEventListener(
        type: string,
        listener: Function,
        thisObject?: any,
        useCapture?: boolean
    ): void {
        this._displayObject.off(type, <utils.EventEmitter.ListenerFn>listener, thisObject);
    }

    public hasEventListener(type: string): boolean {
        return this._displayObject.listenerCount(type) > 0;
    }

    public dispatchEvent(event: IEvent): boolean {
        event.target = this._displayObject;

        let currentTarget = this._displayObject;
        let dispatched = false;
        do {
            event.currentTarget = currentTarget;
            dispatched = currentTarget.emit(event.type, event);
            currentTarget = currentTarget.parent;
        } while (currentTarget && event.bubbles);

        return dispatched;
    }

    public willTrigger(type: string): boolean {
        return this._displayObject.listenerCount(type) > 0;
    }
}
