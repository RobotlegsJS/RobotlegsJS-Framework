// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src/index";

import { RobotlegsView } from "../view/RobotlegsView";
import { SmileyView } from "../view/SmileyView";

export class RobotlegsMediator extends Mediator<RobotlegsView> {
    public initialize(): void {
        console.log("RobotlegsMediator initialized!");

        this.view.on("click", this.onClick, this);
    }

    public onClick(event: createjs.Event): void {
        let radius: number = 50 + Math.random() * 50;
        this.view.stage.addChild(new SmileyView(radius));
    }

    public destroy(): void {
        console.log("RobotlegsMediator destroyed!");
    }
}
