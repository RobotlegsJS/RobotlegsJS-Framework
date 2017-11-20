// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContainerController } from "./api/IContainerController";
import { IFlowManager } from "./api/IFlowManager";

import { FlowManager } from "./impl/FlowManager";
import { PixiContainerContoller } from "./impl/PixiContainerContoller";

import {
    IContext,
    IExtension,
    IInjector,
    ILogger,
    instanceOfType
} from "@robotlegsjs/core";

import { IContextView, ContextView } from "@robotlegsjs/pixi";

export class PalidorPixiExtension implements IExtension {
    private _injector: IInjector;
    private _logger: ILogger;

    public extend(context: IContext): void {
        this._injector = context.injector;
        this._logger = context.getLogger(this);

        context.addConfigHandler(
            instanceOfType(ContextView),
            this.handleContextView.bind(this)
        );
    }

    private handleContextView(contextView: IContextView): void {
        this._injector
            .bind(IContainerController)
            .to(PixiContainerContoller)
            .inSingletonScope();
        this._injector
            .bind(IFlowManager)
            .to(FlowManager)
            .inSingletonScope();
    }
}
