// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";
import { Container } from "pixi.js";
import { IContainerController } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IContainerController";
import { IFlowManager } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowManager";
import { FlowManager } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/FlowManager";
import { PixiContainerController } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/PixiContainerController";
import { PalidorPixiExtension } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/PalidorPixiExtension";

export class Utils {
    public static getInstanceOfFlowManager(): FlowManager {
        let context = new Context();
        context.install(MVCSBundle);
        context.install(PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));

        return <FlowManager>context.injector.get(IFlowManager);
    }

    public static getInstanceOfPixiContainerController(): PixiContainerController {
        let context = new Context();
        context.install(MVCSBundle);
        context.install(PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));

        return <PixiContainerController>context.injector.get(IContainerController);
    }
}
