// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import "reflect-metadata";

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { autoDetectRenderer, CanvasRenderer, Container, WebGLRenderer } from "pixi.js";

import { PalidorBundle } from "../src/robotlegs/bender/bundles/palidor/PalidorBundle";
import { ExampleConfig } from "./config/ExampleConfig";

class Main {
    private stage: Container;
    private renderer: CanvasRenderer | WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = autoDetectRenderer(400, 600, {});
        this.stage = new Container();
        this.context = new Context();
        this.context
            .install(PalidorBundle)
            .configure(new ContextView(this.stage))
            .configure(ExampleConfig)
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
