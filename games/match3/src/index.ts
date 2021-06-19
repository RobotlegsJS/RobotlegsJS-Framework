/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import "reflect-metadata";

import PIXI = require("pixi.js");

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";

import { GameConfig } from "./matchthree/configs/GameConfig";
import { PalidorConfig } from "./matchthree/configs/PalidorConfig";
import { ViewsConfig } from "./matchthree/configs/ViewsConfig";
import { AtlasKeys } from "./matchthree/utils/AtlasKeys";

class Main {
    private stage: PIXI.Container;
    private renderer: PIXI.Renderer;
    private context: Context;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer({ width: 340, height: 480 });
        this.stage = new PIXI.Container();
        this.context = new Context();
        this.context
            .install(PalidorBundle)
            .configure(new ContextView(this.stage))
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

        document.body.appendChild(this.renderer.view);
    }

    public onLoad(): void {
        AtlasKeys.update(PIXI.utils.TextureCache);
    }

    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}

const main = new Main();

main.render();
