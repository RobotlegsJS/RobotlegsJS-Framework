/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import "reflect-metadata";

import PIXI = require("pixi.js");

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";

import { GameConfig } from "./config/GameConfig";
import { PalidorConfig } from "./config/PalidorConfig";
import { ViewsConfig } from "./config/ViewsConfig";

class Main {
    private _stage: PIXI.Container;
    private _renderer: PIXI.Renderer;
    private _context: Context;

    public constructor() {
        this._renderer = PIXI.autoDetectRenderer({ width: 340, height: 480 });
        this._stage = new PIXI.Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(ViewsConfig, GameConfig, PalidorConfig)
            .initialize();

        document.body.appendChild(this._renderer.view);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}

const main: Main = new Main();

main.render();
