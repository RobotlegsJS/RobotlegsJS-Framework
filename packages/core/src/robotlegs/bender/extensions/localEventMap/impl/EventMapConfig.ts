// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEvent } from "../../../events/api/IEvent";
import { IEventDispatcher } from "../../../events/api/IEventDispatcher";
import { IClass } from "../../../extensions/matching/IClass";

/**
 * @private
 */
export class EventMapConfig {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _dispatcher: IEventDispatcher;

    /**
     * @private
     */
    public get dispatcher(): IEventDispatcher {
        return this._dispatcher;
    }

    private _eventString: string;

    /**
     * @private
     */
    public get eventString(): string {
        return this._eventString;
    }

    private _listener: Function;

    /**
     * @private
     */
    public get listener(): Function {
        return this._listener;
    }

    private _thisObject: any;

    /**
     * @private
     */
    public get thisObject(): any {
        return this._thisObject;
    }

    private _eventClass: IClass<IEvent>;

    /**
     * @private
     */
    public get eventClass(): IClass<IEvent> {
        return this._eventClass;
    }

    private _callback: Function;

    /**
     * @private
     */
    public get callback(): Function {
        return this._callback;
    }

    private _useCapture: boolean;

    /**
     * @private
     */
    public get useCapture(): boolean {
        return this._useCapture;
    }

    private _priority: number;

    /**
     * @private
     */
    public get priority(): number {
        return this._priority;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    public constructor(
        dispatcher: IEventDispatcher,
        eventString: string,
        listener: Function,
        thisObject: any,
        eventClass: IClass<IEvent>,
        callback: Function,
        useCapture: boolean,
        priority: number
    ) {
        this._dispatcher = dispatcher;
        this._eventString = eventString;
        this._listener = listener;
        this._thisObject = thisObject;
        this._eventClass = eventClass;
        this._callback = callback;
        this._useCapture = useCapture;
        this._priority = priority;
    }

    public equalTo(
        dispatcher: IEventDispatcher,
        eventString: string,
        listener: Function,
        thisObject: any,
        eventClass: IClass<IEvent>,
        useCapture: boolean
    ): boolean {
        return (
            this._eventString === eventString &&
            this._eventClass === eventClass &&
            this._thisObject === thisObject &&
            this._dispatcher === dispatcher &&
            this._listener === listener &&
            this._useCapture === useCapture
        );
    }
}
