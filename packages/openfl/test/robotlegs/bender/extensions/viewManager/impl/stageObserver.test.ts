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

import { IClass } from "@robotlegsjs/core";

import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { StageObserver } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/StageObserver";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("StageObserver", () => {
    let stage: Stage = null;
    let registry: ContainerRegistry = null;
    let observer: StageObserver = null;

    beforeEach(() => {
        stage = new Stage();
        registry = new ContainerRegistry();
        observer = new StageObserver(registry);
    });

    afterEach(() => {
        observer.destroy();
        observer = null;
        registry = null;
        stage = null;
    });

    it("view_is_handled_when_added_to_container", () => {
        const expected: DisplayObjectContainer = new DisplayObjectContainer();
        let actual: DisplayObjectContainer = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });

    it("view_is_handled_when_added_somewhere_inside_container", () => {
        const middle1: DisplayObjectContainer = new DisplayObjectContainer();
        const middle2: DisplayObjectContainer = new DisplayObjectContainer();
        const middle3: DisplayObjectContainer = new DisplayObjectContainer();
        const expected: DisplayObjectContainer[] = [middle1, middle2, middle3];
        let actual: DisplayObjectContainer[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push(view);
            })
        );
        stage.addChild(middle1);
        middle1.addChild(middle2);
        middle2.addChild(middle3);
        assert.deepEqual(actual, expected);
    });

    it("view_is_handled_when_container_was_already_added_into_registry", () => {
        const expected: DisplayObjectContainer = new DisplayObjectContainer();
        let actual: DisplayObjectContainer = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });

    it("view_is_not_handled_when_added_outside_container", () => {
        let callCount: number = 0;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        container2.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("view_is_not_handled_after_container_removal", () => {
        let callCount: number = 0;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        registry.removeContainer(stage);
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("view_is_not_handled_after_stageObserver_is_destroyed", () => {
        let callCount: number = 0;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        observer.destroy();
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("root_container_is_handled_when_added_to_stage", () => {
        const expected: DisplayObjectContainer = new DisplayObjectContainer();
        let actual: DisplayObjectContainer = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });
});
