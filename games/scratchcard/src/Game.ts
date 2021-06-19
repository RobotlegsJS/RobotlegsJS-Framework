/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />

import { Context } from "@robotlegsjs/core";
import { ContextView } from "@robotlegsjs/pixi";
import { PalidorBundle } from "@robotlegsjs/pixi-palidor";
import { ScratchConfig } from "./configs/ScratchConfig";
import { AssetKeys } from "./utils/AssetKeys";
import { MagicValues } from "./utils/MagicValues";

import PIXI = require("pixi.js");

export class Game {
    private _stage: PIXI.Container;
    private _renderer: PIXI.Renderer;
    private _context: Context;

    public constructor() {
        this._renderer = PIXI.autoDetectRenderer({
            width: MagicValues.MAX_WIDTH,
            height: MagicValues.MAX_HEIGHT
        });
        this._stage = new PIXI.Container();
        this._context = new Context();
        this._context
            .install(PalidorBundle)
            .configure(new ContextView(this._stage))
            .configure(ScratchConfig)
            .initialize();

        PIXI.Loader.shared.add(AssetKeys.ATLAS_PNG).add(AssetKeys.ATLAS_XML).load(this.onLoad);

        document.body.appendChild(this._renderer.view);
    }

    public onLoad(): void {
        AssetKeys.update(PIXI.utils.TextureCache);
    }

    public render = (): void => {
        this._renderer.render(this._stage);
        window.requestAnimationFrame(this.render);
    };
}
