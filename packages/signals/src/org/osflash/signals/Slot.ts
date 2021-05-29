/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ISlot } from "./ISlot";
import { IOnceSignal } from "./IOnceSignal";

/**
 * The Slot class represents a signal slot.
 *
 * @author Robert Penner
 * @author Joa Ebert
 */
export class Slot implements ISlot {
    protected _signal: IOnceSignal;
    protected _enabled: boolean = true;
    protected _listener: Function;
    protected _once: boolean = false;
    protected _priority: number = 0;
    protected _params: any[];

    /**
     * Creates and returns a new Slot object.
     *
     * @param listener The listener associated with the slot.
     * @param signal The signal associated with the slot.
     * @param once Whether or not the listener should be executed only once.
     * @param priority The priority of the slot.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     * @throws Error <code>Error</code>: Internal signal reference has not been set yet.
     */
    public constructor(listener: Function, signal: IOnceSignal, once: boolean = false, priority: number = 0) {
        this._listener = listener;
        this._once = once;
        this._signal = signal;
        this._priority = priority;

        this.verifyListener(listener);
    }

    /**
     * @inheritDoc
     */
    public execute0(): void {
        if (!this._enabled) {
            return;
        }

        if (this._once) {
            this.remove();
        }

        if (this._params && this._params.length) {
            this._listener.apply(null, this._params);
            return;
        }
        this._listener();
    }

    /**
     * @inheritDoc
     */
    public execute1(value: any): void {
        if (!this._enabled) {
            return;
        }

        if (this._once) {
            this.remove();
        }

        if (this._params && this._params.length) {
            this._listener.apply(null, [value].concat(this._params));
            return;
        }
        this._listener(value);
    }

    /**
     * @inheritDoc
     */
    public execute(valueObjects: any[]): void {
        if (!this._enabled) {
            return;
        }

        if (this._once) {
            this.remove();
        }

        // If we have parameters, add them to the valueObject
        // Note: This could be expensive if we're after the fastest dispatch possible.
        if (this._params && this._params.length) {
            valueObjects = valueObjects.concat(this._params);
        }

        // NOTE: simple ifs are faster than switch: http://jacksondunstan.com/articles/1007
        let numValueObjects: number = valueObjects.length;
        if (numValueObjects === 0) {
            this._listener();
        } else if (numValueObjects === 1) {
            this._listener(valueObjects[0]);
        } else if (numValueObjects === 2) {
            this._listener(valueObjects[0], valueObjects[1]);
        } else if (numValueObjects === 3) {
            this._listener(valueObjects[0], valueObjects[1], valueObjects[2]);
        } else {
            this._listener.apply(null, valueObjects);
        }
    }

    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>. Did you want to set enabled to false instead?
     * @throws Error <code>Error</code>: Internal signal reference has not been set yet.
     */
    public get listener(): Function {
        return this._listener;
    }

    public set listener(value: Function) {
        if (null == value) {
            throw new Error("Given listener is null.\nDid you want to set enabled to false instead?");
        }

        this.verifyListener(value);
        this._listener = value;
    }

    /**
     * @inheritDoc
     */
    public get once(): boolean {
        return this._once;
    }

    /**
     * @inheritDoc
     */
    public get priority(): number {
        return this._priority;
    }

    /**
     * Creates and returns the string representation of the current object.
     *
     * @return The string representation of the current object.
     */
    public toString(): string {
        return (
            "[Slot listener: " +
            this._listener +
            ", once: " +
            this._once +
            ", priority: " +
            this._priority +
            ", enabled: " +
            this._enabled +
            "]"
        );
    }

    /**
     * @inheritDoc
     */
    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        this._enabled = value;
    }

    /**
     * @inheritDoc
     */
    public get params(): any[] {
        return this._params;
    }

    public set params(value: any[]) {
        this._params = value;
    }

    /**
     * @inheritDoc
     */
    public remove(): void {
        this._signal.remove(this._listener);
    }

    protected verifyListener(listener: Function): void {
        if (null == listener) {
            throw new Error("Given listener is null.");
        }

        if (null == this._signal) {
            throw new Error("Internal signal reference has not been set yet.");
        }
    }
}
