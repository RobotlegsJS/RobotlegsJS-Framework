// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import PIXI = require("pixi.js");

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "../src";

import { MyConfig } from "./config/MyConfig";
import { RobotlegsView } from "./view/RobotlegsView";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _stage: PIXI.Container;
    private _renderer: PIXI.Renderer;
    private _context: Context;

    constructor() {
        this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._renderer = PIXI.autoDetectRenderer({
            width: 960,
            height: 400,
            view: this._canvas,
            backgroundColor: 0xffffff
        });
        this._stage = new PIXI.Container();

        this._context = new Context();
        this._context
            .install(MVCSBundle, PixiBundle)
            .configure(new ContextView(this._stage))
            .configure(MyConfig)
            .initialize();

        this._stage.addChild(new RobotlegsView());

        document.body.appendChild(this._renderer.view);

        this.render();
    }

    public render = () => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
