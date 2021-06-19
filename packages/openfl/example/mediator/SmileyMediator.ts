// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import Event from "openfl/events/Event";
import MouseEvent from "openfl/events/MouseEvent";
import { Mediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/Mediator";
import { SmileyView } from "../view/SmileyView";

export class SmileyMediator extends Mediator<SmileyView> {
    public initialize(): void {
        console.log("SmileyMediator initialized!");

        this.view.addEventListener(MouseEvent.CLICK, this._onClick);
    }

    public destroy(): void {
        console.log("SmileyMediator destroyed!");
    }

    private _onClick = (event: Event): void => {
        this.view.parent.removeChild(this.view);
    };
}
