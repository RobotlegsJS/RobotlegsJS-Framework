// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import Event from "openfl/events/Event";
import MouseEvent from "openfl/events/MouseEvent";
import { Mediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/Mediator";
import { RobotlegsView } from "../view/RobotlegsView";
import { SmileyView } from "../view/SmileyView";

export class RobotlegsMediator extends Mediator<RobotlegsView> {
    public initialize(): void {
        console.log("RobotlegsMediator initialized!");

        this.view.addEventListener(MouseEvent.CLICK, this._onClick);
    }

    public destroy(): void {
        console.log("RobotlegsMediator destroyed!");
    }

    private _onClick = (event: Event): void => {
        let radius: number = 50 + Math.random() * 50;
        this.view.stage.addChild(new SmileyView(radius));
    };
}
