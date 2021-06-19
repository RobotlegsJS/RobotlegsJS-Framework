/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { Signal } from "../../../../src/org/osflash/signals/Signal";
import "../../../entry";
import { AsyncUtil } from "../../../util/AsyncUtil";
import { MessageEvent } from "./support/MessageEvent";

describe("SignalWithCustomEventTest", () => {
    let async: AsyncUtil = new AsyncUtil();
    let messaged: Signal;

    function onMessage(e: MessageEvent): void {
        assert.equal("ok", e.message, "message value in the event");
    }

    beforeEach(() => {
        messaged = new Signal(MessageEvent);
    });

    afterEach(() => {
        messaged.removeAll();
        messaged = null;
    });

    it("valueClasses_roundtrip_through_constructor()", () => {
        assert.equal(MessageEvent, messaged.valueClasses[0]);
        assert.equal(1, messaged.valueClasses.length);
    });

    it("valueClasses_roundtrip_through_setter()", () => {
        messaged.valueClasses = [GenericEvent];
        assert.equal(GenericEvent, messaged.valueClasses[0]);
        assert.equal(1, messaged.valueClasses.length);
    });

    it("valueClasses_setter_clones_the_array()", () => {
        let newValueClasses: any[] = [GenericEvent];
        messaged.valueClasses = newValueClasses;
        assert.notEqual(newValueClasses, messaged.valueClasses);
    });

    it("add_one_listener_and_dispatch()", () => {
        messaged.add(async.add(onMessage, 50));
        messaged.dispatch(new MessageEvent("ok"));
    });

    // TODO: Skipping because of valueClasses issue in OnceSignal
    it("dispatch_wrong_event_type_should_throw_ArgumentError()", () => {
        assert.throws(() => messaged.dispatch(new GenericEvent()), Error);
    });

    it("constructing_signal_with_non_class_should_throw_ArgumentError()", () => {
        assert.throws(() => new Signal(5), Error);
    });

    it("constructing_signal_with_two_nulls_should_throw_ArgumentError()", () => {
        assert.throws(() => new Signal(null, null), Error);
    });

    it("constructing_signal_with_class_and_non_class_should_throw_ArgumentError()", () => {
        assert.throws(() => new Signal(Date, 42));
    });
});
