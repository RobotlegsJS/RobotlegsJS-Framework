// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import "reflect-metadata";

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";
import { PalidorPixiExtension } from "@robotlegsjs/pixi-palidor";
import PIXI = require("pixi.js");

import { ScratchConfig } from "./configs/ScratchConfig";
import { AssetKeys } from "./utils/AssetKeys";
import { MagicValues } from "./utils/MagicValues";

class Main {
    private stage: PIXI.Container;
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(MagicValues.MAX_WIDTH, MagicValues.MAX_HEIGHT, {});
        this.stage = new PIXI.Container();
        this.context = new Context();
        // this.context.logLevel = LogLevel.DEBUG;
        this.context
            .install(MVCSBundle, PixiBundle)
            .install(PalidorPixiExtension)
            .configure(new ContextView(this.stage))
            .configure(ScratchConfig)
            .initialize();

        const loader = PIXI.loader
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
