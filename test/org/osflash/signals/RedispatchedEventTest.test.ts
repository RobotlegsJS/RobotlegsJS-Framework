/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { DeluxeSignal } from "../../../../src/org/osflash/signals/DeluxeSignal";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";

describe("RedispatchedEventTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: DeluxeSignal;
    let originalEvent: GenericEvent;

    beforeEach(() => {
        completed = new DeluxeSignal(this);
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("dispatch_event_already_dispatched_should_clone_it", (done) => {
        completed.add(async.add(redispatchEvent, 10));
        originalEvent = new GenericEvent();
        completed.dispatch(originalEvent, done);
    });

    function redispatchEvent(e: GenericEvent, done: Function): void {
        (e.signal as DeluxeSignal).removeAll();
        assert.equal(originalEvent, e);
        completed.add(async.add(check_redispatched_event_is_not_original, 10, done));

        completed.dispatch(originalEvent);
    }

    function check_redispatched_event_is_not_original(e: GenericEvent): void {
        assert.notEqual(originalEvent, e);
    }
});
