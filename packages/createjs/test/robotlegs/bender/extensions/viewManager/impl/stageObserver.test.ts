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
import { StageObserver } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/StageObserver";
import "../../../../../entry";
import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("StageObserver", () => {
    let stage: createjs.Stage = null;
    let registry: ContainerRegistry = null;
    let observer: StageObserver = null;

    beforeEach(() => {
        stage = new createjs.Stage("canvas");
        applyCreateJSPatch(stage);
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
        const expected: createjs.Container = new createjs.Container();
        let actual: createjs.Container = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });

    it("view_is_handled_when_added_somewhere_inside_container", () => {
        const middle1: createjs.Container = new createjs.Container();
        const middle2: createjs.Container = new createjs.Container();
        const middle3: createjs.Container = new createjs.Container();
        const expected: createjs.Container[] = [middle1, middle2, middle3];
        let actual: createjs.Container[] = [];
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                actual.push(view);
            })
        );
        stage.addChild(middle1);
        middle1.addChild(middle2);
        middle2.addChild(middle3);
        assert.deepEqual(actual, expected);
    });

    it("view_is_handled_when_container_was_already_added_into_registry", () => {
        const expected: createjs.Container = new createjs.Container();
        let actual: createjs.Container = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });

    it("view_is_not_handled_when_added_outside_container", () => {
        let callCount: number = 0;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                callCount++;
            })
        );
        let container2: createjs.Container = new createjs.Container();
        container2.addChild(new createjs.Container());
        assert.equal(callCount, 0);
    });

    it("view_is_not_handled_after_container_removal", () => {
        let callCount: number = 0;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                callCount++;
            })
        );
        registry.removeContainer(stage);
        stage.addChild(new createjs.Container());
        assert.equal(callCount, 0);
    });

    it("view_is_not_handled_after_stageObserver_is_destroyed", () => {
        let callCount: number = 0;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                callCount++;
            })
        );
        observer.destroy();
        stage.addChild(new createjs.Container());
        assert.equal(callCount, 0);
    });

    it("root_container_is_handled_when_added_to_stage", () => {
        const expected: createjs.Container = new createjs.Container();
        let actual: createjs.Container = null;
        registry.addContainer(stage).addHandler(
            new CallbackViewHandler((view: createjs.Container, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });
});
