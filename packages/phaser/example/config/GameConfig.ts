// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, IContext, IEventCommandMap, inject, injectable } from "@robotlegsjs/core";
import { AddRobotlegsScoreCommand } from "../commands/AddRobotlegsScoreCommand";
import { MainCommand } from "../commands/MainCommand";
import { MainEvent } from "../events/MainEvent";
import { GameModel } from "../models/GameModel";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    public context: IContext;

    @inject(IEventCommandMap)
    public commandMap: IEventCommandMap;

    public configure(): void {
        this._mapCommands();
        this._mapManager();
        this._mapModels();
    }

    private _mapCommands(): void {
        this.commandMap.map(MainEvent.GAME_START).toCommand(MainCommand);
        this.commandMap.map(MainEvent.ADD_ROBOTLEGS_IMAGE).toCommand(AddRobotlegsScoreCommand);
    }

    private _mapManager(): void {}

    private _mapModels(): void {
        this.context.injector.bind(GameModel).to(GameModel).inSingletonScope();
    }
}
