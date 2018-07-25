/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";

describe("MonoSignalDispatchExtraArgsTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: MonoSignal;

    beforeEach(() => {
        completed = new MonoSignal();
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });
    it("dispatch_extra_args_should_call_listener_with_extra_args()", done => {
        completed.add(async.add(onCompleted, 10, done));
        completed.dispatch(22, "done", new Date());
    });

    function onCompleted(a: number, b: string, c: Date): void {
        assert.equal(3, arguments.length);
        assert.equal(22, a);
        assert.equal("done", b);
        assert.isTrue(c instanceof Date);
    }
});
