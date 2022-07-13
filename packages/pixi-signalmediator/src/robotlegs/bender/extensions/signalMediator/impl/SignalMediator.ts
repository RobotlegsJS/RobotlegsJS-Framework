// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { ISignal } from "@robotlegsjs/signals";
import { DisplayObject } from "pixi.js";
import { ISignalMap } from "../api/ISignalMap";
import { SignalMap } from "./SignalMap";

/**
 * Signal mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class SignalMediator<T extends DisplayObject> extends Mediator<T> {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    private _signalMap: ISignalMap;
    protected get signalMap(): ISignalMap {
        this._signalMap = this._signalMap || new SignalMap();
        return this._signalMap;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventMap.
     */
    public postDestroy(): void {
        this.signalMap.removeAll();
        super.postDestroy();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected addToSignal(signal: ISignal, handler: Function): void {
        this.signalMap.addToSignal(signal, handler);
    }

    protected addOnceToSignal(signal: ISignal, handler: Function): void {
        this.signalMap.addOnceToSignal(signal, handler);
    }
}
