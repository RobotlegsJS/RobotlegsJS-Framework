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
    private flowManager: IFlowManager;
    @inject(IEventDispatcher)
    private dispatcher: IEventDispatcher;
    @inject(IMediatorMap)
    private mediatorMap: IMediatorMap;

    public configure(): void {
        this.mapPalidor();
        this.mapMediators();

        this.dispatcher.dispatchEvent(new Event("palidorView"));
    }
    private mapPalidor(): void {
        this.flowManager.map("palidorView").toView(PalidorView);
        this.flowManager.map("robotlegsjsView").toView(RobotlegsView);

        this.flowManager.map("floatingView").toFloatingView(FloatingView);
    }
    private mapMediators(): void {
        this.mediatorMap.map(PalidorView).toMediator(PalidorViewMediator);
        this.mediatorMap.map(RobotlegsView).toMediator(RobotlegsViewMediator);

        this.mediatorMap.map(FloatingView).toMediator(FloatingViewMediator);
    }
}
