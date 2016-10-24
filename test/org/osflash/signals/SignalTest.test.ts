import {assert} from "chai";

import {ISignal} from "../../../../src/org/osflash/signals/ISignal";
import {GenericEvent} from "../../../../src/org/osflash/signals/events/GenericEvent";
import {Sprite} from "../../../mock/mock";
import {ISlot} from "../../../../src/org/osflash/signals/ISlot";
import {Signal} from "../../../../src/org/osflash/signals/Signal";


describe("SignalTest", () => {

    let signal: ISignal;

    beforeEach(() => {
        signal = new Signal();
    });

    it("dispatch_should_pass_event_to_listener_but_not_set_signal_or_target_properties", (done) => {
        signal.add(listener);
        signal.dispatch(new GenericEvent());

        function listener(event: GenericEvent) {
            setTimeout(checkGenericEvent, 10, event, done);
        }
    });

    it("dispatch_non_IEvent_without_error", () => {
        signal.addOnce(checkSprite);
        // Sprite doesn't have a target property,
        // so if the signal tried to set .target,
        // an error would be thrown and this test would fail.
        signal.dispatch(new Sprite());
    });

    function checkSprite(sprite: Sprite): void {
        assert.isTrue(sprite instanceof Sprite);
    }

    it("adding_dispatch_method_as_listener_does_not_throw_error", () => {
        let redispatchSignal: Signal = new Signal(GenericEvent);
        signal = new Signal(GenericEvent);
        signal.add(redispatchSignal.dispatch);
    });

    it("slot_params_should_be_sent_through_to_listener", () => {
        let slot: ISlot;

        function listener(...args) {
            setTimeout(assertResults, 10, ...args);
        }

        function assertResults(num: number, str: string, sprite: Sprite): void {
            assert.equal(num, 12345);
            assert.equal(str, "text");
            assert.equal(sprite, slot.params[2]);
        }

        slot = signal.add(listener);
        slot.params = [12345, "text", new Sprite()];

        signal.dispatch();
    });

    it("slot_params_with_with_10_params_should_be_sent_through_to_listener", (done) => {
        // Test the function.apply - maying sure we get everything we ask for.
        let slot: ISlot;

        function listener(...args) {
            setTimeout(assertResults, 10, ...args);
        }

        function assertResults(num: number,
                               str: string,
                               sprite: Sprite,
                               alpha0: string,
                               alpha1: string,
                               alpha2: string,
                               alpha3: string,
                               alpha4: string,
                               alpha5: string,
                               alpha6: string): void {
            assert.equal(num, 12345);
            assert.equal(str, "text");
            assert.equal(sprite, slot.params[2]);
            assert.equal(alpha0, "a");
            assert.equal(alpha1, "b");
            assert.equal(alpha2, "c");
            assert.equal(alpha3, "d");
            assert.equal(alpha4, "e");
            assert.equal(alpha5, "f");
            assert.equal(alpha6, "g");
            done();
        }

        slot = signal.add(listener);
        slot.params = [12345, "text", new Sprite(), "a", "b", "c", "d", "e", "f", "g"];

        signal.dispatch();
    });
});

function checkGenericEvent(event: GenericEvent, doneCallback): void {
    assert.isNotOk(event.signal, "event.signal is not set by Signal");
    assert.isNotOk(event.target, "event.target is not set by Signal");
    doneCallback();
}
