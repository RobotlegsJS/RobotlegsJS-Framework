// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { AbstractRenderer, autoDetectRenderer, Container } from "pixi.js";
import { PixiBundle } from "../src/robotlegs/bender/bundles/pixi/PixiBundle";
import { ContextView } from "../src/robotlegs/bender/extensions/contextView/impl/ContextView";
import { MyConfig } from "./config/MyConfig";
import { RobotlegsView } from "./view/RobotlegsView";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _stage: Container;
    private _renderer: AbstractRenderer;
    private _context: Context;

    public constructor() {
        this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._renderer = autoDetectRenderer({
            width: 960,
            height: 400,
            view: this._canvas,
            backgroundColor: 0xffffff
        });
        this._stage = new Container();

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

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
