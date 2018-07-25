/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { GenericEvent } from "../../../../src/org/osflash/signals/events/GenericEvent";
import { IEvent } from "../../../../src/org/osflash/signals/events/IEvent";

import { BubbleHater } from "./support/BubbleHater";
import { Child } from "./support/Child";

describe("DeluxeSignalWithBubblingEventTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let theParent: Child;
    let theChild: Child;
    let theGrandChild: Child;
    let cancelTimeout: Function;
    let doneFunc: Function;

    function onEventBubbled(e: IEvent): boolean {
        cancelTimeout();
        assert.equal(theGrandChild, e.target, "e.target should be the object that originally dispatched event");
        assert.equal(theParent, e.currentTarget, "e.currentTarget should be the object receiving the bubbled event");
        doneFunc();
        return false;
    }

    beforeEach(() => {
        theParent = new Child(null, "theParent", onEventBubbled);
        theChild = new Child(theParent, "theChild");
        theGrandChild = new Child(theChild, "theGrandChild");
    });

    afterEach(() => {
        theParent = null;
        theChild = null;
        theGrandChild = null;
        cancelTimeout = null;
        doneFunc = null;
    });

    it("parent_child_relationships()", () => {
        assert.equal(theParent, theChild.parent, "theChild's parent is this");
    });

    it("dispatch_bubbling_event_from_theGrandChild_should_bubble_to_parent_IBubbleHandler()", done => {
        // If cancelTimeout() isn"t called, this test will fail.
        cancelTimeout = async.add(null, 1500);

        // keep reference for done function
        doneFunc = done;

        // prepare event
        let event: IEvent = new GenericEvent();
        event.bubbles = true;

        // dispatch event from grand child, expecting that it will arrive on parent
        theGrandChild.completed.dispatch(event);
    });

    it("returning_false_from_onEventBubbled_should_stop_bubbling()", () => {
        let bubbleHater: BubbleHater = new BubbleHater();
        theChild = new Child(bubbleHater, "bubblePopper");
        theChild.popsBubbles = true;
        theGrandChild = new Child(theChild, "bubbleBlower");
        let bubblingEvent: IEvent = new GenericEvent(true);
        // Will only complete without error if theChild pops the bubble.
        theGrandChild.completed.dispatch(bubblingEvent);
    });

    it("returning_true_from_onEventBubbled_should_continue_bubbling()", () => {
        assert.throws(() => {
            let bubbleHater: BubbleHater = new BubbleHater();
            theChild = new Child(bubbleHater, "bubblePopper");
            // Changing popsBubbles to false will fail the test nicely.
            theChild.popsBubbles = false;
            theGrandChild = new Child(theChild, "bubbleBlower");
            let bubblingEvent: IEvent = new GenericEvent(true);
            // Because theChild didn"t pop the bubble, this causes bubbleHater to throw an error.
            theGrandChild.completed.dispatch(bubblingEvent);
        }, Error);
    });
});
