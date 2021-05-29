// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src";

import { SmileyView } from "../view/SmileyView";

import Event from "openfl/events/Event";
import MouseEvent from "openfl/events/MouseEvent";

export class SmileyMediator extends Mediator<SmileyView> {
    public initialize(): void {
        console.log("SmileyMediator initialized!");

        this.view.addEventListener(MouseEvent.CLICK, this.onClick);
    }

    public destroy(): void {
        console.log("SmileyMediator destroyed!");
    }

    private onClick = (event: Event): void => {
        this.view.parent.removeChild(this.view);
    };
}
