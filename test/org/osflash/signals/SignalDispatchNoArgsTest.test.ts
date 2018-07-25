/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { ISignal } from "../../../../src/org/osflash/signals/ISignal";
import { Signal } from "../../../../src/org/osflash/signals/Signal";

describe("SignalDispatchNoArgsTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let signal: ISignal;

    beforeEach(() => {
        signal = new Signal();
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("dispatch_no_args_should_call_listener_with_no_args", done => {
        signal.add(async.add(onCompleted, 10, done));
        signal.dispatch();
    });

    function onCompleted(): void {
        assert.equal(0, arguments.length);
    }

    it("addOnce_in_handler_and_dispatch_should_call_new_listener", done => {
        signal.addOnce(async.add(addOnceInHandler, 10));
        signal.dispatch(done);
    });

    function addOnceInHandler(done: Function): void {
        signal.addOnce(async.add(new Function(), 10, done));
        signal.dispatch();
    }
});
