/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IBubbleEventHandler } from "../../../../../src/org/osflash/signals/events/IBubbleEventHandler";
import { IEvent } from "../../../../../src/org/osflash/signals/events/IEvent";

export class BubbleHater implements IBubbleEventHandler {
    public onEventBubbled(event: IEvent): boolean {
        throw new Error("I SAID NO BUBBLES!!!");
    }
}
