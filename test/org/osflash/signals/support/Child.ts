/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IBubbleEventHandler } from "../../../../../src/org/osflash/signals/events/IBubbleEventHandler";
import { DeluxeSignal } from "../../../../../src/org/osflash/signals/DeluxeSignal";
import { IEvent } from "../../../../../src/org/osflash/signals/events/IEvent";

export class Child implements IBubbleEventHandler {
    public parent: any;
    public completed: DeluxeSignal;
    public name: string;
    public listener: Function = null;
    public popsBubbles: boolean = false;

    constructor(parent: any = null, name: string = "", listener: Function = null) {
        this.parent = parent;
        this.name = name;
        this.listener = listener;
        this.completed = new DeluxeSignal(this);
    }

    public toString(): string {
        return "[Child " + this.name + "]";
    }

    public onEventBubbled(event: IEvent): boolean {
        if (this.listener !== null) {
            return this.listener(event);
        } else {
            return !this.popsBubbles;
        }
    }
}
