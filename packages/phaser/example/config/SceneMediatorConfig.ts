// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { ISceneMediatorMap } from "../../src/robotlegs/bender/extensions/mediatorMap/api/ISceneMediatorMap";
import { IViewMediatorMap } from "../../src/robotlegs/bender/extensions/mediatorMap/api/IViewMediatorMap";
import { BootMediator } from "../mediators/BootMediator";
import { MainMediator } from "../mediators/MainMediator";
import { PreloadMediator } from "../mediators/PreloadMediator";
import { ScoreViewMediator } from "../mediators/ScoreViewMediator";
import { Boot } from "../scenes/Boot";
import { Main } from "../scenes/Main";
import { Preload } from "../scenes/Preload";
import { ScoreView } from "../views/ScoreView";

@injectable()
export class SceneMediatorConfig implements IConfig {
    @inject(ISceneMediatorMap)
    public sceneMediatorMap: ISceneMediatorMap;

    @inject(IViewMediatorMap)
    public viewMediatorMap: IViewMediatorMap;

    public configure(): void {
        this._mapSceneMediators();
        this._mapViewMediators();
    }

    private _mapSceneMediators(): void {
        this.sceneMediatorMap.map(Boot).toMediator(BootMediator);
        this.sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
        this.sceneMediatorMap.map(Main).toMediator(MainMediator);
    }

    private _mapViewMediators(): void {
        this.viewMediatorMap.map(ScoreView).toMediator(ScoreViewMediator);
    }
}
