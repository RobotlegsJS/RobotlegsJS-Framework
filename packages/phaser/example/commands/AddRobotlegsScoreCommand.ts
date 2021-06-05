// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, Event, ICommand, inject, IEventDispatcher } from "@robotlegsjs/core";
import { GameModel } from "../models/GameModel";
import { MainEvent } from "../events/MainEvent";

@injectable()
export class AddRobotlegsScoreCommand implements ICommand {
    @inject(GameModel)
    private _gameModel: GameModel;

    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    public execute(event: Event): void {
        console.log(event.type, event.data);
        this._gameModel.robotlegsScore += 1;
        this._eventDispatcher.dispatchEvent(new MainEvent(MainEvent.ADDED_ROBOTLEGS_IMAGE));
    }
}
