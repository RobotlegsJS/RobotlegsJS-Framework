// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src/index";
import { SmileyView } from "../view/SmileyView";

export class SmileyMediator extends Mediator<SmileyView> {
    public initialize(): void {
        console.log("SmileyMediator initialized!");

        this.view.on("click", this.onClick, this);
    }

    public onClick(event: createjs.Event): void {
        this.view.parent.removeChild(this.view);
    }

    public destroy(): void {
        console.log("SmileyMediator destroyed!");
    }
}
