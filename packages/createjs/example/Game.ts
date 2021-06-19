// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { CreateJSBundle } from "../src/robotlegs/bender/bundles/createjs/CreateJSBundle";
import { ContextView } from "../src/robotlegs/bender/extensions/contextView/impl/ContextView";
import { MyConfig } from "./config/MyConfig";
import { RobotlegsView } from "./view/RobotlegsView";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _stage: createjs.Stage;

    private _context: Context;

    public constructor() {
        this._init();
    }

    private _init(): void {
        this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._stage = new createjs.Stage(this._canvas);

        this._context = new Context();
        this._context
            .install(MVCSBundle, CreateJSBundle)
            .configure(new ContextView(this._stage))
            .configure(MyConfig)
            .initialize();

        // enable touch interactions if supported on the current device:
        createjs.Touch.enable(this._stage);

        // enabled mouse over / out events
        this._stage.enableMouseOver(10);
        this._stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

        let robotlegs: RobotlegsView = new RobotlegsView();

        robotlegs.x = this._canvas.width / 2;
        robotlegs.y = this._canvas.height / 2;

        this._stage.addChild(robotlegs);

        window.addEventListener("resize", this._handleResize.bind(this));
        createjs.Ticker.addEventListener("tick", this._tick.bind(this));
    }

    private _handleResize(): void {
        this._stage.update();
    }

    private _tick(event: Object): void {
        this._stage.update(event);
    }
}
