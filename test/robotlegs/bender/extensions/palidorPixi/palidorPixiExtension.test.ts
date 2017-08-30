// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------
import { assert } from "chai";

import { Context } from "@robotlegsjs/core";

import { PalidorPixiExtension } from "../../../../../src/robotlegs/bender/extensions/palidorPixi/PalidorPixiExtension";
import { IFlowManager } from "../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowManager";

describe("PalidorPixiExtension", () => {

    let context: Context;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context = null;
    });

    it("PalidorPixiExtension is mapped into injector", () => {
        let initialized: boolean = false;
        context.install(PalidorPixiExtension);
        context.whenInitializing(function (): void {
            initialized = true;
        });
        context.initialize();
        assert.isTrue(initialized);
    });

    it("FlowManager is mapped into injector", () => {
        context.install(PalidorPixiExtension);
        context.whenInitializing(function (): void {
            assert.isDefined(context.injector.get(IFlowManager));
        });
    });
});
