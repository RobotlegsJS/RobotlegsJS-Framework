import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import { AbstractRenderer, autoDetectRenderer, Container, Loader, utils } from "pixi.js";
import { ScratchConfig } from "./configs/ScratchConfig";
import { AssetKeys } from "./utils/AssetKeys";
import { MagicValues } from "./utils/MagicValues";

export class Game {
    private _stage: Container;
    private _renderer: AbstractRenderer;
    private _context: Context;

    public constructor() {
        this._renderer = autoDetectRenderer({
            width: MagicValues.MAX_WIDTH,
            height: MagicValues.MAX_HEIGHT
        });
        this._stage = new Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(ScratchConfig)
            .initialize();

        Loader.shared.add(AssetKeys.ATLAS_PNG).add(AssetKeys.ATLAS_XML).load(this.onLoad);

        document.body.appendChild(this._renderer.view);
    }

    public onLoad(): void {
        AssetKeys.update(utils.TextureCache);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
