import {assert} from "chai";

import {ISignal} from "../../../../src/org/osflash/signals/ISignal";
import {ISlot} from "../../../../src/org/osflash/signals/ISlot";
import {Signal} from "../../../../src/org/osflash/signals/Signal";
import {Sprite, MockMouseEvent, MockEvent} from "../../../mock/mock";

describe("SlotListTest", () => {

    let signal: ISignal;

    beforeEach(() => {
        signal = new Signal();
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("add_listener_pause_on_slot_should_not_dispatch", () => {
        let slot: ISlot = signal.add(failIfCalled);
        slot.enabled = false;

        signal.dispatch(new MockEvent("click"));
    });

    it("add_listener_switch_pause_and_resume_on_slot_should_not_dispatch", () => {
        let slot: ISlot = signal.add(failIfCalled);
        slot.enabled = false;
        slot.enabled = true;
        slot.enabled = false;

        signal.dispatch(new MockEvent("click"));
    });

    it("add_listener_then_dispatch_change_listener_on_slot_should_dispatch_second_listener", () => {
        let slot: ISlot = signal.add(newEmptyHandler());

        signal.dispatch(new MockEvent("click"));

        slot.listener = newEmptyHandler();

        signal.dispatch(new MockEvent("click"));
    });

    it("add_listener_then_dispatch_change_listener_on_slot_then_pause_should_not_dispatch_second_listener", () => {
        let slot: ISlot = signal.add(newEmptyHandler());

        signal.dispatch(new MockEvent("click"));

        slot.listener = failIfCalled;
        slot.enabled = false;

        signal.dispatch(new MockEvent("click"));
    });

    it("add_listener_then_change_listener_then_switch_back_and_then_should_dispatch", () => {
        let slot: ISlot = signal.add(newEmptyHandler());

        signal.dispatch(new MockEvent("click"));

        let listener: Function = slot.listener;

        slot.listener = failIfCalled;
        slot.listener = listener;

        signal.dispatch(new MockEvent("click"));
    });

    it("addOnce_listener_pause_on_slot_should_not_dispatch", () => {
        let slot: ISlot = signal.addOnce(failIfCalled);
        slot.enabled = false;

        signal.dispatch(new MockEvent("click"));
    });

    it("addOnce_listener_switch_pause_and_resume_on_slot_should_not_dispatch", () => {
        let slot: ISlot = signal.addOnce(failIfCalled);
        slot.enabled = false;
        slot.enabled = true;
        slot.enabled = false;

        signal.dispatch(new MockEvent("click"));
    });

    it("addOnce_listener_then_dispatch_change_listener_on_slot_should_dispatch_second_listener", () => {
        let slot: ISlot = signal.addOnce(newEmptyHandler());

        signal.dispatch(new MockEvent("click"));

        slot.listener = newEmptyHandler();

        signal.dispatch(new MockEvent("click"));
    });

    it("addOnce_listener_then_dispatch_change_listener_on_slot_then_pause_should_not_dispatch_second_listener", () => {
        let slot: ISlot = signal.addOnce(newEmptyHandler());

        signal.dispatch(new MockEvent("click"));

        slot.listener = failIfCalled;
        slot.enabled = false;

        signal.dispatch(new MockEvent("click"));
    });

    it("addOnce_listener_then_change_listener_then_switch_back_and_then_should_dispatch", () => {
        let slot: ISlot = signal.addOnce(newEmptyHandler());

        signal.dispatch(new MockEvent("click"));

        let listener: Function = slot.listener;

        slot.listener = failIfCalled;
        slot.listener = listener;

        signal.dispatch(new MockEvent("click"));
    });

    it("add_listener_and_verify_once_is_false", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);

        assert.isFalse(slot.once, "Slot once is false");
    });

    it("add_listener_and_verify_priority_is_zero", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);

        assert.isTrue(slot.priority === 0, "Slot priority is zero");
    });

    it("add_listener_and_verify_slot_listener_is_same", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);

        assert.isTrue(slot.listener === listener, "Slot listener is the same as the listener");
    });

    it("add_same_listener_twice_and_verify_slots_are_the_same", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot = signal.add(listener);
        let slot1: ISlot = signal.add(listener);

        assert.isTrue(slot0 === slot1, "Slots are equal if they\"re they have the same listener");
    });

    it("add_same_listener_twice_and_verify_slot_listeners_are_the_same", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot = signal.add(listener);
        let slot1: ISlot = signal.add(listener);

        assert.isTrue(slot0.listener === slot1.listener, "Slot listener is the same as the listener");
    });

    it("add_listener_and_remove_using_slot", () => {
        let slot: ISlot = signal.add(newEmptyHandler());
        slot.remove();

        assert.isTrue(signal.numListeners === 0, "Number of listeners should be 0");
    });

    it("add_same_listener_twice_and_remove_using_slot_should_have_no_listeners", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot = signal.add(listener);
        signal.add(listener);

        slot0.remove();

        assert.isTrue(signal.numListeners === 0, "Number of listeners should be 0");
    });

    it("add_lots_of_same_listener_and_remove_using_slot_should_have_no_listeners", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot;
        for (let i = 0; i < 100; i++) {
            slot0 = signal.add(listener);
        }

        slot0.remove();

        assert.isTrue(signal.numListeners === 0, "Number of listeners should be 0");
    });

    it("add_listener_then_set_listener_to_null_should_throw_ArgumentError", () => {
        assert.throws(() => {
            let slot: ISlot = signal.add(newEmptyHandler());
            slot.listener = null;
        }, Error);
    });

    it("add_listener_and_call_execute_on_slot_should_call_listener", () => {
        let slot: ISlot = signal.add(newEmptyHandler());
        slot.execute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("add_listener_twice_and_call_execute_on_slot_should_call_listener_and_not_on_signal_listeners", () => {
        signal.add(failIfCalled);

        let slot: ISlot = signal.add(newEmptyHandler());
        slot.execute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("addOnce_listener_and_verify_once_is_true", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.addOnce(listener);

        assert.isTrue(slot.once === true, "Slot once is true");
    });

    it("addOnce_listener_and_verify_priority_is_zero", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.addOnce(listener);

        assert.isTrue(slot.priority === 0, "Slot priority is zero");
    });

    it("addOnce_listener_and_verify_slot_listener_is_same", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.addOnce(listener);

        assert.isTrue(slot.listener === listener, "Slot listener is the same as the listener");
    });

    it("addOnce_same_listener_twice_and_verify_slots_are_the_same", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot = signal.addOnce(listener);
        let slot1: ISlot = signal.addOnce(listener);

        assert.isTrue(slot0 === slot1, "Slots are equal if they\"re they have the same listener");
    });

    it("addOnce_same_listener_twice_and_verify_slot_listeners_are_the_same", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot = signal.addOnce(listener);
        let slot1: ISlot = signal.addOnce(listener);

        assert.isTrue(slot0.listener === slot1.listener, "Slot listener is the same as the listener");
    });

    it("addOnce_listener_and_remove_using_slot", () => {
        let slot: ISlot = signal.addOnce(newEmptyHandler());
        slot.remove();

        assert.isTrue(signal.numListeners === 0, "Number of listeners should be 0");
    });

    it("addOnce_same_listener_twice_and_remove_using_slot_should_have_no_listeners", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot = signal.addOnce(listener);
        signal.addOnce(listener);

        slot0.remove();

        assert.isTrue(signal.numListeners === 0, "Number of listeners should be 0");
    });

    it("addOnce_lots_of_same_listener_and_remove_using_slot_should_have_no_listeners", () => {
        let listener: Function = newEmptyHandler();
        let slot0: ISlot;
        for (let i = 0; i < 100; i++) {
            slot0 = signal.addOnce(listener);
        }

        slot0.remove();

        assert.isTrue(signal.numListeners === 0, "Number of listeners should be 0");
    });

    it("addOnce_listener_then_set_listener_to_null_should_throw_ArgumentError", () => {
        assert.throws(() => {
            let slot: ISlot = signal.addOnce(newEmptyHandler());
            slot.listener = null;
        }, Error);
    });

    it("addOnce_listener_and_call_execute_on_slot_should_call_listener", () => {
        let slot: ISlot = signal.addOnce(newEmptyHandler());
        slot.execute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("addOnce_listener_twice_and_call_execute_on_slot_should_call_listener_and_not_on_signal_listeners", () => {
        signal.addOnce(failIfCalled);

        let slot: ISlot = signal.addOnce(newEmptyHandler());
        slot.execute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("slot_params_are_null_when_created", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);

        assert.isUndefined(slot.params, "params should be undefined");
    });

    it("slot_params_should_not_be_null_after_adding_array", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);
        slot.params = [];

        assert.isNotNull(slot.params, "params should not be null");
    });

    it("slot_params_with_one_param_should_be_sent_through_to_listener", () => {
        let listener: Function = function (e: MockEvent, ...args): void {
            assert.isNotNull(e);

            assert.isTrue(typeof args[0] === "number");
            assert.equal(args[0], 1234);
        };

        let slot: ISlot = signal.add(listener);
        slot.params = [1234];

        signal.dispatch(new MockMouseEvent("click"));
    });

    it("slot_params_with_multiple_params_should_be_sent_through_to_listener", () => {
        let slot: ISlot;

        let listener: Function = function (e: MockEvent, ...args): void {
            assert.isNotNull(e);

            assert.isTrue(typeof args[0] === "number");
            assert.equal(args[0], 12345);

            assert.isTrue(typeof args[1] === "string");
            assert.equal(args[1], "text");

            assert.isTrue(args[2] instanceof Sprite);
            assert.equal(args[2], slot.params[2]);
        };

        slot = signal.add(listener);
        slot.params = [12345, "text", new Sprite()];

        signal.dispatch(new MockMouseEvent("click"));
    });

    it("slot_params_should_not_effect_other_slots", () => {
        let listener0: Function = function (e: MockEvent): void {
            assert.isNotNull(e);

            assert.equal(arguments.length, 1);
        };

        signal.add(listener0);

        let listener1: Function = function (e: MockEvent): void {
            assert.isNotNull(e);

            assert.equal(arguments.length, 2);
            assert.equal(arguments[1], 123456);
        };

        let slot: ISlot = signal.add(listener1);
        slot.params = [123456];

        signal.dispatch(new MockMouseEvent("click"));
    });

    it("verify_chaining_of_slot_params", () => {
        let listener: Function = function (e: MockEvent, ...args): void {
            assert.isNotNull(e);

            assert.equal(args.length, 1);
            assert.equal(args[0], 1234567);
        };

        signal.add(listener).params = [1234567];

        signal.dispatch(new MockMouseEvent("click"));
    });

    it("verify_chaining_and_concat_of_slot_params", () => {
        let listener: Function = function (e: MockEvent, ...args): void {
            assert.isNotNull(e);

            assert.equal(args.length, 2);
            assert.equal(args[0], 12345678);
            assert.equal(args[1], "text");
        };

        let params: any[] = [12345678, "text"];
        signal.add(listener).params = params;

        signal.dispatch(new MockMouseEvent("click"));
    });

    it("verify_chaining_and_pushing_on_to_slot_params", () => {
        let listener: Function = function (e: MockEvent, ...args): void {
            assert.isNotNull(e);

            assert.equal(args.length, 2);
            assert.equal(args[0], 123456789);
            assert.equal(args[1], "text");
        };

        // This is ugly, but I put money on somebody will attempt to do this!
        let slots: ISlot;
        (slots = signal.add(listener)).params = [123456789];
        slots.params.push("text");

        signal.dispatch(new MockMouseEvent("click"));
    });

    ////// UTILITY METHODS //////

    function newEmptyHandler(): Function {
        return function (e: any = null, ...args): void {
        };
    }

    function failIfCalled(e: any = null): void {
        assert.fail("This function should not have been called.");
    }

});
