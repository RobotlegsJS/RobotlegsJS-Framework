/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Signal } from "./Signal";
import { IPrioritySignal } from "./IPrioritySignal";
import { ISlot } from "./ISlot";
import { Slot } from "./Slot";

export class PrioritySignal extends Signal implements IPrioritySignal {
    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    public addWithPriority(listener: Function, priority: number = 0): ISlot {
        return this.registerListenerWithPriority(listener, false, priority);
    }

    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    public addOnceWithPriority(listener: Function, priority: number = 0): ISlot {
        return this.registerListenerWithPriority(listener, true, priority);
    }

    /* override*/
    protected registerListener(listener: Function, once: boolean = false): ISlot {
        return this.registerListenerWithPriority(listener, once);
    }

    protected registerListenerWithPriority(
        listener: Function,
        once: boolean,
        priority: number = 0
    ): ISlot {
        if (this.registrationPossible(listener, once)) {
            let slot: ISlot = new Slot(listener, this, once, priority);
            this.slots = this.slots.insertWithPriority(slot);
            return slot;
        }

        return this.slots.find(listener);
    }
}
