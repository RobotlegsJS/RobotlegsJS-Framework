/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import "reflect-metadata";
import { GameConfig } from "./battleship/configs/GameConfig";
import { PalidorConfig } from "./battleship/configs/PalidorConfig";
import { ViewsConfig } from "./battleship/configs/ViewsConfig";
import { AtlasKeys } from "./battleship/utils/AtlasKeys";

import PIXI = require("pixi.js");

class Main {
    private _stage: PIXI.Container;
    private _renderer: PIXI.Renderer;
    private _context: Context;

    public constructor() {
        this._renderer = PIXI.autoDetectRenderer({ width: 400, height: 600 });
        this._stage = new PIXI.Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(GameConfig, ViewsConfig, PalidorConfig)
            .initialize();

        PIXI.Loader.shared
            .add(AtlasKeys.ATLAS_PNG)
            .add(AtlasKeys.ATLAS_XML)
            .add(AtlasKeys.FONT_FNT)
            .load(this.onLoad);

        document.body.appendChild(this._renderer.view);
    }

    public onLoad(): void {
        AtlasKeys.update(PIXI.utils.TextureCache);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}

let main: Main = new Main();

main.render();
