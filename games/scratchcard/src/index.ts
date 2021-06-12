/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import "reflect-metadata";

import PIXI = require("pixi.js");

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";

import { ScratchConfig } from "./configs/ScratchConfig";
import { AssetKeys } from "./utils/AssetKeys";
import { MagicValues } from "./utils/MagicValues";

class Main {
    private stage: PIXI.Container;
    private renderer: PIXI.Renderer;
    private context: Context;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer({
            width: MagicValues.MAX_WIDTH,
            height: MagicValues.MAX_HEIGHT
        });
        this.stage = new PIXI.Container();
        this.context = new Context();
        this.context
            .install(PalidorBundle)
            .configure(new ContextView(this.stage))
            .configure(ScratchConfig)
            .initialize();

        const loader = PIXI.Loader.shared
            .add(AssetKeys.ATLAS_PNG)
            .add(AssetKeys.ATLAS_XML)
            .load(this.onLoad);

        document.body.appendChild(this.renderer.view);
    }
    public onLoad(): void {
        AssetKeys.update(PIXI.utils.TextureCache);
    }
    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}
const main = new Main();
main.render();
