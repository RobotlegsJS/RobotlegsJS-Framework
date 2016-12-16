// ------------------------------------------------------------------------------
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
import {MonoSignal, OnceSignal, Signal, DeluxeSignal, PrioritySignal} from "signals.js";
import {injectable, IContext, IExtension, UID} from "robotlegs";
import {ISignalMap} from "./api/ISignalMap";
import {SignalMap} from "./impl/SignalMap";

// allow signals to be injected
injectable()(MonoSignal);
injectable()(OnceSignal);
injectable()(Signal);
injectable()(DeluxeSignal);
injectable()(PrioritySignal);

export class SignalMediatorExtension implements IExtension {

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _uid: string = UID.create(SignalMediatorExtension);

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    public extend(context: IContext): void {
        context.injector.bind(ISignalMap).to(SignalMap).inSingletonScope();
    }

    public toString(): string {
        return this._uid;
    }
}
