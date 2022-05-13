import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import { AbstractRenderer, autoDetectRenderer, Container, Loader, utils } from "pixi.js";
import { GameConfig } from "./matchthree/configs/GameConfig";
import { PalidorConfig } from "./matchthree/configs/PalidorConfig";
import { ViewsConfig } from "./matchthree/configs/ViewsConfig";
import { AtlasKeys } from "./matchthree/utils/AtlasKeys";

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
            .configure(GameConfig, ViewsConfig, PalidorConfig)
            .initialize();

        Loader.shared
            .add(AtlasKeys.ATLAS_PNG)
            .add(AtlasKeys.ATLAS_XML)
            .add(AtlasKeys.FONT_FNT)
            .add(AtlasKeys.BG_HUD_IMAGE)
            .add(AtlasKeys.BG_IMAGE)
            .add(AtlasKeys.BG_POPUP_IMAGE)
            .load(this.onLoad);

        document.body.appendChild(this._renderer.view);
    }

    public onLoad(): void {
        AtlasKeys.update(utils.TextureCache);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
