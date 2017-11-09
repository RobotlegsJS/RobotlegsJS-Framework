// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "../../../extensions/matching/IClass";

import { IEvent } from "../../../events/api/IEvent";
import { IEventDispatcher } from "../../../events/api/IEventDispatcher";

/**
 * The Event Map keeps track of listeners and provides the ability
 * to unregister all listeners with a single method call.
 */
export let IEventMap = Symbol("IEventMap");
export interface IEventMap {
    /**
     * The same as calling <code>addEventListener</code> directly on the <code>IEventDispatcher</code>,
     * but keeps a list of listeners for easy (usually automatic) removal.
     *
     * @param dispatcher The <code>IEventDispatcher</code> to listen to
     * @param type The <code>Event</code> type to listen for
     * @param listener The <code>Event</code> handler
     * @param thisObject the listener function's "this"
     * @param eventClass Optional Event class for a stronger mapping. Defaults to <code>flash.events.Event</code>.
     * @param useCapture
     * @param priority The priority level of the event listener. Priorities are designated by a integer. The higher
     * the number, the higher the priority. All listeners with priority n are processed before listeners of priority n-1.
     * If two or more listeners share the same priority, they are processed in the order in which they were added.
     */
    mapListener(
        dispatcher: IEventDispatcher,
        type: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean,
        priority?: number
    ): void;

    /**
     * The same as calling <code>removeEventListener</code> directly on the <code>IEventDispatcher</code>,
     * but updates our local list of listeners.
     *
     * @param dispatcher The <code>IEventDispatcher</code>
     * @param type The <code>Event</code> type
     * @param listener The <code>Event</code> handler
     * @param thisObject the listener function's "this"
     * @param eventClass Optional Event class for a stronger mapping. Defaults to <code>flash.events.Event</code>.
     * @param useCapture
     */
    unmapListener(
        dispatcher: IEventDispatcher,
        type: string,
        listener: Function,
        thisObject?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean
    ): void;

    /**
     * Removes all listeners registered through <code>mapListener</code>
     */
    unmapListeners(): void;

    /**
     * Suspends all listeners registered through <code>mapListener</code>
     */
    suspend(): void;

    /**
     * Resumes all listeners registered through <code>mapListener</code>
     */
    resume(): void;
}
