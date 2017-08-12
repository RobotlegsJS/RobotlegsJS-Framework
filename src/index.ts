/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import "reflect-metadata";
import PIXI = require("pixi.js");

import { HelloWorld } from "./HelloWorld";

import { Container, Graphics, Text } from "pixi.js";
import { Context, MVCSBundle, LogLevel } from "@robotlegsjs/core";
import { PixiBundle, ContextView } from "@robotlegsjs/pixi";

class Main {
    private stage: PIXI.Container;
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(400, 600, {});
        this.stage = new PIXI.Container();
        this.context = new Context();
        // this.context.logLevel = LogLevel.DEBUG;
        this.context.install(MVCSBundle, PixiBundle)
            .configure(new ContextView((<any>this.renderer).plugins.interaction))
            .initialize();

        this.stage.addChild(this.getMainContainer());

        document.body.appendChild(this.renderer.view);
    }

    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
        window.addEventListener("contextmenu", event => event.preventDefault());
    }

    private getMainContainer(): Container {
        let background: Graphics = new Graphics();
        background.beginFill(0x204d63);
        background.drawRect(0, 0, 400, 600);
        background.endFill();

        let container: Container = new Container();
        container.addChild(background);

        let helloWorld: HelloWorld = new HelloWorld();

        let style = new PIXI.TextStyle({
            fill: 0xb5d6e6,
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold"
        });
        let hello: Text = new Text(helloWorld.text, style);
        hello.anchor.set(0.5);
        hello.x = 200;
        hello.y = 300;
        container.addChild(hello);

        return container;
    }
}

let main = new Main();
main.render();
