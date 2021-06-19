// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { Container } from "pixi.js";
import { PixiContainerController } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/PixiContainerController";
import "../../../../../entry";
import { Utils } from "../support/Utils";

describe("PixiContainerController", () => {
    let controller: PixiContainerController;
    let view: Container;

    beforeEach(() => {
        view = new Container();
        controller = Utils.getInstanceOfPixiContainerController();
    });

    afterEach(() => {
        controller = null;
        view = null;
    });

    context("add view methods", () => {
        it("should add a new FloatingView in the dynamicLayer when the method addView is called", () => {
            controller.addView(view);
            assert.include(controller.dynamicLayer.children, view);
        });

        it("should increase the length of FloatingView array when the method addView is called", () => {
            controller.addView(view);
            assert.include(controller.floatingViews, view);
        });

        it("should ignore when the view already exists in the dynamicLayer", () => {
            controller.addView(view);
            controller.addView(view);
            assert.lengthOf(controller.floatingViews, 1);
        });

        it("should add a new View in the staticLayer when the method changeView is called", () => {
            controller.changeView(view);
            assert.include(controller.staticLayer.children, view);
        });

        it("should store the new View as a CurrentView when the method changeView is called", () => {
            controller.changeView(view);
            assert.equal(controller.currentView, view);
        });

        it("should store in the index Zero when the method changeView is called", () => {
            let firstView = new Container();
            let secondView = new Container();
            controller.staticLayer.addChild(firstView);
            controller.changeView(secondView);
            assert.equal(controller.staticLayer.getChildAt(0), secondView);
        });
    });

    context("remove view methods", () => {
        it("should remove the current view from the staticLayer", () => {
            controller.changeView(view);
            controller.removeCurrentView();
            assert.notInclude(controller.staticLayer.children, view);
        });

        it("should ignore if the currentView is undefined when the method RemoveCurrentView is called", () => {
            controller.staticLayer.addChild(view);
            controller.removeCurrentView();
            assert.include(controller.staticLayer.children, view);
        });

        it("should remove the last floating view added from the dynamicLayer", () => {
            controller.addView(new Container());
            controller.addView(new Container());
            controller.addView(new Container());
            controller.addView(view);
            controller.removeLastFloatingViewAdded();
            assert.notInclude(controller.dynamicLayer.children, view);
        });

        it("should remove the last floating view added in the floatingViews array", () => {
            controller.addView(new Container());
            controller.addView(new Container());
            controller.addView(new Container());
            controller.addView(view);
            controller.removeLastFloatingViewAdded();
            assert.notInclude(controller.floatingViews, view);
        });

        it("should remove the last floating view added only if contains in the floatingViews array", () => {
            controller.dynamicLayer.addChild(view);
            controller.removeLastFloatingViewAdded();
            assert.include(controller.dynamicLayer.children, view);
        });

        it("should remove all floatingViews stoted in the array when the method removeAllFloagintViews is called", () => {
            controller.addView(view);
            controller.addView(new Container());
            controller.addView(new Container());
            controller.addView(new Container());
            controller.removeAllFloatingViews();
            assert.lengthOf(controller.floatingViews, 0);
        });

        it("should remove all floatingViews stoted in the dynamicLayer when the method removeAllFloagintViews is called", () => {
            controller.addView(view);
            controller.addView(new Container());
            controller.addView(new Container());
            controller.addView(new Container());
            controller.removeAllFloatingViews();
            assert.lengthOf(controller.dynamicLayer.children, 0);
        });
    });
});
