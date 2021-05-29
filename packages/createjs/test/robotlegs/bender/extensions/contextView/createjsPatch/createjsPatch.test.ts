// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { applyCreateJSPatch } from "../../../../../../src/robotlegs/bender/extensions/contextView/createjsPatch/createjs-patch";

describe("CreateJSPatch", () => {
    let stage: createjs.Stage;

    beforeEach(() => {
        stage = new createjs.Stage("canvas");
    });

    afterEach(() => {
        stage = null;
    });

    it("applyCreateJSPatch_method_works", () => {
        applyCreateJSPatch(stage);
    });

    it("addChild_return_reference_of_child_added", () => {
        let child: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child, stage.addChild(child));
    });

    it("addChild_with_two_parameters_return_reference_of_last_child_added", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child2, stage.addChild(child1, child2));
    });

    it("addChild_with_three_parameters_return_reference_of_last_child_added", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        let child3: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child3, stage.addChild(child1, child2, child3));
    });

    it("addChild_stage_capture_added_events_only_when_object_is_attached_to_stage", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

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
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy_added_in_reverse", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        container4.addChild(container5);
        container3.addChild(container4);
        container2.addChild(container3);
        container1.addChild(container2);
        assert.equal(count, 0);

        stage.addChild(container1);
        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy_with_display_objects", () => {
        applyCreateJSPatch(stage);

        let container: createjs.Container = new createjs.Container();
        let containerL: createjs.Container = new createjs.Container();
        let containerR: createjs.Container = new createjs.Container();

        let childL1: createjs.DisplayObject = new createjs.DisplayObject();
        let childL2: createjs.DisplayObject = new createjs.DisplayObject();
        let childR1: createjs.DisplayObject = new createjs.DisplayObject();
        let childR2: createjs.DisplayObject = new createjs.DisplayObject();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        containerL.addChild(childL1);
        containerL.addChild(childL2);
        containerR.addChild(childR1);
        containerR.addChild(childR2);

        container.addChild(containerL, containerR);
        assert.equal(count, 0);

        stage.addChild(container);
        assert.equal(count, 7);
    });

    it("addChildAt_return_reference_of_child_added", () => {
        let child: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child, stage.addChildAt(child, 0));
    });

    it("addChildAt_with_two_parameters_return_reference_of_last_child_added", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child2, stage.addChildAt(child1, child2, 0));
    });

    it("addChildAt_with_three_parameters_return_reference_of_last_child_added", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        let child3: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child3, stage.addChildAt(child1, child2, child3, 0));
    });

    it("addChildAt_with_four_parameters_return_reference_of_last_child_added", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        let child3: createjs.Container = new createjs.Container();
        let child4: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.equal(child4, stage.addChildAt(child1, child2, child3, child4, 0));
    });

    it("addChildAt_add_children_in_order", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        let child3: createjs.Container = new createjs.Container();
        let child4: createjs.Container = new createjs.Container();
        const expected: createjs.DisplayObject[] = [child1, child2, child3, child4];
        applyCreateJSPatch(stage);
        stage.addChildAt(child1, child2, child3, child4, 0);
        assert.deepEqual(stage.children, expected);
    });

    it("addChildAt_stage_capture_added_events_on_flat_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        stage.addChildAt(container1, 0);
        stage.addChildAt(container2, 0);
        stage.addChildAt(container3, 0);
        stage.addChildAt(container4, 0);
        stage.addChildAt(container5, 0);

        assert.equal(count, 5);
    });

    it("addChildAt_stage_capture_added_events_on_nested_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        stage.addChildAt(container1, 0);
        container1.addChildAt(container2, 0);
        container2.addChildAt(container3, 0);
        container3.addChildAt(container4, 0);
        container4.addChildAt(container5, 0);

        assert.equal(count, 5);
    });

    it("addChildAt_stage_capture_added_events_on_nested_hierarchy_added_in_reverse", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("added", () => {
            count++;
        });

        container4.addChildAt(container5, 0);
        container3.addChildAt(container4, 0);
        container2.addChildAt(container3, 0);
        container1.addChildAt(container2, 0);
        assert.equal(count, 0);

        stage.addChildAt(container1, 0);
        assert.equal(count, 5);
    });

    it("removeChild_return_true_when_child_was_removed", () => {
        let child: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        stage.addChild(child);
        assert.isTrue(stage.removeChild(child));
    });

    it("removeChild_return_false_when_child_was_not_in_the_display_list", () => {
        let child: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        assert.isFalse(stage.removeChild(child));
    });

    it("removeChild_return_true_when_children_were_removed", () => {
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        let child3: createjs.Container = new createjs.Container();
        let child4: createjs.Container = new createjs.Container();
        let child5: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        stage.addChild(child1, child2, child3, child4, child5);
        assert.isTrue(stage.removeChild(child1, child2, child3, child4, child5));
    });

    it("removeChild_stage_capture_removed_events_on_flat_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        stage.removeChild(container1);
        stage.removeChild(container2);
        stage.removeChild(container3);
        stage.removeChild(container4);
        stage.removeChild(container5);

        assert.equal(count, 5);
    });

    it("removeChild_stage_capture_removed_events_on_nested_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

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
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

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

    it("removeChildAt_return_true_when_child_was_removed", () => {
        let child: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        stage.addChild(child);
        assert.isTrue(stage.removeChildAt(0));
    });

    it("removeChildAt_stage_capture_removed_events_on_flat_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);

        assert.equal(count, 5);
    });

    it("removeChildAt_stage_capture_removed_events_on_nested_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

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
        let child1: createjs.Container = new createjs.Container();
        let child2: createjs.Container = new createjs.Container();
        let child3: createjs.Container = new createjs.Container();
        applyCreateJSPatch(stage);
        stage.addChild(child1);
        stage.addChild(child2);
        stage.addChild(child3);
        stage.removeAllChildren();
        assert.isEmpty(stage.children);
    });

    it("removeAllChildren_stage_capture_removed_events_on_flat_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        stage.removeAllChildren();

        assert.equal(count, 5);
    });

    it("removeAllChildren_stage_capture_removed_events_on_nested_hierarchy", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let container3: createjs.Container = new createjs.Container();
        let container4: createjs.Container = new createjs.Container();
        let container5: createjs.Container = new createjs.Container();

        let count: number = 0;

        stage.on("removed", () => {
            count++;
        });

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeAllChildren();
        container3.removeAllChildren();
        container2.removeAllChildren();
        container1.removeAllChildren();
        stage.removeAllChildren();

        assert.equal(count, 5);
    });

    it("stage_does_not_capture_events_dispatched_in_another_stage", () => {
        applyCreateJSPatch(stage);

        let container1: createjs.Container = new createjs.Container();
        let container2: createjs.Container = new createjs.Container();
        let child1: createjs.DisplayObject = new createjs.DisplayObject();
        let child2: createjs.DisplayObject = new createjs.DisplayObject();
        let child3: createjs.DisplayObject = new createjs.DisplayObject();

        let stageX: createjs.Stage = new createjs.Stage("canvasX");

        applyCreateJSPatch(stageX);

        let containerX1: createjs.Container = new createjs.Container();
        let containerX2: createjs.Container = new createjs.Container();
        let childX1: createjs.DisplayObject = new createjs.DisplayObject();
        let childX2: createjs.DisplayObject = new createjs.DisplayObject();
        let childX3: createjs.DisplayObject = new createjs.DisplayObject();

        let countAdded: number = 0;
        let countRemoved: number = 0;

        stage.on("added", () => {
            countAdded++;
        });

        stage.on("removed", () => {
            countRemoved++;
        });

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

        container2.removeAllChildren();
        container1.removeChild(container2);
        stage.removeChild(container1);

        containerX2.removeAllChildren();
        containerX1.removeChild(containerX2);
        stageX.removeChild(containerX1);

        assert.equal(countRemoved, 5);
    });
});
