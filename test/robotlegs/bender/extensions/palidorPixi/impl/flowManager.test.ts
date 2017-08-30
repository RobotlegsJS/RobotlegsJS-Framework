import "./../../../../../entry";
import { assert } from "chai";

import { EventMap } from "./../support/EventMap";
import { Context, MVCSBundle, EventDispatcher } from "@robotlegsjs/core";
import { IFlowManager } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowManager";
import { FlowManager } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/FlowManager";
import { IFlowViewMapping } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowViewMapping";
import { FlowViewMapping } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/FlowViewMapping";

describe("FlowManager", () => {

    let flowManager: FlowManager;
    let view: any;

    beforeEach(() => {
        flowManager = new FlowManager();
        flowManager.eventDispatcher = new EventDispatcher();
        flowManager.eventMap = new EventMap();
        view = { name: "view" };
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

    context("inject values", () => {
        it("should inject an instance of IEventMap", () => {
            let hasEventDispatcher: Boolean = false;
            let context: Context = new Context();
            context.install(MVCSBundle);
            context.whenInitializing(function (): void {
                context.injector.bind(IFlowManager).to(FlowManager).inSingletonScope();
                flowManager = context.injector.get(IFlowManager);
                hasEventDispatcher = (flowManager.eventMap !== undefined);
            });
            context.initialize();
            assert.isTrue(hasEventDispatcher);
        });
        it("should inject an instance of IEventDispatcher", () => {
            let hasEventDispatcher: Boolean = false;
            let context: Context = new Context();
            context.install(MVCSBundle);
            context.whenInitializing(function (): void {
                context.injector.bind(IFlowManager).to(FlowManager).inSingletonScope();
                flowManager = context.injector.get(IFlowManager);
                hasEventDispatcher = (flowManager.eventDispatcher !== undefined);
            });
            context.initialize();
            assert.isTrue(hasEventDispatcher);
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

});
