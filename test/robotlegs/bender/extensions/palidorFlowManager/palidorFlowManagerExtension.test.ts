// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry.ts";

import { assert } from "chai";

import { Context } from "@robotlegsjs/core";

import { PalidorFlowManagerExtension } from "../../../../../src/robotlegs/bender/extensions/palidorFlowManager/PalidorFlowManagerExtension";

describe("PalidorFlowManagerExtension", () => {

    let context: Context;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context = null;
    });

    it("PalidorFlowManagerExtension is mapped into injector", () => {
        let initialized: boolean = false;
        context.install(PalidorFlowManagerExtension);
        context.whenInitializing(function(): void {
            initialized = true;
        });
        context.initialize();
        assert.isTrue(initialized);
    });
});
