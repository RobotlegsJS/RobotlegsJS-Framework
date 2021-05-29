// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ISignal } from "@robotlegsjs/signals";

/**
 * The Signal Map allows you to bind Signals to functions
 */
export let ISignalMap = Symbol("ISignalMap");
export interface ISignalMap {
    addToSignal(signal: ISignal, handler: Function): void;

    addOnceToSignal(signal: ISignal, handler: Function): void;

    removeFromSignal(signal: ISignal, handler: Function): void;

    removeAll(): void;
}
