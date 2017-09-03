import { IContainerController } from "./../../../../../../src";
import { PixiContainerContoller } from "./../../../../../../src";
import { IFlowManager } from "./../../../../../../src";
import { FlowManager } from "../../../../../../src";
import { Container } from "pixi.js";
import { PixiRootContainer } from "../../../../../../src";
import { PalidorPixiExtension } from "./../../../../../../src";
import { MVCSBundle } from "@robotlegsjs/core";
import { Context } from "@robotlegsjs/core";

export class Utils {
    public static getInstanceOfFlowManager(): FlowManager {
        let context = new Context();
        context.install(MVCSBundle);
        context.install(PalidorPixiExtension);
        context.configure(new PixiRootContainer(new Container()));

        return <FlowManager>context.injector.get(IFlowManager);
    }

    public static getInstanceOfPixiContainerController(): PixiContainerContoller {
        let context = new Context();
        context.install(MVCSBundle);
        context.install(PalidorPixiExtension);
        context.configure(new PixiRootContainer(new Container()));

        return <PixiContainerContoller>context.injector.get(IContainerController);
    }
}
