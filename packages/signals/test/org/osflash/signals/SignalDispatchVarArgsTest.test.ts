/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { Signal } from "../../../../src/org/osflash/signals/Signal";
import { ISignal } from "../../../../src/org/osflash/signals/ISignal";

describe("SignalDispatchVarArgsTest", () => {
    let signal: ISignal;

    function handlerArgsAt0(): Function {
        return function (...args: any[]): void {
            assert.deepEqual([0, 1, 2, 3], args, "Arguments should be [0,1,2,3]");
            assert.equal(4, args.length, "Number of var arguments should be 4");
        };
    }

    function handlerArgsAt1(): Function {
        return function (a: number, ...args: any[]): void {
            assert.deepEqual([1, 2, 3], args, "Arguments should be [1,2,3]");
            assert.equal(3, args.length, "Number of var arguments should be 3");
        };
    }

    function handlerArgsAt2(): Function {
        return function (a: number, b: number, ...args: any[]): void {
            assert.deepEqual([2, 3], args, "Arguments should be [2,3]");
            assert.equal(2, args.length, "Number of var arguments should be 2");
        };
    }

    function verifyNumArgs(...args: any[]): void {
        assert.equal(4, args.length, "Number of arguments should be 4");
    }

    beforeEach(() => {
        signal = new Signal(Number, Number, Number, Number);
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("adding_vararg_at_0_should_not_throw_error()", () => {
        signal.add(handlerArgsAt0());
    });

    it("adding_vararg_at_1_should_not_throw_error()", () => {
        signal.add(handlerArgsAt1());
    });

    it("adding_vararg_at_2_should_not_throw_error()", () => {
        signal.add(handlerArgsAt2());
    });

    it("adding_vararg_at_0_then_dispatch_should_not_throw_error()", () => {
        signal.add(handlerArgsAt0());
        signal.dispatch(0, 1, 2, 3);
    });

    it("adding_vararg_at_1_then_dispatch_should_not_throw_error()", () => {
        signal.add(handlerArgsAt1());
        signal.dispatch(0, 1, 2, 3);
    });

    it("adding_vararg_at_2_then_dispatch_should_not_throw_error()", () => {
        signal.add(handlerArgsAt2());
        signal.dispatch(0, 1, 2, 3);
    });

    it("verify_num_args_after_dispatch()", () => {
        signal.add(verifyNumArgs);
        signal.dispatch(0, 1, 2, 3);
    });

    it("verify_redispatch_of_signal()", () => {
        let redispatch: Signal = new Signal();
        redispatch.add(handlerArgsAt0());

        // TODO - not really sure if binding solves the issue here, otherwise this === undefined
        signal.add(redispatch.dispatch.bind(redispatch));
        signal.dispatch(0, 1, 2, 3);
    });
});
