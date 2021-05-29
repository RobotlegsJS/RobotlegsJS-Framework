// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { RobotlegsView } from "./RobotlegsView";

import Sprite from "openfl/display/Sprite";
import Event from "openfl/events/Event";

export class GameView extends Sprite {
    constructor() {
        super();

        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
    }

    private onAddedToStage = (event: Event): void => {
        if (event.target === this) {
            let robotlegs: RobotlegsView = new RobotlegsView();
            this.addChild(robotlegs);
        }
    };
}
