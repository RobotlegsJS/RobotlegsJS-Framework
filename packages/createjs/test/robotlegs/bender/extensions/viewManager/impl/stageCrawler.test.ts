// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";
import { assert } from "chai";
import { applyCreateJSPatch } from "../../../../../../src/robotlegs/bender/extensions/contextView/createjsPatch/createjs-patch";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { StageCrawler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/StageCrawler";
import "../../../../../entry";
import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("StageCrawler", () => {
    let stage: createjs.Stage = null;
    let registry: ContainerRegistry = null;
    let crawler: StageCrawler = null;

    beforeEach(() => {
        stage = new createjs.Stage("canvas");
        applyCreateJSPatch(stage);
        registry = new ContainerRegistry();
    });

    afterEach(() => {
        crawler = null;
        stage = null;
    });

    it("scan_finds_container_itself", () => {
        let actual: createjs.Container = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                actual = view;
            })
        );
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.equal(actual, stage);
    });

    it("scan_finds_direct_child", () => {
        const child: createjs.Container = new createjs.Container();
        const expected: createjs.Container[] = [stage, child];
        let actual: createjs.Container[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                actual.push(view);
            })
        );
        stage.addChild(child);
        crawler = new StageCrawler(registry.getBinding(stage));
        crawler.scan(stage);
        assert.deepEqual(actual, expected);
    });

    it("scan_finds_all_direct_children", () => {
        const child1: createjs.Container = new createjs.Container();
        const child2: createjs.Container = new createjs.Container();
        const child3: createjs.Container = new createjs.Container();
        const expected: createjs.Container[] = [stage, child1, child2, child3];
        let actual: createjs.Container[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
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
        const child1: createjs.DisplayObject = new createjs.DisplayObject();
        const child2: createjs.DisplayObject = new createjs.DisplayObject();
        const child3: createjs.DisplayObject = new createjs.DisplayObject();
        const expected: createjs.DisplayObject[] = [stage, child1, child2, child3];
        let actual: createjs.Container[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
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
        const intermediary: createjs.Container = new createjs.Container();
        const child1: createjs.Container = new createjs.Container();
        const child2: createjs.Container = new createjs.Container();
        const expected: createjs.Container[] = [stage, intermediary, child1, child2];
        let actual: createjs.Container[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
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
