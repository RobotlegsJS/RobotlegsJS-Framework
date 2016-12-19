// ------------------------------------------------------------------------------
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
import {injectable} from "inversify";
import {IEventDispatcher} from "robotlegs";
import {Mediator} from "robotlegs-pixi";
import {ISignalMap} from "../api/ISignalMap";
import {ISignal} from "signals.js";
import {SignalMap} from "./SignalMap";

/**
 * Signal mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class SignalMediator<T extends IEventDispatcher> extends Mediator<T> {

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
    postDestroy(): void {
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
