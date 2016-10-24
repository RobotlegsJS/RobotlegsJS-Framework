import {assert} from "chai";

import {Signal} from "../../../../src/org/osflash/signals/Signal";
import {GenericEvent} from "../../../../src/org/osflash/signals/events/GenericEvent";
import {ISlot} from "../../../../src/org/osflash/signals/ISlot";

describe("SlotTest", () => {

    let signal: Signal;

    beforeEach(() => {
        signal = new Signal();
    });

    it("add_listener_pause_then_resume_on_slot_should_dispatch", (done) => {
        let slot: ISlot = signal.add(listener);
        slot.enabled = false;
        slot.enabled = true;

        signal.dispatch(new GenericEvent());

        function listener(event: GenericEvent) {
            setTimeout(checkGenericEvent, 10, event, done);
        }

    });

    it("addOnce_listener_pause_then_resume_on_slot_should_dispatch", (done) => {
        let slot: ISlot = signal.addOnce(listener);
        slot.enabled = false;
        slot.enabled = true;

        signal.dispatch(new GenericEvent());

        function listener(event: GenericEvent) {
            setTimeout(checkGenericEvent, 10, event, done);
        }
    });

});

function checkGenericEvent(event: GenericEvent, doneCallback): void {
    assert.isNotOk(event.signal, "event.signal is not set by Signal");
    assert.isNotOk(event.target, "event.target is not set by Signal");
    doneCallback();
}

