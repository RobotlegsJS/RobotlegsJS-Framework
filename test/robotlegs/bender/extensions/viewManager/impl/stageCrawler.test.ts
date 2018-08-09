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

import { IClass } from "@robotlegsjs/core";

import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { StageCrawler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/StageCrawler";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("StageCrawler", () => {
    let stage: Stage = null;
    let registry: ContainerRegistry = null;
    let crawler: StageCrawler = null;

    beforeEach(() => {
        stage = new Stage();
        registry = new ContainerRegistry();
    });

    afterEach(() => {
        crawler = null;
        stage = null;
    });

    xit("scan_finds_container_itself", () => {
        let actual: DisplayObjectContainer = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual = view;
            })
        );
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.equal(actual, stage);
    });

    xit("scan_finds_direct_child", () => {
        const child: DisplayObjectContainer = new DisplayObjectContainer();
        const expected: DisplayObjectContainer[] = [stage, child];
        let actual: DisplayObjectContainer[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push(view);
            })
        );
        stage.addChild(child);
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.deepEqual(actual, expected);
    });

    xit("scan_finds_all_direct_children", () => {
        const child1: DisplayObjectContainer = new DisplayObjectContainer();
        const child2: DisplayObjectContainer = new DisplayObjectContainer();
        const child3: DisplayObjectContainer = new DisplayObjectContainer();
        const expected: DisplayObjectContainer[] = [stage, child1, child2, child3];
        let actual: DisplayObjectContainer[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push(view);
            })
        );
        stage.addChild(child1);
        stage.addChild(child2);
        stage.addChild(child3);
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.deepEqual(actual, expected);
    });

    it("scan_finds_all_direct_children_that_are_display_object", () => {
        const child1: DisplayObject = new DisplayObject();
        const child2: DisplayObject = new DisplayObject();
        const child3: DisplayObject = new DisplayObject();
        const expected: DisplayObject[] = [stage, child1, child2, child3];
        let actual: DisplayObjectContainer[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push(view);
            })
        );
        stage.addChild(child1);
        stage.addChild(child2);
        stage.addChild(child3);
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.deepEqual(actual, expected);
    });

    it("scan_finds_nested_children", () => {
        const intermediary: DisplayObjectContainer = new DisplayObjectContainer();
        const child1: DisplayObjectContainer = new DisplayObjectContainer();
        const child2: DisplayObjectContainer = new DisplayObjectContainer();
        const expected: DisplayObjectContainer[] = [stage, intermediary, child1, child2];
        let actual: DisplayObjectContainer[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push(view);
            })
        );
        intermediary.addChild(child1);
        intermediary.addChild(child2);
        stage.addChild(intermediary);
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.deepEqual(actual, expected);
    });
});
