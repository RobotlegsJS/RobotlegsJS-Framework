import "../../../entry";

import { assert } from "chai";

import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { IEvent } from "../../../../src/org/osflash/signals/events/IEvent";

describe("GenericEventTest", () => {
    let instance: GenericEvent;

    beforeEach(() => {
        instance = new GenericEvent();
    });

    afterEach(() => {
        instance = null;
    });

    it("testInstantiated()", () => {
        assert.isTrue(instance instanceof GenericEvent, "GenericEvent instantiated");
        assert.isNotOk(instance.target, "target is null by default");
        assert.isFalse(instance.bubbles, "bubbles is false by default");
    });

    it("bubbles_roundtrips_through_constructor()", () => {
        let bubblingEvent: GenericEvent = new GenericEvent(true);
        assert.isTrue(bubblingEvent.bubbles);
    });

    it("bubbles_roundtrips_through_setter()", () => {
        let bubblingEvent: GenericEvent = new GenericEvent();
        bubblingEvent.bubbles = true;
        assert.isTrue(bubblingEvent.bubbles);
    });

    it("clone_should_be_instance_of_original_event_class()", () => {
        let theClone: IEvent = instance.clone();
        assert.isTrue(theClone instanceof GenericEvent);
    });

    it("clone_non_bubbling_event_should_have_bubbles_false()", () => {
        let theClone: GenericEvent = <GenericEvent>instance.clone();
        assert.isFalse(theClone.bubbles);
    });

    it("clone_bubbling_event_should_have_bubbles_true()", () => {
        let bubblingEvent: GenericEvent = new GenericEvent(true);
        let theClone: IEvent = bubblingEvent.clone();
        assert.isTrue(theClone.bubbles);
    });
});
