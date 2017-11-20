// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContainerController } from "./../../../../../../src";
import { PixiContainerContoller } from "./../../../../../../src";
import { IFlowManager } from "./../../../../../../src";
import { FlowManager } from "../../../../../../src";
import { Container } from "pixi.js";
import { PalidorPixiExtension } from "./../../../../../../src";
import { MVCSBundle } from "@robotlegsjs/core";
import { Context } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";

export class Utils {
    public static getInstanceOfFlowManager(): FlowManager {
        let context = new Context();
        context.install(MVCSBundle);
        context.install(PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));

        return <FlowManager>context.injector.get(IFlowManager);
    }

    public static getInstanceOfPixiContainerController(): PixiContainerContoller {
        let context = new Context();
        context.install(MVCSBundle);
        context.install(PixiBundle);
        context.install(PalidorPixiExtension);
        context.configure(new ContextView(new Container()));

        return <PixiContainerContoller>context.injector.get(
            IContainerController
        );
    }
}
