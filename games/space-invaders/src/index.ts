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
            .configure(ViewsConfig, GameConfig, PalidorConfig)
            .initialize();

        document.body.appendChild(this.renderer.view);
    }

    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}

const main = new Main();

main.render();
