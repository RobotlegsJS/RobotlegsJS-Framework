// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import "reflect-metadata";
import PIXI = require("pixi.js");

import { AtlasKeys } from "./battleship/utils/AtlasKeys";
import { GameConfig } from "./battleship/configs/GameConfig";
import { PalidorConfig } from "./battleship/configs/PalidorConfig";
import { ViewsConfig } from "./battleship/configs/ViewsConfig";

import { Container } from "pixi.js";
import { Context, MVCSBundle, LogLevel } from "@robotlegsjs/core";
import { PixiBundle, ContextView } from "@robotlegsjs/pixi";
import { PalidorPixiExtension } from "@robotlegsjs/pixi-palidor";

class Main {
    private stage: PIXI.Container;
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(400, 600, {});
        this.stage = new PIXI.Container();
        this.context = new Context();
        // this.context.logLevel = LogLevel.DEBUG;
        this.context
            .install(MVCSBundle, PixiBundle)
            .install(PalidorPixiExtension)
            .configure(new ContextView(this.stage))
            .configure(GameConfig, ViewsConfig, PalidorConfig)
            .initialize();
        document.body.appendChild(this.renderer.view);
        let loader = PIXI.loader
            .add(AtlasKeys.ATLAS_PNG)
            .add(AtlasKeys.ATLAS_XML)
            .add(AtlasKeys.FONT_FNT)
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

let main = new Main();
main.render();
