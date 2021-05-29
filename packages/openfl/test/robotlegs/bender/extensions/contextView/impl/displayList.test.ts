// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import Stage from "openfl/display/Stage";
import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";
import DisplayObject from "openfl/display/DisplayObject";
import Event from "openfl/events/Event";

describe("DisplayList", () => {
    let stage: Stage;

    beforeEach(() => {
        stage = new Stage();
    });

    afterEach(() => {
        stage = null;
    });

    it("addChild_return_reference_of_child_added", () => {
        let child: DisplayObjectContainer = new DisplayObjectContainer();
        assert.equal(child, stage.addChild(child));
    });

    it("addChild_stage_capture_added_events_only_when_object_is_attached_to_stage", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        container1.addChild(container2);
        assert.equal(count, 0);

        container1.addChild(container3);
        assert.equal(count, 0);

        container1.addChild(container4);
        assert.equal(count, 0);

        container5.addChild(container1);
        assert.equal(count, 0);

        stage.addChild(container5);
        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_flat_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        stage.addChild(container2);
        stage.addChild(container3);
        stage.addChild(container4);
        stage.addChild(container5);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy_added_in_reverse", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        container4.addChild(container5);
        container3.addChild(container4);
        container2.addChild(container3);
        container1.addChild(container2);
        assert.equal(count, 0);

        stage.addChild(container1);
        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy_with_display_objects", () => {
        let container: DisplayObjectContainer = new DisplayObjectContainer();
        let containerL: DisplayObjectContainer = new DisplayObjectContainer();
        let containerR: DisplayObjectContainer = new DisplayObjectContainer();

        let childL1: DisplayObject = new DisplayObject();
        let childL2: DisplayObject = new DisplayObject();
        let childR1: DisplayObject = new DisplayObject();
        let childR2: DisplayObject = new DisplayObject();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        containerL.addChild(childL1);
        containerL.addChild(childL2);
        containerR.addChild(childR1);
        containerR.addChild(childR2);

        container.addChild(containerL);
        container.addChild(containerR);
        assert.equal(count, 0);

        stage.addChild(container);
        assert.equal(count, 7);
    });

    it("addChildAt_return_reference_of_child_added", () => {
        let child: DisplayObjectContainer = new DisplayObjectContainer();
        assert.equal(child, stage.addChildAt(child, 0));
    });

    it("addChildAt_add_children_in_order", () => {
        let child1: DisplayObjectContainer = new DisplayObjectContainer();
        let child2: DisplayObjectContainer = new DisplayObjectContainer();
        let child3: DisplayObjectContainer = new DisplayObjectContainer();
        let child4: DisplayObjectContainer = new DisplayObjectContainer();

        const expected: DisplayObject[] = [child1, child2, child3, child4];
        let actual: DisplayObject[] = [];

        stage.addChildAt(child4, 0);
        stage.addChildAt(child3, 0);
        stage.addChildAt(child2, 0);
        stage.addChildAt(child1, 0);

        for (let i: number = 0; i < stage.numChildren; i++) {
            actual.push(stage.getChildAt(i));
        }

        assert.deepEqual(actual, expected);
    });

    it("addChildAt_stage_capture_added_events_on_flat_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChildAt(container1, 0);
        stage.addChildAt(container2, 0);
        stage.addChildAt(container3, 0);
        stage.addChildAt(container4, 0);
        stage.addChildAt(container5, 0);

        assert.equal(count, 5);
    });

    it("addChildAt_stage_capture_added_events_on_nested_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChildAt(container1, 0);
        container1.addChildAt(container2, 0);
        container2.addChildAt(container3, 0);
        container3.addChildAt(container4, 0);
        container4.addChildAt(container5, 0);

        assert.equal(count, 5);
    });

    it("addChildAt_stage_capture_added_events_on_nested_hierarchy_added_in_reverse", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        container4.addChildAt(container5, 0);
        container3.addChildAt(container4, 0);
        container2.addChildAt(container3, 0);
        container1.addChildAt(container2, 0);
        assert.equal(count, 0);

        stage.addChildAt(container1, 0);
        assert.equal(count, 5);
    });

    it("removeChild_return_removed_child_when_child_was_removed", () => {
        let child: DisplayObjectContainer = new DisplayObjectContainer();
        stage.addChild(child);
        assert.equal(child, stage.removeChild(child));
    });

    /*
    it("removeChild_return_false_when_child_was_not_in_the_display_list", () => {
        let child: DisplayObjectContainer = new DisplayObjectContainer();
        assert.isFalse(stage.removeChild(child));
    });
    */

    it("removeChild_stage_capture_removed_events_on_flat_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        stage.addChild(container2);
        stage.addChild(container3);
        stage.addChild(container4);
        stage.addChild(container5);

        stage.removeChild(container1);
        stage.removeChild(container2);
        stage.removeChild(container3);
        stage.removeChild(container4);
        stage.removeChild(container5);

        assert.equal(count, 5);
    });

    it("removeChild_stage_capture_removed_events_on_nested_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        stage.removeChild(container1);
        container1.removeChild(container2);
        container2.removeChild(container3);
        container3.removeChild(container4);
        container4.removeChild(container5);

        assert.equal(count, 5);
    });

    it("removeChild_stage_capture_removed_events_on_nested_hierarchy_removed_in_reverse", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeChild(container5);
        container3.removeChild(container4);
        container2.removeChild(container3);
        container1.removeChild(container2);
        stage.removeChild(container1);

        assert.equal(count, 5);
    });

    it("removeChildAt_return_the_removed_child_when_child_was_removed", () => {
        let child: DisplayObjectContainer = new DisplayObjectContainer();
        stage.addChild(child);
        assert.equal(child, stage.removeChildAt(0));
    });

    it("removeChildAt_stage_capture_removed_events_on_flat_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        stage.addChild(container2);
        stage.addChild(container3);
        stage.addChild(container4);
        stage.addChild(container5);

        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);

        assert.equal(count, 5);
    });

    it("removeChildAt_stage_capture_removed_events_on_nested_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeChildAt(0);
        container3.removeChildAt(0);
        container2.removeChildAt(0);
        container1.removeChildAt(0);
        stage.removeChildAt(0);

        assert.equal(count, 5);
    });

    it("removeAllChildren_remove_all_children", () => {
        let child1: DisplayObjectContainer = new DisplayObjectContainer();
        let child2: DisplayObjectContainer = new DisplayObjectContainer();
        let child3: DisplayObjectContainer = new DisplayObjectContainer();

        stage.addChild(child1);
        stage.addChild(child2);
        stage.addChild(child3);
        stage.removeChildren();

        assert.equal(stage.numChildren, 0);
    });

    it("removeAllChildren_stage_capture_removed_events_on_flat_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        stage.addChild(container2);
        stage.addChild(container3);
        stage.addChild(container4);
        stage.addChild(container5);

        stage.removeChildren();

        assert.equal(count, 5);
    });

    it("removeAllChildren_stage_capture_removed_events_on_nested_hierarchy", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let container4: DisplayObjectContainer = new DisplayObjectContainer();
        let container5: DisplayObjectContainer = new DisplayObjectContainer();

        let count: number = 0;

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                count++;
            },
            true
        );

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeChildren();
        container3.removeChildren();
        container2.removeChildren();
        container1.removeChildren();
        stage.removeChildren();

        assert.equal(count, 5);
    });

    it("stage_does_not_capture_events_dispatched_in_another_stage", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let child1: DisplayObject = new DisplayObject();
        let child2: DisplayObject = new DisplayObject();
        let child3: DisplayObject = new DisplayObject();

        let stageX: Stage = new Stage();

        let containerX1: DisplayObjectContainer = new DisplayObjectContainer();
        let containerX2: DisplayObjectContainer = new DisplayObjectContainer();
        let childX1: DisplayObject = new DisplayObject();
        let childX2: DisplayObject = new DisplayObject();
        let childX3: DisplayObject = new DisplayObject();

        let countAdded: number = 0;
        let countRemoved: number = 0;

        stage.addEventListener(
            Event.ADDED_TO_STAGE,
            (event: Event) => {
                countAdded++;
            },
            true
        );

        stage.addEventListener(
            Event.REMOVED_FROM_STAGE,
            (event: Event) => {
                countRemoved++;
            },
            true
        );

        container2.addChildAt(child1, 0);
        container2.addChildAt(child2, 1);
        container2.addChildAt(child3, 2);
        container1.addChild(container2);
        stage.addChild(container1);

        containerX2.addChildAt(childX1, 0);
        containerX2.addChildAt(childX2, 1);
        containerX2.addChildAt(childX3, 2);
        containerX1.addChild(containerX2);
        stageX.addChild(containerX1);

        assert.equal(countAdded, 5);
        assert.equal(countRemoved, 0);

        container2.removeChildren();
        container1.removeChild(container2);
        stage.removeChild(container1);

        containerX2.removeChildren();
        containerX1.removeChild(containerX2);
        stageX.removeChild(containerX1);

        assert.equal(countRemoved, 5);
    });
});
