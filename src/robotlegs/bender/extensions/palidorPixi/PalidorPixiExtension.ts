// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContainerController } from "./api/IContainerController";
import { IFlowManager } from "./api/IFlowManager";
import { IPixiRootContainer } from "./api/IPixiRootContainer";
import { FlowManager } from "./impl/FlowManager";
import { PixiContainerContoller } from "./impl/PixiContainerContoller";
import { PixiRootContainer } from "./impl/PixiRootContainer";

import { IContext, IExtension, IInjector, instanceOfType } from "@robotlegsjs/core";

export class PalidorPixiExtension implements IExtension {

    private _injector: IInjector;

    public extend(context: IContext): void {
        this._injector = context.injector;

        context.addConfigHandler(instanceOfType(PixiRootContainer), this.handlePixiRootContainer.bind(this));
    }

    private handlePixiRootContainer(root: PixiRootContainer): void {
        this._injector.bind(IPixiRootContainer).toConstantValue(root);
        this._injector.bind(IContainerController).to(PixiContainerContoller).inSingletonScope();
        this._injector.bind(IFlowManager).to(FlowManager).inSingletonScope();
    }
}
