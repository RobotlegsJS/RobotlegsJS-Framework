// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import EventEmitter = require("eventemitter3");

/**
 * @private
 */
export class EventEmitterMapConfig {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _emitter: EventEmitter;

    /**
     * @private
     */
    public get emitter(): EventEmitter {
        return this._emitter;
    }

    private _event: string | symbol;

    /**
     * @private
     */
    public get event(): string | symbol {
        return this._event;
    }

    private _listener: EventEmitter.ListenerFn;

    /**
     * @private
     */
    public get listener(): EventEmitter.ListenerFn {
        return this._listener;
    }

    private _context: any;

    /**
     * @private
     */
    public get context(): any {
        return this._context;
    }

    private _once: boolean;

    /**
     * @private
     */
    public get once(): boolean {
        return this._once;
    }

    private _calback: EventEmitter.ListenerFn;

    /**
     * @private
     */
    public get calback(): EventEmitter.ListenerFn {
        return this._calback;
    }

    /**
     * @private
     */
    public set calback(value: EventEmitter.ListenerFn) {
        this._calback = value;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(
        emitter: EventEmitter,
        event: string | symbol,
        listener: EventEmitter.ListenerFn,
        context: any,
        once?: boolean
    ) {
        this._emitter = emitter;
        this._event = event;
        this._listener = listener;
        this._context = context;
        this._once = once;
    }

    public equalTo(
        emitter: EventEmitter,
        event: string | symbol,
        listener: EventEmitter.ListenerFn,
        context: any
    ): boolean {
        return (
            this._emitter === emitter &&
            this._event === event &&
            this._listener === listener &&
            this._context === context
        );
    }
}
