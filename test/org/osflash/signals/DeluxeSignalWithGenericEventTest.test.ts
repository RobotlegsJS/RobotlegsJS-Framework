import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { DeluxeSignal } from "../../../../src/org/osflash/signals/DeluxeSignal";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { Sprite } from "../../../mock/mock";
import { IEvent } from "../../../../src/org/osflash/signals/events/IEvent";
import { newEmptyHandler, failIfCalled } from "../../../util/TestBase";

describe("DeluxeSignalWithGenericEventTest", () => {

    let async: AsyncUtil = new AsyncUtil();

    let completed: DeluxeSignal;
    let delegate: Function;
    let self = this;

    beforeEach(() => {
        completed = new DeluxeSignal(self);
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
        delegate = null;
    });

    it("signal_length_is_0_after_creation()", () => {
        assert.equal(0, completed.numListeners);
    });


    it("add_listener_and_dispatch_event_should_pass_event_to_listener()", (done) => {
        completed.add(async.add(checkGenericEvent, 10, done));
        completed.dispatch(new GenericEvent());
    });

    function checkGenericEvent(e: IEvent): void {
        assert.isTrue(e instanceof GenericEvent, "instance of GenericEvent");
        assert.equal(completed, e.signal, "event.signal points to the originating Signal");
        assert.equal(e.target, self, "event.target points to object containing the Signal");
        assert.equal(e.target, e.currentTarget, "event.target is e.currentTarget because event does not bubble");
    }

    it("add_two_listeners_and_dispatch_should_call_both()", (done) => {
        completed.add(async.add(checkGenericEvent, 10));
        completed.add(async.add(checkGenericEvent, 10, done));
        completed.dispatch(new GenericEvent());
    });

    it("addOnce_and_dispatch_should_remove_listener_automatically()", () => {
        completed.addOnce(newEmptyHandler());
        completed.dispatch(new GenericEvent());
        assert.equal(0, completed.numListeners, "there should be no listeners");
    });

    it("add_one_listener_and_dispatch_then_listener_remove_itself_using_event_signal()", (done) => {
        delegate = async.add(remove_myself_from_signal, 10, done);
        completed.add(delegate);
        completed.dispatch(new GenericEvent());
    });

    function remove_myself_from_signal(e: IEvent): void {
        assert.equal(1, e.signal.numListeners, "listener still in signal");

        // Can"t remove(arguments.callee) because it"s wrapped with delegate created by async.add().
        e.signal.remove(delegate);

        assert.equal(0, e.signal.numListeners, "listener removed from signal");
    }

    it("add_listener_then_remove_then_dispatch_should_not_call_listener()", () => {
        let delegateCallback: Function = failIfCalled;
        completed.add(delegateCallback);
        completed.remove(delegateCallback);
        completed.dispatch(new GenericEvent());
    });

    it("add_2_listeners_remove_2nd_then_dispatch_should_call_1st_not_2nd_listener()", (done) => {
        completed.add(async.add(checkGenericEvent, 10, done));
        let delegateCallback: Function = failIfCalled;
        completed.add(delegateCallback);
        completed.remove(delegateCallback);
        completed.dispatch(new GenericEvent());
    });

    it("add_2_listeners_should_yield_length_of_2()", () => {
        completed.add(newEmptyHandler());
        completed.add(newEmptyHandler());
        assert.equal(2, completed.numListeners);
    });

    it("add_2_listeners_then_remove_1_should_yield_length_of_1()", () => {
        let firstFunc: Function = newEmptyHandler();
        completed.add(firstFunc);
        completed.add(newEmptyHandler());

        completed.remove(firstFunc);

        assert.equal(1, completed.numListeners);
    });

    it("add_2_listeners_then_removeAll_should_yield_length_of_0()", () => {
        completed.add(newEmptyHandler());
        completed.add(newEmptyHandler());

        completed.removeAll();

        assert.equal(0, completed.numListeners);
    });

    it("add_same_listener_twice_should_only_add_it_once()", () => {
        let func: Function = newEmptyHandler();
        completed.add(func);
        completed.add(func);
        assert.equal(1, completed.numListeners);
    });

    it("dispatch_object_that_isnt_an_IEvent_should_dispatch_without_error()", () => {
        completed.addOnce(checkSprite);
        // Sprite doesn"t have a target property,
        // so if the signal tried to set .target,
        // an error would be thrown and test would fail.
        completed.dispatch(new Sprite());
    });

    function checkSprite(sprite: Sprite): void {
        assert.isTrue(sprite instanceof Sprite);
    }

});
