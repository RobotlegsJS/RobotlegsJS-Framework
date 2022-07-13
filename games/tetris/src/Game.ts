import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import { AbstractRenderer, autoDetectRenderer, Container } from "pixi.js";
import { GameConfig } from "./configs/GameConfig";
import { PalidorConfig } from "./configs/PalidorConfig";
import { ViewsConfig } from "./configs/ViewsConfig";

export class Game {
    private _stage: Container;
    private _renderer: AbstractRenderer;
    private _context: Context;

    public constructor() {
        this._renderer = autoDetectRenderer({ width: 340, height: 480 });
        this._stage = new Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(ViewsConfig, GameConfig, PalidorConfig)
            .initialize();

        document.body.appendChild(this._renderer.view);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
