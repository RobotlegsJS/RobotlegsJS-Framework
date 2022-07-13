// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/Mediator";
import { SmileyView } from "../view/SmileyView";

export class SmileyMediator extends Mediator<SmileyView> {
    public initialize(): void {
        console.log("SmileyMediator initialized!");

        this.addViewListener("click", this.onClick, this);
    }

    public onClick(e: any): void {
        this.view.parent.removeChild(this.view);
    }

    public destroy(): void {
        console.log("SmileyMediator destroyed!");
    }
}
