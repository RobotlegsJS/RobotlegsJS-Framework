// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    Context,
    DirectCommandMapExtension,
    EventCommandMapExtension,
    EventDispatcherExtension,
    InjectableLoggerExtension,
    LocalEventMapExtension,
    MVCSBundle
} from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";
import { assert } from "chai";
import { Container } from "pixi.js";
import { IContainerController } from "../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IContainerController";
import { IFlowManager } from "../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowManager";
import { PalidorPixiExtension } from "../../../../../src/robotlegs/bender/extensions/palidorPixi/PalidorPixiExtension";
import "../../../../entry";

describe("PalidorPixiExtension", () => {
    let context: Context;

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }
        context = null;
    });

    it("PalidorPixiExtension is properly initialized", () => {
        let initialized: boolean = false;

        context = new Context();
        context.install(MVCSBundle, PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));
        context.whenInitializing(() => {
            initialized = true;
        });
        context.initialize();

        assert.isTrue(initialized);
    });

    it("FlowManager is mapped into injector", () => {
        context = new Context();
        context.install(MVCSBundle, PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));
        context.afterInitializing(() => {
            assert.isDefined(context.injector.get(IFlowManager));
        });
        context.initialize();
    });

    it("PixiContainerController is mapped into injector", () => {
        context = new Context();
        context.install(MVCSBundle, PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));
        context.afterInitializing(() => {
            assert.isDefined(context.injector.get(IContainerController));
        });
        context.initialize();
    });

    it("PalidorPixiExtension is not installed when IContextView is not provided", () => {
        context = new Context();
        context.install(
            InjectableLoggerExtension,
            EventDispatcherExtension,
            DirectCommandMapExtension,
            EventCommandMapExtension,
            LocalEventMapExtension
        );
        context.install(PixiBundle);
        context.install(PalidorPixiExtension);
        context.afterInitializing(() => {
            assert.isFalse(context.injector.isBound(IContainerController));
            assert.isFalse(context.injector.isBound(IFlowManager));
        });
        context.initialize();
    });
});
