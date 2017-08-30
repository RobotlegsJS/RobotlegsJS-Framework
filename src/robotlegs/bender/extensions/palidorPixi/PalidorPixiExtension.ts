import { FlowManager } from "./impl/FlowManager";
import { IFlowManager } from "./api/IFlowManager";
import {
    IContext,
    IExtension,
    IInjector
} from "@robotlegsjs/core";

export class PalidorPixiExtension implements IExtension {
    public extend(context: IContext): void {
        context.injector.bind(IFlowManager).to(FlowManager).inSingletonScope();
    }
}
