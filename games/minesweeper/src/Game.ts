import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import { AbstractRenderer, autoDetectRenderer, Container, Loader, utils } from "pixi.js";
import { GameConfig } from "./minesweeper/configs/GameConfig";
import { PalidorConfig } from "./minesweeper/configs/PalidorConfig";
import { ViewsConfig } from "./minesweeper/configs/ViewsConfig";
import { AtlasKeys } from "./minesweeper/utils/AtlasKeys";

export class Game {
    private _stage: Container;
    private _renderer: AbstractRenderer;
    private _context: Context;

    public constructor() {
        this._renderer = autoDetectRenderer({ width: 400, height: 600 });
        this._stage = new Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(GameConfig, ViewsConfig, PalidorConfig)
            .initialize();

        Loader.shared
            .add(AtlasKeys.ATLAS_PNG)
            .add(AtlasKeys.ATLAS_XML)
            .add(AtlasKeys.FONT_FNT)
            .load(this.onLoad);

        document.body.appendChild(this._renderer.view);
    }

    public onLoad(): void {
        AtlasKeys.update(utils.TextureCache);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
        window.addEventListener("contextmenu", (event) => event.preventDefault());
    };
}
