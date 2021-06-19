// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "@robotlegsjs/core";
import { ViewMediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/ViewMediator";
import { MainEvent } from "../events/MainEvent";
import { GameModel } from "../models/GameModel";
import { ScoreView } from "../views/ScoreView";

@injectable()
export class ScoreViewMediator extends ViewMediator<ScoreView> {
    @inject(GameModel)
    public gameModel: GameModel;

    public initialize(): void {
        console.log("PlayerViewMediator: initialize");
        console.log("score: " + this.gameModel.robotlegsScore);
        this.view.setText(0);
        this.addContextListener(MainEvent.ADDED_ROBOTLEGS_IMAGE, this._onRobotlegsImageAdded, this);
    }

    public destroy(): void {
        console.log("PlayerViewMediator: destroy");
    }

    private _onRobotlegsImageAdded(): void {
        this.view.setText(this.gameModel.robotlegsScore);
    }
}
