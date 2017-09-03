// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
import "../../../../entry";

import { IContainerController } from "../../../../../src";
import { IFlowManager } from "../../../../../src";
import { IPixiRootContainer } from "../../../../../src";
import { PalidorPixiExtension } from "../../../../../src";
import { PixiRootContainer } from "./../../../../../src";

import { assert } from "chai";
import { Container } from "pixi.js";
import { Context } from "@robotlegsjs/core";

describe("PalidorPixiExtension", () => {

    let context: Context;

    beforeEach(() => {
        context = new Context();
        context.install(PalidorPixiExtension);
        context.configure(new PixiRootContainer(new Container()));
    });

    afterEach(() => {
        context = null;
    });

    it("PalidorPixiExtension is mapped into injector", () => {
        let initialized: boolean = false;
        context.whenInitializing(function(): void {
            initialized = true;
        });
        context.initialize();
        assert.isTrue(initialized);
    });

    it("FlowManager is mapped into injector", () => {
        context.whenInitializing(function(): void {
            assert.isDefined(context.injector.get(IFlowManager));
        });
    });

    it("PixiRootContainer is mapped into injector", () => {
        context.whenInitializing(function(): void {
            assert.isDefined(context.injector.get(IPixiRootContainer));
        });
    });

    it("PixiContainerController is mapped into injector", () => {
        context.whenInitializing(function(): void {
            assert.isDefined(context.injector.get(IContainerController));
        });
    });
});
