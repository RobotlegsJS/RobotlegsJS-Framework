/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IPrioritySignal } from "../IPrioritySignal";
import { IEvent } from "./IEvent";

/**
 *
 * @see org.osflash.signals.events.IEvent
 * Documentation for the event interface being maintained in IEvent to avoid duplication for now.
 */
export class GenericEvent implements IEvent {
    protected _bubbles: boolean;
    protected _target: any;
    protected _currentTarget: any;
    protected _signal: IPrioritySignal;

    public constructor(bubbles: boolean = false) {
        this._bubbles = bubbles;
    }

    /** @inheritDoc */
    public get signal(): IPrioritySignal {
        return this._signal;
    }

    public set signal(value: IPrioritySignal) {
        this._signal = value;
    }

    /** @inheritDoc */
    public get target(): any {
        return this._target;
    }

    public set target(value: any) {
        this._target = value;
    }

    /** @inheritDoc */
    public get currentTarget(): any {
        return this._currentTarget;
    }

    public set currentTarget(value: any) {
        this._currentTarget = value;
    }

    /** @inheritDoc */
    public get bubbles(): boolean {
        return this._bubbles;
    }

    public set bubbles(value: boolean) {
        this._bubbles = value;
    }

    /** @inheritDoc */
    public clone(): IEvent {
        return new GenericEvent(this._bubbles);
    }
}
