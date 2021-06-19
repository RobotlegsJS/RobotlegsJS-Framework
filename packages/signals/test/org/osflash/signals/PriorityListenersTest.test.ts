/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { DeluxeSignal } from "../../../../src/org/osflash/signals/DeluxeSignal";
import "../../../entry";
import { AsyncUtil } from "../../../util/AsyncUtil";

describe("PriorityListenersTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: DeluxeSignal;
    let listenersToCall: number;
    let listenersCalled: any[];
    let callback: Function;

    function checkCallback(): void {
        if (listenersCalled.length >= listenersToCall) {
            callback();
        }
    }

    function listener0(): void {
        listenersCalled.push(listener0);
        assert.equal(listener0, listenersCalled[0], "this should be the first listener called");
        checkCallback();
    }

    function listener1(): void {
        listenersCalled.push(listener1);
        assert.equal(listener1, listenersCalled[1], "this should be the second listener called");
        checkCallback();
    }

    function listener2(): void {
        listenersCalled.push(listener2);
        assert.equal(listener2, listenersCalled[2], "this should be the third listener called");
        checkCallback();
    }

    beforeEach(() => {
        completed = new DeluxeSignal(this);
        listenersCalled = [];
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
        listenersCalled = null;
        callback = null;
    });

    it("listener_added_second_with_higher_priority_should_be_called_first()", (done) => {
        listenersToCall = 2;
        callback = done;

        completed.addWithPriority(async.add(listener1, 5));
        completed.addWithPriority(async.add(listener0, 5), 10);

        completed.dispatch();
    });

    it("listeners_added_with_same_priority_should_be_called_in_order_added()", (done) => {
        listenersToCall = 3;
        callback = done;

        completed.addWithPriority(async.add(listener0, 5), 10);
        completed.addWithPriority(async.add(listener1, 5), 10);
        completed.addWithPriority(async.add(listener2, 5), 10);

        completed.dispatch();
    });

    it("listeners_with_high_priority_should_be_called_first", (done) => {
        listenersToCall = 3;
        callback = done;

        completed.addWithPriority(async.add(listener2, 5), 0);
        completed.addWithPriority(async.add(listener1, 5), 5);
        completed.addWithPriority(async.add(listener0, 5), 10);

        completed.dispatch();
    });
});
