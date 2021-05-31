// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { Context, IContext } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { assert } from "chai";
import { Container } from "pixi.js";

import { IContainerController, IFlowManager, PalidorBundle } from "./../../../../../src";

describe("PixiBundle", () => {
    let context: IContext;

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }
        context = null;
    });

    it("should bound properly all Palidor interfaces", () => {
        context = new Context();
        context.install(PalidorBundle).configure(new ContextView(new Container())).initialize();

        assert.isTrue(context.injector.isBound(IFlowManager));
        assert.isTrue(context.injector.isBound(IContainerController));
    });

    it("should not install Palidor without the ContextView", () => {
        context = new Context();
        context.install(PalidorBundle).initialize();

        assert.isFalse(context.injector.isBound(IFlowManager));
        assert.isFalse(context.injector.isBound(IContainerController));
    });
});
