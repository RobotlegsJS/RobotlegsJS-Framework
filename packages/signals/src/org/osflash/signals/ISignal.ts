/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ISlot } from "./ISlot";
import { IOnceSignal } from "./IOnceSignal";

// eslint-disable-next-line @rushstack/typedef-var
export const ISignal = Symbol("ISignal");

/**
 *
 */
export interface ISignal extends IOnceSignal {
    /**
     * Subscribes a listener for the signal.
     *
     * @param    listener A function with arguments
     * that matches the value classes dispatched by the signal.
     * If value classes are not specified (e.g. via Signal constructor), dispatch() can be called without arguments.
     * @return a ISlot, which contains the Function passed as the parameter
     */
    add(listener: Function): ISlot;
}
