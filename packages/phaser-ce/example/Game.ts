// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";
import { PhaserBundle } from "../src/robotlegs/bender/bundles/phaser/PhaserBundle";
import { ContextStateManager } from "../src/robotlegs/bender/extensions/contextStateManager/impl/ContextStateManager";
import { GameConfig } from "./config/GameConfig";
import { StateMediatorConfig } from "./config/StateMediatorConfig";
import { StateKey } from "./constants/StateKey";
import { Boot } from "./states/Boot";
import { GameOver } from "./states/GameOver";
import { GameTitle } from "./states/GameTitle";
import { Main } from "./states/Main";
import { Preload } from "./states/Preload";

export class Game extends Phaser.Game {
    private _context: IContext;

    public constructor(
        width?: number | string,
        height?: number | string,
        renderer?: number,
        parent?: any,
        state?: any,
        transparent?: boolean,
        antialias?: boolean,
        physicsConfig?: any
    ) {
        super(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle)
            .configure(new ContextStateManager(this.state))
            .configure(StateMediatorConfig)
            .configure(GameConfig)
            .initialize();

        this.state.add(StateKey.BOOT, Boot, false);
        this.state.add(StateKey.PRELOAD, Preload, false);
        this.state.add(StateKey.GAME_TITLE, GameTitle, false);
        this.state.add(StateKey.MAIN, Main, false);
        this.state.add(StateKey.GAME_OVER, GameOver, false);

        this.state.start(StateKey.BOOT);
    }
}
