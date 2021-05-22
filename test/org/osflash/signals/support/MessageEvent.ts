/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GenericEvent } from "../../../../../src/org/osflash/signals/events/GenericEvent";
import { IEvent } from "../../../../../src/org/osflash/signals/events/IEvent";

export class MessageEvent extends GenericEvent implements IEvent {
    public message: string;

    public constructor(message: string) {
        super();
        this.message = message;
    }

    /* override*/
    public clone(): IEvent {
        return new MessageEvent(this.message);
    }
}
