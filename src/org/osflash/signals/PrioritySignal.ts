import {Signal} from "./Signal";
import {IPrioritySignal} from "./IPrioritySignal";
import {ISlot} from "./ISlot";
import {Slot} from "./Slot";

export class PrioritySignal extends Signal implements IPrioritySignal {

    constructor(...valueClasses) {
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        valueClasses = (valueClasses.length == 1 && valueClasses[0] instanceof Array) ? valueClasses[0] : valueClasses;

        super(valueClasses);
    }

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

    /*override*/
    protected registerListener(listener: Function, once: boolean = false): ISlot {
        return this.registerListenerWithPriority(listener, once);
    }

    protected registerListenerWithPriority(listener: Function, once: boolean = false, priority: number = 0): ISlot {
        if (this.registrationPossible(listener, once)) {
            var slot: ISlot = new Slot(listener, this, once, priority);
            this.slots = this.slots.insertWithPriority(slot);
            return slot;
        }

        return this.slots.find(listener);
    }

}

