// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "reflect-metadata";

import { Context, MVCSBundle } from "@robotlegsjs/core";

import { ContextView, OpenFLBundle } from "../src";

import { MyConfig } from "./config/MyConfig";

import { GameView } from "./view/GameView";

import Stage from "openfl/display/Stage";

export class Game {
    private _loading: HTMLDivElement;
    private _canvas: HTMLDivElement;

    private _stage: Stage;

    private _context: Context;

    constructor() {
        this.init();
    }

    private init(): void {
        // remove loader
        this._loading = <HTMLDivElement>document.getElementById("loading");
        this._loading.remove();

        // create stage
        this._stage = new Stage(960, 400, 0xffffff, GameView);

        // create robotlegs context
        this._context = new Context();
        this._context
            .install(MVCSBundle, OpenFLBundle)
            .configure(new ContextView(this._stage))
            .configure(MyConfig)
            .initialize();

        // add stage to html body
        this._canvas = <HTMLDivElement>document.getElementById("canvas");
        this._canvas.appendChild(this._stage.element);
    }
}
