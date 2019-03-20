// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { autoDetectRenderer, CanvasRenderer, Container, WebGLRenderer } from "pixi.js";

import { PalidorBundle } from "../src/robotlegs/bender/bundles/palidor/PalidorBundle";
import { ExampleConfig } from "./config/ExampleConfig";

export class Game {
    private canvas: HTMLCanvasElement;
    private stage: Container;
    private renderer: CanvasRenderer | WebGLRenderer;
    private context: Context;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.renderer = autoDetectRenderer(960, 600, {
            backgroundColor: 0xffffff,
            view: this.canvas
        });
        this.stage = new Container();
        this.context = new Context();
        this.context
            .install(PalidorBundle)
            .configure(new ContextView(this.stage))
            .configure(ExampleConfig)
            .initialize();

        document.body.appendChild(this.renderer.view);

        this.render();
    }
    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}
