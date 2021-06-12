// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import "reflect-metadata";

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";
import { PalidorPixiExtension } from "@robotlegsjs/pixi-palidor";
import PIXI = require("pixi.js");
import { Container } from "pixi.js";

import { GameConfig } from "./minesweeper/configs/GameConfig";
import { PalidorConfig } from "./minesweeper/configs/PalidorConfig";
import { ViewsConfig } from "./minesweeper/configs/ViewsConfig";
import { AtlasKeys } from "./minesweeper/utils/AtlasKeys";

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
        const loader = PIXI.loader
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
        window.addEventListener("contextmenu", event => event.preventDefault());
    };
}
const main = new Main();
main.render();
