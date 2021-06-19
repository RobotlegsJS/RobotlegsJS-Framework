// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { Container } from "pixi.js";
import { IFlowViewMapping } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowViewMapping";
import { PalidorEvent } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/events/PalidorEvent";
import { FlowManager } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/FlowManager";
import { FlowViewMapping } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/FlowViewMapping";
import "./../../../../../entry";
import { Utils } from "./../support/Utils";

import sinon = require("sinon");

describe("FlowManager", () => {
    let flowManager: FlowManager;
    let view: any;

    beforeEach(() => {
        flowManager = Utils.getInstanceOfFlowManager();
        view = Container;
    });

    afterEach(() => {
        flowManager = null;
        view = null;
    });

    context("constructor", () => {
        it("should create a map of views", () => {
            assert.instanceOf(flowManager.views, Map);
        });
    });

    context("map view methods", () => {
        it("should return a new FlowViewMapping when the method map is called", () => {
            let flowViewMapping: any = flowManager.map("event");
            assert.instanceOf(flowViewMapping, FlowViewMapping);
        });

        it("should return null when the method map is called with an existing event", () => {
            flowManager.views.set("event", view);
            let flowViewMapping: IFlowViewMapping = flowManager.map("event");
            assert.isNull(flowViewMapping);
        });

        it("should increase the views map when the mapFloatingView is called", () => {
            flowManager.mapFloatingView("addFloatingView", view);
            assert.isDefined(flowManager.views.get("addFloatingView"));
            assert.equal(flowManager.views.get("addFloatingView"), view);
        });

        it("should increase the views map when the mapView is called", () => {
            flowManager.mapView("mapView", view);
            assert.isDefined(flowManager.views.get("mapView"));
            assert.equal(flowManager.views.get("mapView"), view);
        });
    });

    context("listeners mapped", () => {
        it("should invoke the method changeView from the controller when a mapped event toView is dispatched", () => {
            let eventString = "showView";
            let spy = sinon.spy(flowManager.controller, "changeView");

            flowManager.mapView(eventString, view);
            flowManager.dispatcher.dispatchEvent(new PalidorEvent(eventString));

            assert.isTrue(spy.calledOnce);
        });

        it("should invoke the method addView from the controller when a mapped event toFloatingView is dispatched", () => {
            let eventString = "showView";
            let spy = sinon.spy(flowManager.controller, "addView");

            flowManager.mapFloatingView(eventString, view);
            flowManager.dispatcher.dispatchEvent(new PalidorEvent(eventString));

            assert.isTrue(spy.calledOnce);
        });

        it("should invoke the method removeCurrentView from the controller when the PalidorEvent.REMOVE_CURRENT_VIEW is dispatched", () => {
            let spy = sinon.spy(flowManager.controller, "removeCurrentView");

            flowManager.dispatcher.dispatchEvent(
                new PalidorEvent(PalidorEvent.REMOVE_CURRENT_VIEW)
            );

            assert.isTrue(spy.calledOnce);
        });

        it("should invoke the method removeLastFloatingViewAdded when the REMOVE_LAST_FLOATING_VIEW_ADDED is dispatched", () => {
            let spy = sinon.spy(flowManager.controller, "removeLastFloatingViewAdded");

            flowManager.dispatcher.dispatchEvent(
                new PalidorEvent(PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED)
            );

            assert.isTrue(spy.calledOnce);
        });

        it("should invoke the method removeAllFloatingViews from the controller when the REMOVE_ALL_FLOATING_VIEWS is dispatched", () => {
            let spy = sinon.spy(flowManager.controller, "removeAllFloatingViews");

            flowManager.dispatcher.dispatchEvent(
                new PalidorEvent(PalidorEvent.REMOVE_ALL_FLOATING_VIEWS)
            );

            assert.isTrue(spy.calledOnce);
        });
    });
});
