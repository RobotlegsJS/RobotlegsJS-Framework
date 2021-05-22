/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IOnceSignal } from "./IOnceSignal";
import { SlotList } from "./SlotList";
import { ISlot } from "./ISlot";
import { Slot } from "./Slot";

/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/* [DefaultProperty("valueClasses")]*/

/**
 * Signal dispatches events to multiple listeners.
 * It is inspired by C# events and delegates, and by
 * <a target="_top" href="http://en.wikipedia.org/wiki/Signals_and_slots">signals and slots</a>
 * in Qt.
 * A Signal adds event dispatching functionality through composition and interfaces,
 * rather than inheriting from a dispatcher.
 * <br/><br/>
 * Project home: <a target="_top" href="http://github.com/robertpenner/as3-signals/">http://github.com/robertpenner/as3-signals/</a>
 */
export class OnceSignal implements IOnceSignal {
    protected _valueClasses: any[]; // of Class
    protected slots: SlotList = SlotList.NIL;

    /**
     * Creates a Signal instance to dispatch value objects.
     *
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new Signal(String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: In AS3, subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    constructor(...valueClasses: any[]) {
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        this.valueClasses = valueClasses.length === 1 && valueClasses[0] instanceof Array ? valueClasses[0] : valueClasses;
    }

    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Invalid valueClasses argument: item at index should be a Class but was not.
     */
    /* [ArrayElementType("Class")]*/
    public get valueClasses(): any[] {
        return this._valueClasses;
    }

    public set valueClasses(value: any[]) {
        // Clone so the Array cannot be affected from outside.
        this._valueClasses = value ? value.slice() : [];
        for (let i: number = this._valueClasses.length; i--; ) {
            if (!(this._valueClasses[i] instanceof Object)) {
                throw new Error(
                    "Invalid valueClasses argument: " +
                        "item at index " +
                        i +
                        " should be a Class but was:<" +
                        this._valueClasses[i] +
                        ">." +
                        this._valueClasses[i]
                ); // @CHANGED - temp replacement for getQualifiedClassByName()
            }
        }
    }

    /** @inheritDoc */
    public get numListeners(): number {
        return this.slots.length;
    }

    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    public addOnce(listener: Function): ISlot {
        return this.registerListener(listener, true);
    }

    /** @inheritDoc */
    public remove(listener: Function): ISlot {
        let slot: ISlot = this.slots.find(listener);
        if (!slot) {
            return null;
        }

        this.slots = this.slots.filterNot(listener);
        return slot;
    }

    /** @inheritDoc */
    public removeAll(): void {
        this.slots = SlotList.NIL;
    }

    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Incorrect number of arguments.
     * @throws ArgumentError <code>ArgumentError</code>: Value object is not an instance of the appropriate valueClasses Class.
     */
    public dispatch(...valueObjects: any[]): void {
        // If valueClasses is empty, value objects are not type-checked.
        let numValueClasses: number = this._valueClasses.length;
        let numValueObjects: number = valueObjects.length;

        // Cannot dispatch fewer objects than declared classes.
        if (numValueObjects < numValueClasses) {
            throw new Error(
                "Incorrect number of arguments. " + "Expected at least " + numValueClasses + " but received " + numValueObjects + "."
            );
        }

        // Cannot dispatch differently typed objects than declared classes.
        for (let i: number = 0; i < numValueClasses; i++) {
            // Optimized for the optimistic case that values are correct.
            if (
                valueObjects[i] === null ||
                valueObjects[i] instanceof this._valueClasses[i] ||
                valueObjects[i].constructor === this._valueClasses[i]
            ) {
                continue;
            }

            throw new Error("Value object <" + valueObjects[i] + "> is not an instance of <" + this._valueClasses[i] + ">.");
        }

        // Broadcast to listeners.
        let slotsToProcess: SlotList = this.slots;
        if (slotsToProcess.nonEmpty) {
            while (slotsToProcess.nonEmpty) {
                slotsToProcess.head.execute(valueObjects);
                slotsToProcess = slotsToProcess.tail;
            }
        }
    }

    protected registerListener(listener: Function, once: boolean = false): ISlot {
        if (this.registrationPossible(listener, once)) {
            let newSlot: ISlot = new Slot(listener, this, once);
            this.slots = this.slots.prepend(newSlot);
            return newSlot;
        }

        return this.slots.find(listener);
    }

    protected registrationPossible(listener: Function, once: boolean): boolean {
        if (!this.slots.nonEmpty) {
            return true;
        }

        let existingSlot: ISlot = this.slots.find(listener);
        if (!existingSlot) {
            return true;
        }

        if (existingSlot.once !== once) {
            // If the listener was previously added, definitely don't add it again.
            // But throw an exception if their once values differ.
            throw new Error("You cannot addOnce() then add() the same listener without removing the relationship first.");
        }

        return false; // Listener was already registered.
    }
}
