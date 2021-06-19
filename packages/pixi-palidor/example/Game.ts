// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { autoDetectRenderer, Container, Renderer } from "pixi.js";
import { PalidorBundle } from "../src/robotlegs/bender/bundles/palidor/PalidorBundle";
import { ExampleConfig } from "./config/ExampleConfig";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _stage: Container;
    private _renderer: Renderer;
    private _context: Context;

    public constructor() {
        this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._renderer = autoDetectRenderer({
            width: 960,
            height: 600,
            backgroundColor: 0xffffff,
            view: this._canvas
        });
        this._stage = new Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(ExampleConfig)
            .initialize();

        document.body.appendChild(this._renderer.view);

        this.render();
    }
    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
