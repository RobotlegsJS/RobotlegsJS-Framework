import "../../../entry";

import { assert } from "chai";

import { ISignal } from "../../../../src/org/osflash/signals/ISignal";
import { ISlot } from "../../../../src/org/osflash/signals/ISlot";
import { Signal } from "../../../../src/org/osflash/signals/Signal";
import { MockEvent } from "../../../mock/mock";
import { AsyncUtil } from "../../../util/AsyncUtil";
import { newEmptyHandler, failIfCalled } from "../../../util/TestBase";

describe("SignalTestBase", () => {

    let signal: ISignal;
    let async: AsyncUtil = new AsyncUtil();

    beforeEach(() => {
        signal = new Signal();
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("numListeners_is_0_after_creation", () => {
        assert.equal(0, signal.numListeners);
    });

    it("addOnce_and_dispatch_should_remove_listener_automatically", () => {
        signal.addOnce(newEmptyHandler());
        dispatchSignal();
        assert.equal(0, signal.numListeners, "there should be no listeners");
    });

    it("add_listener_then_remove_then_dispatch_should_not_call_listener", () => {
        signal.add(failIfCalled);
        signal.remove(failIfCalled);
        dispatchSignal();
    });

    it("add_listener_then_remove_function_not_in_listeners_should_do_nothing", () => {
        signal.add(newEmptyHandler());
        signal.remove(newEmptyHandler());
        assert.equal(1, signal.numListeners);
    });

    it("add_2_listeners_remove_2nd_then_dispatch_should_call_1st_not_2nd_listener", () => {
        let called = false;
        signal.add(function(e: any = null): void {
            called = true;
        });
        signal.add(failIfCalled);
        signal.remove(failIfCalled);
        dispatchSignal();
        assert.isTrue(called);
    });

    it("add_2_listeners_should_yield_numListeners_of_2", () => {
        signal.add(newEmptyHandler());
        signal.add(newEmptyHandler());
        assert.equal(2, signal.numListeners);
    });

    it("add_2_listeners_then_remove_1_should_yield_numListeners_of_1", () => {
        let firstFunc: Function = newEmptyHandler();
        signal.add(firstFunc);
        signal.add(newEmptyHandler());
        signal.remove(firstFunc);

        assert.equal(1, signal.numListeners);
    });

    it("add_2_listeners_then_removeAll_should_yield_numListeners_of_0", () => {
        signal.add(newEmptyHandler());
        signal.add(newEmptyHandler());
        signal.removeAll();
        assert.equal(0, signal.numListeners);
    });

    it("add_same_listener_twice_should_only_add_it_once", () => {
        let func: Function = newEmptyHandler();
        signal.add(func);
        signal.add(func);
        assert.equal(1, signal.numListeners);
    });

    it("addOnce_same_listener_twice_should_only_add_it_once", () => {
        let func: Function = newEmptyHandler();
        signal.addOnce(func);
        signal.addOnce(func);
        assert.equal(1, signal.numListeners);
    });

    it("add_two_listeners_and_dispatch_should_call_both", () => {
        let calledA = false;
        let calledB = false;
        signal.add(function(e: any = null): void {
            calledA = true;
        });
        signal.add(function(e: any = null): void {
            calledB = true;
        });
        dispatchSignal();
        assert.isTrue(calledA);
        assert.isTrue(calledB);
    });


    it("add_the_same_listener_twice_should_not_throw_error", () => {
        let listener: Function = newEmptyHandler();
        signal.add(listener);
        signal.add(listener);
    });

    it("dispatch_2_listeners_1st_listener_removes_itself_then_2nd_listener_is_still_called", (done) => {
        signal.add(selfRemover);

        // async.add verifies the second listener is called
        signal.add(async.add(newEmptyHandler(), 10, done));
        dispatchSignal();
    });

    it("dispatch_2_listeners_1st_listener_removes_all_then_2nd_listener_is_still_called", (done) => {
        signal.add(async.add(allRemover, 10));
        signal.add(async.add(newEmptyHandler(), 10, done));
        dispatchSignal();
    });

    it("adding_a_listener_during_dispatch_should_not_call_it", (done) => {
        signal.add(async.add(addListenerDuringDispatch, 10, done));
        dispatchSignal();
    });

    // TODO: clarify test purpose through naming and/or implementation
    it("can_use_anonymous_listeners", () => {
        let slots: any[] = [];

        for (let i = 0; i < 10; i++) {
            slots.push(signal.add(newEmptyHandler()));
        }
        assert.equal(10, signal.numListeners, "there should be 10 listeners");

        for (let slot of slots) {
            signal.remove(slot.listener);
        }
        assert.equal(0, signal.numListeners, "all anonymous listeners removed");
    });

    // TODO: clarify test purpose through naming and/or implementation
    it("can_use_anonymous_listeners_in_addOnce", () => {
        let slots: any[] = [];

        for (let i = 0; i < 10; i++) {
            slots.push(signal.addOnce(newEmptyHandler()));
        }
        assert.equal(10, signal.numListeners, "there should be 10 listeners");

        for (let slot of slots) {
            signal.remove(slot.listener);
        }
        assert.equal(0, signal.numListeners, "all anonymous listeners removed");
    });

    it("add_listener_returns_slot_with_same_listener", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);
        assert.equal(listener, slot.listener);
    });

    it("remove_listener_returns_same_slot_as_when_it_was_added", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);
        assert.equal(slot, signal.remove(listener));
    });


    function selfRemover(e: any = null): void {
        signal.remove(selfRemover);
    }

    function allRemover(e: any = null): void {
        signal.removeAll();
    }

    function dispatchSignal(): void {
        signal.dispatch(new MockEvent("test"));
    }

    function addListenerDuringDispatch(e: any = null): void {
        signal.add(failIfCalled);
    }
});
