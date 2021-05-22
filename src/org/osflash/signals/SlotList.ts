/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ISlot } from "./ISlot";

/**
 * The SlotList class represents an immutable list of Slot objects.
 *
 * @author Joa Ebert
 * @author Robert Penner
 */
export class SlotList {
    /**
     * Represents an empty list. Used as the list terminator.
     */
    public static NIL: SlotList = new SlotList(null, null);

    // Although those variables are not const, they would be if AS3 would handle it correctly.
    public head: ISlot;
    public tail: SlotList;
    public nonEmpty: boolean = false;

    /**
     * Creates and returns a new SlotList object.
     *
     * <p>A user never has to create a SlotList manually.
     * Use the <code>NIL</code> element to represent an empty list.
     * <code>NIL.prepend(value)</code> would create a list containing <code>value</code></p>.
     *
     * @param head The first slot in the list.
     * @param tail A list containing all slots except head.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Parameters head and tail are null. Use the NIL element instead.
     * @throws ArgumentError <code>ArgumentError</code>: Parameter head cannot be null.
     */
    public constructor(head: ISlot, tail: SlotList = null) {
        if (!head && !tail) {
            if (SlotList.NIL) {
                throw new Error("Parameters head and tail are null. Use the NIL element instead.");
            }

            // this is the NIL element as per definition
            this.nonEmpty = false;
        } else if (!head) {
            throw new Error("Parameter head cannot be null.");
        } else {
            this.head = head;
            this.tail = tail || SlotList.NIL;
            this.nonEmpty = true;
        }
    }

    /**
     * The number of slots in the list.
     */
    public get length(): number {
        if (!this.nonEmpty) {
            return 0;
        }

        if (this.tail === SlotList.NIL) {
            return 1;
        }

        // We could cache the length, but it would make methods like filterNot unnecessarily complicated.
        // Instead we assume that O(n) is okay since the length property is used in rare cases.
        // We could also cache the length lazy, but that is a waste of another 8b per list node (at least).

        let result: number = 0;
        let p: SlotList = this;

        while (p.nonEmpty) {
            ++result;
            p = p.tail;
        }

        return result;
    }

    /**
     * Prepends a slot to this list.
     *
     * @param    slot The item to be prepended.
     * @return    A list consisting of slot followed by all elements of this list.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Parameter head cannot be null.
     */
    public prepend(slot: ISlot): SlotList {
        return new SlotList(slot, this);
    }

    /**
     * Appends a slot to this list.
     * Note: appending is O(n). Where possible, prepend which is O(1).
     * In some cases, many list items must be cloned to
     * avoid changing existing lists.
     *
     * @param    slot The item to be appended.
     * @return    A list consisting of all elements of this list followed by slot.
     */
    public append(slot: ISlot): SlotList {
        if (!slot) {
            return this;
        }

        if (!this.nonEmpty) {
            return new SlotList(slot);
        }

        // Special case: just one slot currently in the list.
        if (this.tail === SlotList.NIL) {
            return new SlotList(slot).prepend(this.head);
        }

        // The list already has two or more slots.
        // We have to build a new list with cloned items because they are immutable.
        let wholeClone: SlotList = new SlotList(this.head);
        let subClone: SlotList = wholeClone;
        let current: SlotList = this.tail;

        while (current.nonEmpty) {
            subClone = subClone.tail = new SlotList(current.head);
            current = current.tail;
        }

        // Append the new slot last.
        subClone.tail = new SlotList(slot);
        return wholeClone;
    }

    /**
     * Insert a slot into the list in a position according to its priority.
     * The higher the priority, the closer the item will be inserted to the list head.
     *
     * @params slot The item to be inserted.
     *
     * @throws ArgumentError <code>ArgumentError</code>: Parameters head and tail are null. Use the NIL element instead.
     * @throws ArgumentError <code>ArgumentError</code>: Parameter head cannot be null.
     */
    public insertWithPriority(slot: ISlot): SlotList {
        if (!this.nonEmpty) {
            return new SlotList(slot);
        }

        let priority: number = slot.priority;

        // Special case: new slot has the highest priority.
        if (priority > this.head.priority) {
            return this.prepend(slot);
        }

        let wholeClone: SlotList = new SlotList(this.head);
        let subClone: SlotList = wholeClone;
        let current: SlotList = this.tail;

        // Find a slot with lower priority and go in front of it.
        while (current.nonEmpty) {
            if (priority > current.head.priority) {
                subClone.tail = current.prepend(slot);
                return wholeClone;
            }
            subClone = subClone.tail = new SlotList(current.head);
            current = current.tail;
        }

        // Slot has lowest priority.
        subClone.tail = new SlotList(slot);
        return wholeClone;
    }

    /**
     * Returns the slots in this list that do not contain the supplied listener.
     * Note: assumes the listener is not repeated within the list.
     *
     * @param    listener The function to remove.
     * @return A list consisting of all elements of this list that do not have listener.
     */
    public filterNot(listener: Function): SlotList {
        if (!this.nonEmpty || listener == null) {
            return this;
        }

        if (listener === this.head.listener) {
            return this.tail;
        }

        // The first item wasn't a match so the filtered list will contain it.
        let wholeClone: SlotList = new SlotList(this.head);
        let subClone: SlotList = wholeClone;
        let current: SlotList = this.tail;

        while (current.nonEmpty) {
            if (current.head.listener === listener) {
                // Splice out the current head.
                subClone.tail = current.tail;
                return wholeClone;
            }

            subClone = subClone.tail = new SlotList(current.head);
            current = current.tail;
        }

        // The listener was not found so this list is unchanged.
        return this;
    }

    /**
     * Determines whether the supplied listener Function is contained within this list
     */
    public contains(listener: Function): boolean {
        if (!this.nonEmpty) {
            return false;
        }

        let p: SlotList = this;

        while (p.nonEmpty) {
            if (p.head.listener === listener) {
                return true;
            }

            p = p.tail;
        }

        return false;
    }

    /**
     * Retrieves the ISlot associated with a supplied listener within the SlotList.
     *
     * @param   listener The Function being searched for
     * @return  The ISlot in this list associated with the listener parameter through the ISlot.listener property.
     *          Returns null if no such ISlot instance exists or the list is empty.
     */
    public find(listener: Function): ISlot {
        if (!this.nonEmpty) {
            return null;
        }

        let p: SlotList = this;

        while (p.nonEmpty) {
            if (p.head.listener === listener) {
                return p.head;
            }

            p = p.tail;
        }

        return null;
    }

    public toString(): string {
        let buffer: string = "";
        let p: SlotList = this;

        while (p.nonEmpty) {
            buffer += p.head + " -> ";
            p = p.tail;
        }

        buffer += "NIL";

        return "[List " + buffer + "]";
    }
}
