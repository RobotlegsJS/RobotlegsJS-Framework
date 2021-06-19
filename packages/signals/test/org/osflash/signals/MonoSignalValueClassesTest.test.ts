/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assert } from "chai";
import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";
import "../../../entry";

describe("MonoSignalValueClassesTest", () => {
    let signal: MonoSignal;

    beforeEach(() => {
        signal = new MonoSignal(Number, String, Boolean);
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("get_value_classes_should_return_same_value_classes_used_in_constructor()", () => {
        assert.deepEqual(signal.valueClasses, [Number, String, Boolean]);
    });

    it("constructor_should_accept_array_of_value_classes()", () => {
        signal = new MonoSignal([Number, String, Boolean]);
        assert.deepEqual(signal.valueClasses, [Number, String, Boolean]);
    });

    it("set_value_classes_should_accept_only_class_objects()", () => {
        signal.valueClasses = [Number, String, Boolean];
    });

    it("set_value_classes_should_accept_null()", () => {
        signal.valueClasses = null;
        assert.deepEqual(signal.valueClasses, []);
    });

    it("set_value_classes_should_accept_undefined()", () => {
        signal.valueClasses = undefined;
        assert.deepEqual(signal.valueClasses, []);
    });

    it("set_value_classes_throws_error_when_objects_are_passed()", () => {
        assert.throws(() => {
            signal.valueClasses = [0, "", false];
        }, Error);
    });

    it("dispatch_less_value_objects_throws_error_when_number_of_arguments_are_less_than_number_of_value_classes_1()", () => {
        assert.throws(() => {
            signal.dispatch(0);
        }, Error);
    });

    it("dispatch_less_value_objects_throws_error_when_number_of_arguments_are_less_than_number_of_value_classes_2()", () => {
        assert.throws(() => {
            signal.dispatch(0, "");
        }, Error);
    });

    it("dispatch_value_object_with_different_type_throws_error_1()", () => {
        assert.throws(() => {
            signal.dispatch(0, 0, 0);
        }, Error);
    });

    it("dispatch_value_object_with_different_type_throws_error_2()", () => {
        assert.throws(() => {
            signal.dispatch("", "", "");
        }, Error);
    });

    it("dispatch_value_object_with_different_type_throws_error_3()", () => {
        assert.throws(() => {
            signal.dispatch(true, true, true);
        }, Error);
    });

    it("dispatch_value_object_with_correct_type_just_works()", () => {
        signal.dispatch(0, "hello", true);
    });
});
