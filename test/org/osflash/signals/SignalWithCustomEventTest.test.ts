import {assert} from "chai";

import {Signal} from "../../../../src/org/osflash/signals/Signal";
import {AsyncUtil} from "../../../util/AsyncUtil";
import {GenericEvent} from "../../../../src/org/osflash/signals/events/GenericEvent";
import {IEvent} from "../../../../src/org/osflash/signals/events/IEvent";

describe("SignalWithCustomEventTest", () => {

    let async: AsyncUtil = new AsyncUtil();
    let messaged: Signal;

    beforeEach(() => {
        messaged = new Signal(MessageEvent);
    });

    afterEach(() => {
        messaged.removeAll();
        messaged = null;
    });

    it("valueClasses_roundtrip_through_constructor()", () => {
        assert.equal(MessageEvent, messaged.valueClasses[0]);
        assert.equal(1, messaged.valueClasses.length);
    });

    it("valueClasses_roundtrip_through_setter()", () => {
        messaged.valueClasses = [GenericEvent];
        assert.equal(GenericEvent, messaged.valueClasses[0]);
        assert.equal(1, messaged.valueClasses.length);
    });

    it("valueClasses_setter_clones_the_array()", () => {
        let newValueClasses: any[] = [GenericEvent];
        messaged.valueClasses = newValueClasses;
        assert.notEqual(newValueClasses, messaged.valueClasses);
    });

    it("add_one_listener_and_dispatch()", () => {
        messaged.add(async.add(onMessage, 50));
        messaged.dispatch(new MessageEvent("ok"));
    });

    // TODO: Skipping because of valueClasses issue in OnceSignal
    it.skip("dispatch_wrong_event_type_should_throw_ArgumentError()", () => {
        assert.throws(() => messaged.dispatch(new GenericEvent()), Error);
    });

    it("constructing_signal_with_non_class_should_throw_ArgumentError()", () => {
        assert.throws(() => new Signal(5), Error);
    });

    it("constructing_signal_with_two_nulls_should_throw_ArgumentError()", () => {
        assert.throws(() => new Signal(null, null), Error);
    });

    it("constructing_signal_with_class_and_non_class_should_throw_ArgumentError()", () => {
        assert.throws(() => new Signal(Date, 42));
    });

    function onMessage(e: MessageEvent): void {
        assert.equal("message value in the event", "ok", e.message);
    }

});


class MessageEvent extends GenericEvent implements IEvent {
    public message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

    /*override*/
    public clone(): IEvent {
        return new MessageEvent(this.message);
    }

}
