// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContainerController } from "./api/IContainerController";
import { IFlowManager } from "./api/IFlowManager";

import { FlowManager } from "./impl/FlowManager";
import { PixiContainerController } from "./impl/PixiContainerController";

import { IContext, IExtension, IInjector, instanceOfType } from "@robotlegsjs/core";

import { IContextView, ContextView } from "@robotlegsjs/pixi";

export class PalidorPixiExtension implements IExtension {
    private _injector: IInjector;

    public extend(context: IContext): void {
        this._injector = context.injector;

        context.addConfigHandler(instanceOfType(ContextView), this.handleContextView.bind(this));
    }

    private handleContextView(contextView: IContextView): void {
        this._injector
            .bind(IContainerController)
            .to(PixiContainerController)
            .inSingletonScope();
        this._injector
            .bind(IFlowManager)
            .to(FlowManager)
            .inSingletonScope();
    }
}
