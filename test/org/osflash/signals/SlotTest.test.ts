/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { Signal } from "../../../../src/org/osflash/signals/Signal";
import { Slot } from "../../../../src/org/osflash/signals/Slot";
import { ISlot } from "../../../../src/org/osflash/signals/ISlot";

import { assert } from "chai";

describe("SlotTest", () => {
    let signal: Signal;
    let slot: ISlot;
    let expected: any[];
    let received: any[];

    function listener0(): void {
        received = [];
    }

    function listener1(value: any): void {
        received = [value];
    }

    function listener2(value1: any, value2: any): void {
        received = [value1, value2];
    }

    function listener3(value1: any, value2: any, value3: any): void {
        received = [value1, value2, value3];
    }

    function listener4(value1: any, value2: any, value3: any, value4: any): void {
        received = [value1, value2, value3, value4];
    }

    function listener5(value1: any, value2: any, value3: any, value4: any, value5: any): void {
        received = [value1, value2, value3, value4, value5];
    }

    beforeEach(() => {
        signal = new Signal();
        expected = null;
        received = null;
    });

    afterEach(() => {
        signal = null;
        slot = null;
        expected = null;
        received = null;
    });

    it("create_slot_with_null_listener_should_throw_a_error", () => {
        assert.throws(() => {
            slot = new Slot(null, signal);
        }, Error);
    });

    it("create_slot_with_null_signal_should_throw_a_error", () => {
        assert.throws(() => {
            slot = new Slot(listener0, null);
        }, Error);
    });

    it("execute0_should_not_call_listener_when_disabled", () => {
        slot = new Slot(listener0, signal);
        slot.enabled = false;
        slot.execute0();
        assert.isFalse(slot.enabled);
        assert.isNull(received);
    });

    it("execute0_should_call_listener_without_passing_any_parameter", () => {
        expected = [];
        slot = new Slot(listener0, signal);
        slot.execute0();
        assert.deepEqual(received, expected);
    });

    it("execute0_with_one_parameter_should_call_listener_passing_one_parameter", () => {
        expected = [42];
        slot = new Slot(listener1, signal);
        slot.params = expected;
        slot.execute0();
        assert.deepEqual(received, expected);
    });

    it("execute0_with_two_parameters_should_call_listener_passing_two_parameters", () => {
        expected = ["The answer is", 42];
        slot = new Slot(listener2, signal);
        slot.params = expected;
        slot.execute0();
        assert.deepEqual(received, expected);
    });

    it("execute0_with_once_enabled_should_remove_listener", () => {
        expected = [];
        slot = new Slot(listener0, signal, true);
        slot.execute0();
        assert.deepEqual(received, expected);
    });

    it("execute1_should_not_call_listener_when_disabled", () => {
        slot = new Slot(listener1, signal);
        slot.enabled = false;
        slot.execute1(42);
        assert.isFalse(slot.enabled);
        assert.isNull(received);
    });

    it("execute1_should_call_listener_passing_exactly_one_parameter", () => {
        expected = [42];
        slot = new Slot(listener1, signal);
        slot.execute1(expected[0]);
        assert.deepEqual(received, expected);
    });

    it("execute1_with_one_parameter_should_call_listener_passing_value_and_parameter", () => {
        expected = ["The answer is", 42];
        slot = new Slot(listener2, signal);
        slot.params = [expected[1]];
        slot.execute1(expected[0]);
        assert.deepEqual(received, expected);
    });

    it("execute1_with_two_parameters_should_call_listener_passing_value_and_two_parameters", () => {
        expected = ["The answer is", 42, "not anymore?"];
        slot = new Slot(listener3, signal);
        slot.params = [expected[1], expected[2]];
        slot.execute1(expected[0]);
        assert.deepEqual(received, expected);
    });

    it("execute1_with_once_enabled_should_remove_listener", () => {
        expected = [42];
        slot = new Slot(listener1, signal, true);
        slot.execute1(expected[0]);
        assert.deepEqual(received, expected);
    });

    it("execute_should_not_call_listener_when_disabled", () => {
        slot = new Slot(listener0, signal);
        slot.enabled = false;
        slot.execute(["to be ignored"]);
        assert.isFalse(slot.enabled);
        assert.isNull(received);
    });

    it("execute_without_value_should_call_listener_passing_no_value", () => {
        expected = [];
        slot = new Slot(listener0, signal);
        slot.execute(expected);
        assert.deepEqual(received, expected);
    });

    it("execute_with_one_value_should_call_listener_passing_exactly_one_value", () => {
        expected = [1];
        slot = new Slot(listener1, signal);
        slot.execute(expected);
        assert.deepEqual(received, expected);
    });

    it("execute_with_two_values_should_call_listener_passing_exactly_two_values", () => {
        expected = [1, 2];
        slot = new Slot(listener2, signal);
        slot.execute(expected);
        assert.deepEqual(received, expected);
    });

    it("execute_with_three_values_should_call_listener_passing_exactly_three_values", () => {
        expected = [1, 2, 3];
        slot = new Slot(listener3, signal);
        slot.execute(expected);
        assert.deepEqual(received, expected);
    });

    it("execute_with_four_values_should_call_listener_passing_exactly_four_values", () => {
        expected = [1, 2, 3, 4];
        slot = new Slot(listener4, signal);
        slot.execute(expected);
        assert.deepEqual(received, expected);
    });

    it("execute_with_four_values_and_one_parameter_should_call_listener_passing_exactly_five_values", () => {
        expected = [1, 2, 3, 4, 5];
        slot = new Slot(listener5, signal);
        slot.params = expected.slice(4);
        slot.execute(expected.slice(0, 4));
        assert.deepEqual(received, expected);
    });

    it("get_listener_should_return_listener", () => {
        slot = new Slot(listener0, signal);
        assert.equal(slot.listener, listener0);
    });

    it("set_null_listener_should_throw_a_error", () => {
        assert.throws(() => {
            slot = new Slot(listener0, signal);
            slot.listener = null;
        }, Error);
    });

    it("set_listener_should_change_listener", () => {
        slot = new Slot(listener0, signal);
        slot.listener = listener1;
        assert.equal(slot.listener, listener1);
    });

    it("toString_should_return_string", () => {
        slot = new Slot(listener0, signal);
        assert.isString(slot.toString());
    });
});
