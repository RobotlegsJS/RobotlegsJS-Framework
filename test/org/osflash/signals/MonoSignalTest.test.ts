import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { ISlot } from "../../../../src/org/osflash/signals/ISlot";
import { IEvent } from "../../../../src/org/osflash/signals/events/IEvent";
import { Sprite } from "../../../mock/mock";

describe("MonoSignalTest", () => {

    let async: AsyncUtil = new AsyncUtil();
    let signal: MonoSignal;

    beforeEach(() => {
        signal = new MonoSignal();
    });

    afterEach(() => {
        signal.removeAll();
        signal = null;
    });

    it("numListeners_is_0_after_creation()", () => {
        assert.equal(0, signal.numListeners);
    });

    it("dispatch_should_pass_event_to_listener_but_not_set_signal_or_target_properties()", (done) => {
        signal.add(async.add(checkGenericEvent, 10, done));
        signal.dispatch(new GenericEvent());
    });

    function checkGenericEvent(e: GenericEvent): void {
        assert.isNotOk(e.signal, "event.signal is not set by Signal");
        assert.isNotOk(e.target, "event.target is not set by Signal");
    }

    it("add_two_listeners_should_throw_an_error()", () => {
        assert.throws(() => {
            signal.add(checkGenericEvent);
            signal.add(checkGenericEvent);
        }, Error);
    });


    it("add_one_hundred_listeners_should_throw_an_error()", () => {
        assert.throws(() => {
            for (let i = 0; i < 100; i++) {
                signal.add(checkGenericEvent);
            }
        }, Error);
    });


    it("add_one_listeners_then_remove_it_then_add_another_listener()", () => {
        signal.add(failIfCalled);
        signal.remove(failIfCalled);
        signal.add(checkGenericEvent);
        signal.dispatch(new GenericEvent());
    });


    it("addOnce_and_dispatch_should_remove_listener_automatically()", () => {
        signal.addOnce(newEmptyHandler());
        signal.dispatch(new GenericEvent());
        assert.equal(0, signal.numListeners, "there should be no listeners");
    });


    it("add_listener_then_remove_then_dispatch_should_not_call_listener()", () => {
        signal.add(failIfCalled);
        signal.remove(failIfCalled);
        signal.dispatch(new GenericEvent());
    });

    function failIfCalled(e: IEvent): void {
        assert.fail("event handler should not have been called.");
    }

    it("add_listener_then_remove_function_not_in_listeners_should_do_nothing()", () => {
        signal.add(newEmptyHandler());
        signal.remove(newEmptyHandler());
        assert.equal(1, signal.numListeners);
    });

    function newEmptyHandler(): Function {
        return function(e: any): void {
        };
    }

    it("addOnce_same_listener_twice_should_throw_error()", () => {
        assert.throws(() => {
            let func: Function = newEmptyHandler();
            signal.addOnce(func);
            signal.addOnce(func);
        }, Error);
    });

    it("dispatch_non_IEvent_without_error()", () => {
        signal.addOnce(checkSprite);
        // Sprite doesn"t have a target property,
        // so if the signal tried to set .target,
        // an error would be thrown and test would fail.
        signal.dispatch(new Sprite());
    });

    function checkSprite(sprite: Sprite): void {
        assert.isTrue(sprite instanceof Sprite);
    }

    it("adding_a_listener_during_dispatch_should_not_call_it()", (done) => {
        signal.add(async.add(addListenerDuringDispatch, 10, done));
        signal.dispatch(new GenericEvent());
    });

    function addListenerDuringDispatch(): void {
        try {
            signal.add(failIfCalled);
        } catch (error) {
            assert.isTrue(signal.numListeners === 1, "there should be 1 listener");
        }
    }

    it("removed_listener_should_return_slot()", () => {
        let listener: Function = function(): void {
        };
        let slot: ISlot = signal.add(listener);

        assert.isTrue(slot === signal.remove(listener), "Slot is returned");
    });

    it("removed_listener_should_be_returned()", () => {
        let slot: ISlot = signal.add(function(): void {
        });
        let listener: Function = slot.listener;

        assert.isTrue(slot === signal.remove(listener), "Slot is returned");
    });

    it("slot_params_are_null_when_created()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);

        assert.isNotOk(slot.params, "params should be null");
    });

    it("slot_params_should_not_be_null_after_adding_array()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = signal.add(listener);
        slot.params = [];

        assert.isNotNull(slot.params, "params should not be null");
    });

    it("slot_params_with_one_param_should_be_sent_through_to_listener()", () => {
        let listener: Function = function(...args): void {
            assert.isTrue(typeof args[0] === "number");
            assert.equal(args[0], 1234);
        };

        let slot: ISlot = signal.add(listener);
        slot.params = [1234];

        signal.dispatch();
    });

    it("slot_params_with_multiple_params_should_be_sent_through_to_listener()", () => {
        let slot: ISlot;

        let listener: Function = function(...args): void {
            assert.isTrue(typeof args[0] === "number");
            assert.equal(args[0], 12345);

            assert.isTrue(typeof args[1] === "string");
            assert.equal(args[1], "text");

            assert.isTrue(args[2] instanceof Sprite);
            assert.equal(args[2], slot.params[2]);
        };

        slot = signal.add(listener);
        slot.params = [12345, "text", new Sprite()];

        signal.dispatch();
    });

    it("verify_chaining_of_slot_params()", () => {
        let listener: Function = function(...args): void {
            assert.equal(args.length, 1);
            assert.equal(args[0], 1234567);
        };

        signal.add(listener).params = [1234567];

        signal.dispatch();
    });

    it("verify_chaining_and_concat_of_slot_params()", () => {
        let params: any[] = [12345678];

        let listener: Function = function(...args): void {
            assert.equal(args.length, 2);
            assert.equal(args[0], 12345678);
            assert.equal(args[1], "text");
        };

        signal.add(listener).params = params.concat(["text"]);

        signal.dispatch();
    });


    it("verify_chaining_and_pushing_on_to_slot_params()", () => {
        let listener: Function = function(...args): void {
            assert.equal(args.length, 2);
            assert.equal(args[0], 123456789);
            assert.equal(args[1], "text");
        };

        // is ugly, but I put money on somebody will attempt to do

        let slots: ISlot;
        (slots = signal.add(listener)).params = [123456789];
        slots.params.push("text");

        signal.dispatch();
    });
});
