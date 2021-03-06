// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, IContext, inject, injectable } from "@robotlegsjs/core";
import { GameModel } from "../models/GameModel";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    public context: IContext;

    public configure(): void {
        this._mapCommands();
        this._mapManager();
        this._mapModels();
    }

    private _mapCommands(): void {}

    private _mapManager(): void {}

    private _mapModels(): void {
        this.context.injector.bind(GameModel).to(GameModel).inSingletonScope();
    }
}
