import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import {
    checkGenericEvent,
    failIfCalled,
    newEmptyHandler
} from "../../../util/TestBase";

import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { ISlot } from "../../../../src/org/osflash/signals/ISlot";

describe("MonoSignalSlotTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: MonoSignal;

    beforeEach(() => {
        completed = new MonoSignal();
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("add_listener_and_verify_once_is_false()", () => {
        let listener = newEmptyHandler();
        let slot: ISlot = completed.add(listener);

        assert.isTrue(slot.once === false, "Slot once is false");
    });

    it("add_listener_and_verify_priority_is_zero()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = completed.add(listener);

        assert.isTrue(slot.priority === 0, "Slot priority is zero");
    });

    it("add_listener_and_verify_slot_listener_is_same()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = completed.add(listener);

        assert.isTrue(
            slot.listener === listener,
            "Slot listener is the same as the listener"
        );
    });

    it("add_listener_and_remove_using_slot()", () => {
        let slot: ISlot = completed.add(newEmptyHandler());
        slot.remove();

        assert.isTrue(
            completed.numListeners === 0,
            "Number of listeners should be 0"
        );
    });

    it("add_listener_pause_on_slot_should_not_dispatch()", () => {
        let slot: ISlot = completed.add(failIfCalled);
        slot.enabled = false;

        completed.dispatch();
    });

    it("add_listener_pause_then_resume_on_slot_should_dispatch()", () => {
        let slot: ISlot = completed.add(async.add(checkGenericEvent, 10));
        slot.enabled = false;
        slot.enabled = true;

        completed.dispatch(new GenericEvent());
    });

    it("add_listener_switch_pause_and_resume_on_slot_should_not_dispatch()", () => {
        let slot: ISlot = completed.add(failIfCalled);
        slot.enabled = false;
        slot.enabled = true;
        slot.enabled = false;

        completed.dispatch();
    });

    it("add_listener_then_dispatch_change_listener_on_slot_should_dispatch_second_listener()", () => {
        let slot: ISlot = completed.add(newEmptyHandler());

        completed.dispatch();

        slot.listener = newEmptyHandler();

        completed.dispatch();
    });

    it("add_listener_then_dispatch_change_listener_on_slot_then_pause_should_not_dispatch_second_listener()", () => {
        let slot: ISlot = completed.add(newEmptyHandler());

        completed.dispatch();

        slot.listener = failIfCalled;
        slot.enabled = false;

        completed.dispatch();
    });

    it("add_listener_then_change_listener_then_switch_back_and_then_should_dispatch()", () => {
        let slot: ISlot = completed.add(newEmptyHandler());

        completed.dispatch();

        let listener: Function = slot.listener;

        slot.listener = failIfCalled;
        slot.listener = listener;

        completed.dispatch();
    });

    it("add_listener_then_set_listener_to_null_should_throw_ArgumentError()", () => {
        assert.throws(() => {
            let slot: ISlot = completed.add(newEmptyHandler());
            slot.listener = null;
        }, Error);
    });

    it("add_listener_and_call_execute_on_slot_should_call_listener()", () => {
        let slot: ISlot = completed.add(newEmptyHandler());
        slot.execute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("addOnce_listener_and_verify_once_is_true()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = completed.addOnce(listener);

        assert.isTrue(slot.once === true, "Slot once is true");
    });

    it("addOnce_listener_and_verify_priority_is_zero()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = completed.addOnce(listener);

        assert.isTrue(slot.priority === 0, "Slot priority is zero");
    });

    it("addOnce_listener_and_verify_slot_listener_is_same()", () => {
        let listener: Function = newEmptyHandler();
        let slot: ISlot = completed.addOnce(listener);

        assert.isTrue(
            slot.listener === listener,
            "Slot listener is the same as the listener"
        );
    });

    it("addOnce_listener_and_remove_using_slot()", () => {
        let slot: ISlot = completed.addOnce(newEmptyHandler());
        slot.remove();

        assert.isTrue(
            completed.numListeners === 0,
            "Number of listeners should be 0"
        );
    });

    it("addOnce_listener_pause_then_resume_on_slot_should_dispatch()", () => {
        let slot: ISlot = completed.addOnce(async.add(checkGenericEvent, 10));
        slot.enabled = false;
        slot.enabled = true;

        completed.dispatch(new GenericEvent());
    });

    it("addOnce_listener_switch_pause_and_resume_on_slot_should_not_dispatch()", () => {
        let slot: ISlot = completed.addOnce(failIfCalled);
        slot.enabled = false;
        slot.enabled = true;
        slot.enabled = false;

        completed.dispatch();
    });

    it("addOnce_listener_then_dispatch_change_listener_on_slot_should_dispatch_second_listener()", () => {
        let slot: ISlot = completed.addOnce(newEmptyHandler());

        completed.dispatch();

        slot.listener = newEmptyHandler();

        completed.dispatch();
    });

    it("addOnce_listener_then_dispatch_change_listener_on_slot_then_pause_should_not_dispatch_second_listener()", () => {
        let slot: ISlot = completed.addOnce(newEmptyHandler());

        completed.dispatch();

        slot.listener = failIfCalled;
        slot.enabled = false;

        completed.dispatch();
    });

    it("addOnce_listener_then_change_listener_then_switch_back_and_then_should_dispatch()", () => {
        let slot: ISlot = completed.addOnce(newEmptyHandler());

        completed.dispatch();

        let listener: Function = slot.listener;

        slot.listener = failIfCalled;
        slot.listener = listener;

        completed.dispatch();
    });

    /*[Test(expects="ArgumentError")]*/
    it("addOnce_listener_then_set_listener_to_null_should_throw_ArgumentError()", () => {
        assert.throws(() => {
            let slot: ISlot = completed.addOnce(newEmptyHandler());
            slot.listener = null;
        }, Error);
    });

    it("addOnce_listener_and_call_execute_on_slot_should_call_listener()", () => {
        let slot: ISlot = completed.addOnce(newEmptyHandler());
        slot.execute([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
