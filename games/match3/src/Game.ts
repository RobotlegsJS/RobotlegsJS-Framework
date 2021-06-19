/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import { GameConfig } from "./matchthree/configs/GameConfig";
import { PalidorConfig } from "./matchthree/configs/PalidorConfig";
import { ViewsConfig } from "./matchthree/configs/ViewsConfig";
import { AtlasKeys } from "./matchthree/utils/AtlasKeys";

import PIXI = require("pixi.js");

export class Game {
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
            .configure(GameConfig, ViewsConfig, PalidorConfig)
            .initialize();

        PIXI.Loader.shared
            .add(AtlasKeys.ATLAS_PNG)
            .add(AtlasKeys.ATLAS_XML)
            .add(AtlasKeys.FONT_FNT)
            .add(AtlasKeys.BG_HUD_IMAGE)
            .add(AtlasKeys.BG_IMAGE)
            .add(AtlasKeys.BG_POPUP_IMAGE)
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
