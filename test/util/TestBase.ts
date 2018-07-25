/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { GenericEvent } from "../../src/org/osflash/signals/events/GenericEvent";
import { Sprite } from "../mock/Sprite";

export function newEmptyHandler(): Function {
    return function(e: any = null, ...args: any[]): void {};
}

export function failIfCalled(e: any = null): void {
    assert.fail("This function should not have been called.");
}

export function checkGenericEvent(event: GenericEvent): void {
    assert.isNotOk(event.signal, "event.signal is not set by Signal");
    assert.isNotOk(event.target, "event.target is not set by Signal");
}

export function checkSprite(sprite: Sprite): void {
    assert.isTrue(sprite instanceof Sprite);
}
