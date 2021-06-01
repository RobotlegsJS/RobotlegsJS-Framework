// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEvent, IEventDispatcher } from "@robotlegsjs/core";

/**
 * Makes the bridge between the createjs.EventDispatcher and IEventDispatcher.
 */
export class ConvertToEventDispatcher implements IEventDispatcher {
    private _createjsEventDispatcher: createjs.EventDispatcher;

    constructor(createjsEventDispatcher: createjs.EventDispatcher) {
        this._createjsEventDispatcher = createjsEventDispatcher;
    }

    public addEventListener(
        type: string,
        listener: Function,
        thisObject?: any,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._createjsEventDispatcher.on(type, <any>listener, thisObject, false, null, useCapture);
    }

    public once(
        type: string,
        listener: Function,
        thisObject?: any,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._createjsEventDispatcher.on(type, <any>listener, thisObject, true, null, useCapture);
    }

    public removeEventListener(
        type: string,
        listener: Function,
        thisObject?: any,
        useCapture?: boolean
    ): void {
        this._createjsEventDispatcher.off(type, <any>listener, useCapture);
    }

    public hasEventListener(type: string): boolean {
        return this._createjsEventDispatcher.hasEventListener(type);
    }

    public dispatchEvent(event: IEvent): boolean {
        return this._createjsEventDispatcher.dispatchEvent(event);
    }

    public willTrigger(type: string): boolean {
        return this._createjsEventDispatcher.willTrigger(type);
    }
}
