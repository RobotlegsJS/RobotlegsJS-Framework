// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event, IConfig, IEventDispatcher, inject, injectable } from "@robotlegsjs/core";
import { IMediatorMap } from "@robotlegsjs/pixi";

import { PalidorViewMediator } from "../mediators/PalidorViewMediator";
import { RobotlegsViewMediator } from "../mediators/RobotlegsViewMediator";
import { PalidorView } from "../views/PalidorView";
import { IFlowManager } from "./../../src/robotlegs/bender/extensions/palidorPixi/api/IFlowManager";
import { FloatingViewMediator } from "./../mediators/FloatingViewMediator";
import { FloatingView } from "./../views/FloatingView";
import { RobotlegsView } from "./../views/RobotlegsView";

@injectable()
export class ExampleConfig implements IConfig {
    @inject(IFlowManager)
    private _flowManager: IFlowManager;

    @inject(IEventDispatcher)
    private _dispatcher: IEventDispatcher;

    @inject(IMediatorMap)
    private _mediatorMap: IMediatorMap;

    public configure(): void {
        this._mapPalidor();
        this._mapMediators();

        this._dispatcher.dispatchEvent(new Event("palidorView"));
    }

    private _mapPalidor(): void {
        this._flowManager.map("palidorView").toView(PalidorView);
        this._flowManager.map("robotlegsjsView").toView(RobotlegsView);

        this._flowManager.map("floatingView").toFloatingView(FloatingView);
    }

    private _mapMediators(): void {
        this._mediatorMap.map(PalidorView).toMediator(PalidorViewMediator);
        this._mediatorMap.map(RobotlegsView).toMediator(RobotlegsViewMediator);

        this._mediatorMap.map(FloatingView).toMediator(FloatingViewMediator);
    }
}
