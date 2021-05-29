// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { RobotlegsView } from "./../views/RobotlegsView";

@injectable()
export class RobotlegsViewMediator extends Mediator<RobotlegsView> {
    public initialize(): void {
        this.eventMap.mapListener(this.view.setViewButton, "click", this.onSetView, this);
        this.eventMap.mapListener(this.view.addViewButton, "click", this.onAddView, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onSetView(e: any): void {
        this.eventDispatcher.dispatchEvent(new Event("palidorView"));
    }
    private onAddView(e: any): void {
        this.eventDispatcher.dispatchEvent(new Event("floatingView"));
    }
}
