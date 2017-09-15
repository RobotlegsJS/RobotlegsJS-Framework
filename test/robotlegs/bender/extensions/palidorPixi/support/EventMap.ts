// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventMap, IEventDispatcher } from "@robotlegsjs/core";

export class EventMap implements IEventMap {
    constructor() {
        this.unmapListener(null, "", null);
        this.resume();
        this.suspend();
        this.unmapListeners();
    }

    public mapListener(
        dispatcher: IEventDispatcher | EventTarget,
        type: string,
        listener: Function,
        thisObject?: any,
        eventClass?: Object,
        useCapture?: Boolean,
        priority?: number,
        useWeakReference?: Boolean
    ): void {
        /*  */
    }
    public unmapListener(
        dispatcher: IEventDispatcher | EventTarget,
        type: string,
        listener: Function,
        thisObject?: any,
        eventClass?: Object,
        useCapture?: Boolean
    ): void {
        /*  */
    }

    public unmapListeners(): void {
        /*  */
    }

    public suspend(): void {
        /*  */
    }

    public resume(): void {
        /*  */
    }
}
