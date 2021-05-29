/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { Signal } from "../../../../src/org/osflash/signals/Signal";

describe("SignalDispatchArgsTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: Signal;

    function checkDispatchedValues(a: number, b: string, c: Date): void {
        assert.equal(3, arguments.length, "correct number of arguments were dispatched");
        assert.equal(22, a, "the uint was dispatched");
        assert.equal("done", b, "the String was dispatched");
        assert.isTrue(c instanceof Date, "a Date was dispatched");
    }

    beforeEach(() => {
        completed = new Signal();
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("dispatch_two_correct_value_objects_should_succeed()", () => {
        let signal: Signal = new Signal(String, Number);
        signal.dispatch("the Answer", 42);
    });

    it("dispatch_fewer_value_objects_than_value_classes_should_should_throw_ArgumentError()", () => {
        let signal: Signal = new Signal(Date, Array);
        assert.throws(() => signal.dispatch(new Date()), Error);
    });

    it("dispatch_more_value_objects_than_value_classes_should_succeed()", () => {
        let signal: Signal = new Signal(Date, Array);
        signal.dispatch(new Date(), new Array(), "extra value object");
    });

    it("dispatch_values_with_no_value_classes_defined_should_pass_to_listener()", () => {
        let signalNoValueClasses: Signal = new Signal();
        signalNoValueClasses.add(async.add(checkDispatchedValues, 10));
        signalNoValueClasses.dispatch(22, "done", new Date());
    });

    it("dispatch_one_correct_and_one_incorrect_value_object_should_throw_ArgumentError()", () => {
        let signal: Signal = new Signal(Date, Array);
        assert.throws(() => signal.dispatch(new Date(), "wrong value type"), Error);
    });
});
