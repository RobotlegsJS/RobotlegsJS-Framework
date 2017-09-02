import { IContainerController } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IContainerController";
import { PixiContainerContoller } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/PixiContainerContoller";
import { IFlowManager } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowManager";
import { FlowManager } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/FlowManager";
import { Container } from "pixi.js";
import { PixiRootContainer } from "../../../../../../src/robotlegs/bender/extensions/palidorPixi/impl/PixiRootContainer";
import { PalidorPixiExtension } from "./../../../../../../src/robotlegs/bender/extensions/palidorPixi/PalidorPixiExtension";
import { MVCSBundle } from "@robotlegsjs/core";
import { Context } from "@robotlegsjs/core/lib/robotlegs/bender/framework/impl/Context";

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
