/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { Signal } from "../../../../src/org/osflash/signals/Signal";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { ISlot } from "../../../../src/org/osflash/signals/ISlot";
import { AsyncUtil } from "../../../util/AsyncUtil";
import { checkGenericEvent } from "../../../util/TestBase";

describe("SlotPauseResumeTest", () => {
    let signal: Signal;
    let async: AsyncUtil = new AsyncUtil();

    beforeEach(() => {
        signal = new Signal();
    });

    it("add_listener_pause_then_resume_on_slot_should_dispatch", (done) => {
        let slot: ISlot = signal.add(async.add(checkGenericEvent, 10, done));
        slot.enabled = false;
        slot.enabled = true;

        signal.dispatch(new GenericEvent());
    });

    it("addOnce_listener_pause_then_resume_on_slot_should_dispatch", (done) => {
        let slot: ISlot = signal.addOnce(async.add(checkGenericEvent, 10, done));
        slot.enabled = false;
        slot.enabled = true;

        signal.dispatch(new GenericEvent());
    });
});
