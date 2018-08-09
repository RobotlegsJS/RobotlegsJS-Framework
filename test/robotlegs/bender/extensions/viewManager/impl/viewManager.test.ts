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
import { ViewManager } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManager";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("ViewManager", () => {
    let stage: Stage = null;
    let registry: ContainerRegistry = null;
    let viewManager: ViewManager = null;
    let stageObserver: StageObserver = null;

    beforeEach(() => {
        stage = new Stage();
        registry = new ContainerRegistry();
        viewManager = new ViewManager(registry);
        stageObserver = new StageObserver(registry);
    });

    afterEach(() => {
        stageObserver.destroy();
        stageObserver = null;
        viewManager = null;
        registry = null;
        stage = null;
    });

    it("container_is_added", () => {
        viewManager.addContainer(stage);
    });

    it("container_is_stored", () => {
        let expectedContainers: any[] = [stage];
        viewManager.addContainer(stage);
        assert.deepEqual(viewManager.containers, expectedContainers);
    });

    it("containers_are_stored", () => {
        let container1: DisplayObjectContainer = new DisplayObjectContainer();
        let container2: DisplayObjectContainer = new DisplayObjectContainer();
        let container3: DisplayObjectContainer = new DisplayObjectContainer();
        let expectedContainers: any[] = [container1, container2, container3];
        viewManager.addContainer(container1);
        viewManager.addContainer(container2);
        viewManager.addContainer(container3);
        assert.deepEqual(viewManager.containers, expectedContainers);
    });

    it("addContainer_ignores_container_when_added_twice", () => {
        let expectedContainers: any[] = [stage];
        viewManager.addContainer(stage);
        viewManager.addContainer(stage);
        assert.deepEqual(viewManager.containers, expectedContainers);
    });

    it("addContainer_throws_if_containers_are_nested_case1", () => {
        function addNestedContainers(): void {
            const container1: DisplayObjectContainer = new DisplayObjectContainer();
            const container2: DisplayObjectContainer = new DisplayObjectContainer();
            container1.addChild(container2);
            viewManager.addContainer(container1);
            viewManager.addContainer(container2);
        }
        assert.throws(addNestedContainers, Error);
    });

    it("addContainer_throws_if_containers_are_nested_case2", () => {
        function addNestedContainers(): void {
            const container1: DisplayObjectContainer = new DisplayObjectContainer();
            const container2: DisplayObjectContainer = new DisplayObjectContainer();
            container2.addChild(container1);
            viewManager.addContainer(container1);
            viewManager.addContainer(container2);
        }
        assert.throws(addNestedContainers, Error);
    });

    it("addContainer_throws_if_containers_are_deeply_nested", () => {
        function addNestedContainers(): void {
            const container1: DisplayObjectContainer = new DisplayObjectContainer();
            const container2: DisplayObjectContainer = new DisplayObjectContainer();
            const container3: DisplayObjectContainer = new DisplayObjectContainer();
            const container4: DisplayObjectContainer = new DisplayObjectContainer();
            const container5: DisplayObjectContainer = new DisplayObjectContainer();
            container1.addChild(container2);
            container2.addChild(container3);
            container3.addChild(container4);
            container4.addChild(container5);
            viewManager.addContainer(container1);
            viewManager.addContainer(container5);
        }
        assert.throws(addNestedContainers, Error);
    });

    it("handler_is_called", () => {
        const expected: DisplayObjectContainer = new DisplayObjectContainer();
        let actual: DisplayObjectContainer = null;
        viewManager.addContainer(stage);
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual = view;
            })
        );
        stage.addChild(expected);
        assert.equal(actual, expected);
    });

    it("handler_is_called_when_added_before_container", () => {
        const expected: DisplayObjectContainer = new DisplayObjectContainer();
        let actual: DisplayObjectContainer = null;
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual = view;
            })
        );
        viewManager.addContainer(stage);
        stage.addChild(expected);
        assert.equal(actual, expected);
    });

    it("handler_is_called__once_when_added_twice", () => {
        const expected: DisplayObjectContainer = new DisplayObjectContainer();
        let actual: DisplayObjectContainer = null;
        let count: number = 0;
        let handler: CallbackViewHandler = new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
            actual = view;
            count++;
        });
        viewManager.addContainer(stage);
        viewManager.addViewHandler(handler);
        viewManager.addViewHandler(handler);
        stage.addChild(expected);
        assert.equal(actual, expected);
        assert.equal(count, 1);
    });

    it("handlers_are_called", () => {
        const expected: string[] = ["handler1", "handler2", "handler3"];
        let actual: string[] = [];
        viewManager.addContainer(stage);
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push("handler1");
            })
        );
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push("handler2");
            })
        );
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push("handler3");
            })
        );
        stage.addChild(new DisplayObjectContainer());
        assert.deepEqual(actual, expected);
    });

    it("handlers_are_called_when_added_before_container", () => {
        const expected: string[] = ["handler1", "handler2", "handler3"];
        let actual: string[] = [];
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push("handler1");
            })
        );
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push("handler2");
            })
        );
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                actual.push("handler3");
            })
        );
        viewManager.addContainer(stage);
        stage.addChild(new DisplayObjectContainer());
        assert.deepEqual(actual, expected);
    });

    it("handler_is_not_called_after_container_removal", () => {
        let callCount: number = 0;
        viewManager.addContainer(stage);
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        viewManager.removeContainer(stage);
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("removeContainer_do_nothing_when_container_was_not_previously_added", () => {
        viewManager.removeContainer(stage);
        assert.equal(viewManager.containers.length, 0);
    });

    it("handler_is_not_called_after_removeViewHandler", () => {
        let callCount: number = 0;
        let handler: CallbackViewHandler = new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
            callCount++;
        });
        viewManager.addContainer(stage);
        viewManager.addViewHandler(handler);
        viewManager.removeViewHandler(handler);
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("handler_is_not_called_after_removeViewHandler_called_twice", () => {
        let callCount: number = 0;
        let handler: CallbackViewHandler = new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
            callCount++;
        });
        viewManager.addContainer(stage);
        viewManager.addViewHandler(handler);
        viewManager.removeViewHandler(handler);
        viewManager.removeViewHandler(handler);
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("handler_is_not_called_after_removeAll", () => {
        let callCount: number = 0;
        viewManager.addContainer(stage);
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        viewManager.removeAllHandlers();
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });

    it("handlers_are_not_called_after_removeAll", () => {
        let callCount: number = 0;
        viewManager.addContainer(stage);
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        viewManager.addViewHandler(
            new CallbackViewHandler((view: DisplayObjectContainer, type: IClass<any>) => {
                callCount++;
            })
        );
        viewManager.removeAllHandlers();
        stage.addChild(new DisplayObjectContainer());
        assert.equal(callCount, 0);
    });
});
