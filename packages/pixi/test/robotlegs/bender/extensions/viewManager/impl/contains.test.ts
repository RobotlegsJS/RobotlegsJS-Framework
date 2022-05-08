// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { Container, DisplayObject, Sprite } from "pixi.js";
import { contains } from "../../../../../../src/robotlegs/bender/extensions/viewManager/support/contains";
import "../../../../../entry";

describe("Contains", () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
    });

    afterEach(() => {
        container.removeChildren();
        container = null;
    });

    it("Container_contains_itself", () => {
        assert.isTrue(contains(container, container));
    });

    it("Container_contains_direct_child", () => {
        let child: DisplayObject = new Sprite();

        container.addChild(child);

        assert.isTrue(contains(container, child));
    });

    it("Container_contains_direct_children", () => {
        let child1: DisplayObject = new Sprite();
        let child2: DisplayObject = new Sprite();
        let child3: DisplayObject = new Sprite();

        container.addChild(child1);
        container.addChild(child2);
        container.addChild(child3);

        assert.isTrue(contains(container, child1));
        assert.isTrue(contains(container, child2));
        assert.isTrue(contains(container, child3));
    });

    it("Container_contains_nested_children", () => {
        let child1: Container = new Container();
        let child2: DisplayObject = new Sprite();
        let child3: DisplayObject = new Sprite();
        let grandChild1: Container = new Container();
        let grandChild2: DisplayObject = new Sprite();
        let grandChild3: DisplayObject = new Sprite();
        let greatGrandChild1: DisplayObject = new Sprite();
        let greatGrandChild2: DisplayObject = new Sprite();
        let greatGrandChild3: DisplayObject = new Sprite();

        container.addChild(child1);
        container.addChild(child2);
        container.addChild(child3);

        child1.addChild(grandChild1);
        child1.addChild(grandChild2);
        child1.addChild(grandChild3);

        grandChild1.addChild(greatGrandChild1);
        grandChild1.addChild(greatGrandChild2);
        grandChild1.addChild(greatGrandChild3);

        assert.isTrue(contains(container, child1));
        assert.isTrue(contains(container, child2));
        assert.isTrue(contains(container, child3));

        assert.isTrue(contains(container, grandChild1));
        assert.isTrue(contains(container, grandChild2));
        assert.isTrue(contains(container, grandChild3));

        assert.isTrue(contains(container, greatGrandChild1));
        assert.isTrue(contains(container, greatGrandChild2));
        assert.isTrue(contains(container, greatGrandChild3));
    });

    it("Container_does_not_contains_ancestors", () => {
        let parent: Container = new Container();
        let grandParent: Container = new Container();
        let greatGrandParent: Container = new Container();

        parent.addChild(container);
        grandParent.addChild(parent);
        greatGrandParent.addChild(grandParent);

        assert.isFalse(contains(container, parent));
        assert.isFalse(contains(container, grandParent));
        assert.isFalse(contains(container, greatGrandParent));
    });

    it("Container_does_not_contains_same_level_container", () => {
        let parent: Container = new Container();
        let brother: Container = new Container();
        let sister: Container = new Container();

        parent.addChild(container);
        parent.addChild(brother);
        parent.addChild(sister);

        assert.isFalse(contains(container, parent));
        assert.isFalse(contains(container, brother));
        assert.isFalse(contains(container, sister));
    });
});
