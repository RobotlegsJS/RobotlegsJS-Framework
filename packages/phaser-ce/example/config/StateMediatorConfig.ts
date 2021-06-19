// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { IStateMediatorMap } from "../../src/robotlegs/bender/extensions/stateMediatorMap/api/IStateMediatorMap";
import { BootMediator } from "../mediators/BootMediator";
import { GameOverMediator } from "../mediators/GameOverMediator";
import { GameTitleMediator } from "../mediators/GameTitleMediator";
import { MainMediator } from "../mediators/MainMediator";
import { PreloadMediator } from "../mediators/PreloadMediator";
import { Boot } from "../states/Boot";
import { GameOver } from "../states/GameOver";
import { GameTitle } from "../states/GameTitle";
import { Main } from "../states/Main";
import { Preload } from "../states/Preload";

@injectable()
export class StateMediatorConfig implements IConfig {
    @inject(IStateMediatorMap)
    public stateMediatorMap: IStateMediatorMap;

    public configure(): void {
        this._mapStateMediators();
    }

    private _mapStateMediators(): void {
        this.stateMediatorMap.map(Boot).toMediator(BootMediator);
        this.stateMediatorMap.map(Preload).toMediator(PreloadMediator);
        this.stateMediatorMap.map(GameTitle).toMediator(GameTitleMediator);
        this.stateMediatorMap.map(Main).toMediator(MainMediator);
        this.stateMediatorMap.map(GameOver).toMediator(GameOverMediator);
    }
}
