// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ISignal } from "@robotlegsjs/signals";

import { injectable } from "@robotlegsjs/core";

import { ISignalMap } from "../api/ISignalMap";

@injectable()
export class SignalMap implements ISignalMap {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    protected _handlersBySignal: Map<ISignal, Function[]>;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    constructor() {
        this._handlersBySignal = new Map();
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    public addToSignal(signal: ISignal, handler: Function): void {
        signal.add(handler);
        this.storeSignalHandler(signal, handler);
    }

    public addOnceToSignal(signal: ISignal, handler: Function): void {
        signal.addOnce(handler);
        this.storeSignalHandler(signal, handler);
    }

    public removeFromSignal(signal: ISignal, handler: Function): void {
        signal.remove(handler);

        if (!this._handlersBySignal.has(signal) || this._handlersBySignal.get(signal).length === 0) {
            return;
        }

        let handlerIndex = this._handlersBySignal.get(signal).indexOf(handler);

        if (handlerIndex > -1) {
            this._handlersBySignal.get(signal).splice(handlerIndex, 1);
        }
    }

    public removeAll(): void {
        this._handlersBySignal.forEach((handlers, signal) => handlers.forEach(handler => signal.remove(handler)));

        this._handlersBySignal.clear();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected storeSignalHandler(signal: ISignal, handler: Function): void {
        if (!this._handlersBySignal.has(signal)) {
            this._handlersBySignal.set(signal, [handler]);
        } else {
            this._handlersBySignal.get(signal).push(handler);
        }
    }
}
