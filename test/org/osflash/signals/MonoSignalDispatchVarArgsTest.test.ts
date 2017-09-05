import "../../../entry";

import { assert } from "chai";

import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";

describe("MonoSignalDispatchVarArgsTest", () => {
    let completed: MonoSignal;

    beforeEach(() => {
        completed = new MonoSignal(Number, Number, Number, Number);
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("adding_vararg_at_0_should_not_throw_error()", () => {
        completed.add(handlerArgsAt0());
    });

    it("adding_vararg_at_1_should_not_throw_error()", () => {
        completed.add(handlerArgsAt1());
    });

    it("adding_vararg_at_2_should_not_throw_error()", () => {
        completed.add(handlerArgsAt2());
    });

    it("adding_vararg_at_0_then_dispatch_should_not_throw_error()", () => {
        completed.add(handlerArgsAt0());
        completed.dispatch(0, 1, 2, 3);
    });

    it("adding_vararg_at_1_then_dispatch_should_not_throw_error()", () => {
        completed.add(handlerArgsAt1());
        completed.dispatch(0, 1, 2, 3);
    });

    it("adding_vararg_at_2_then_dispatch_should_not_throw_error()", () => {
        completed.add(handlerArgsAt2());
        completed.dispatch(0, 1, 2, 3);
    });

    it("verify_num_args_after_dispatch()", () => {
        completed.add(verifyNumArgs);
        completed.dispatch(0, 1, 2, 3);
    });

    function handlerArgsAt0(): Function {
        return function(...args): void {
            assert.deepEqual(
                [0, 1, 2, 3],
                args,
                "Arguments should be [0,1,2,3]"
            );
            assert.equal(4, args.length, "Number of var arguments should be 4");
        };
    }

    function handlerArgsAt1(): Function {
        return function(a: number, ...args): void {
            assert.deepEqual([1, 2, 3], args, "Arguments should be [1,2,3]");
            assert.equal(3, args.length, "Number of var arguments should be 3");
        };
    }

    function handlerArgsAt2(): Function {
        return function(a: number, b: number, ...args): void {
            assert.deepEqual([2, 3], args, "Arguments should be [2,3]");
            assert.equal(2, args.length, "Number of var arguments should be 2");
        };
    }

    function verifyNumArgs(...args): void {
        assert.equal(4, args.length, "Number of arguments should be 4");
    }
});
