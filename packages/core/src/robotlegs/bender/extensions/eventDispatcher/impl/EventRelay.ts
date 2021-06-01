// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventDispatcher } from "../../../events/api/IEventDispatcher";

/**
 * Relays events from a source to a destination
 */
export class EventRelay {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _source: IEventDispatcher;

    private _destination: IEventDispatcher;

    private _types: string[];

    private _active: boolean;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Relays events from the source to the destination
     * @param source Event Dispatcher
     * @param destination Event Dispatcher
     * @param types The list of event types to relay
     */
    public constructor(source: IEventDispatcher, destination: IEventDispatcher, types?: string[]) {
        this._source = source;
        this._destination = destination;
        this._types = types || [];
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * Start relaying events
     * @return Self
     */
    public start(): EventRelay {
        if (!this._active) {
            this._active = true;
            this._addListeners();
        }
        return this;
    }

    /**
     * Stop relaying events
     * @return Self
     */
    public stop(): EventRelay {
        if (this._active) {
            this._active = false;
            this._removeListeners();
        }
        return this;
    }

    /**
     * Add a new event type to relay
     * @param eventType
     */
    public addType(eventType: string): void {
        this._types.push(eventType);
        if (this._active) {
            this._addListener(eventType);
        }
    }

    /**
     * Remove a relay event type
     * @param eventType
     */
    public removeType(eventType: string): void {
        let index: number = this._types.indexOf(eventType);
        if (index > -1) {
            this._types.splice(index, 1);
            this._removeListener(eventType);
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _addListener(type: string): void {
        this._source.addEventListener(type, this._destination.dispatchEvent, this._destination);
    }

    private _removeListener(type: string): void {
        this._source.removeEventListener(type, this._destination.dispatchEvent, this._destination);
    }

    private _addListeners(): void {
        this._types.forEach((type: string) => {
            this._addListener(type);
        });
    }

    private _removeListeners(): void {
        this._types.forEach((type: string) => {
            this._removeListener(type);
        });
    }
}
