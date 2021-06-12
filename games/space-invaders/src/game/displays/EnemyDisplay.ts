import { Sprite, Texture } from "pixi.js";

import { AtlasKeys } from "./../../utils/AtlasKeys";

export class EnemyDisplay extends Sprite {
    private _movementTexture01: Texture;
    private _movementTexture02: Texture;

    constructor(assetKey: string) {
        super(AtlasKeys.getTexture(assetKey + "_frame_01.png"));

        this._movementTexture01 = AtlasKeys.getTexture(assetKey + "_frame_01.png");
        this._movementTexture02 = AtlasKeys.getTexture(assetKey + "_frame_02.png");

        this.anchor.set(0.5);
    }

    public tick(): void {
        if (this.texture === this._movementTexture01) {
            this.texture = this._movementTexture02;
        } else {
            this.texture = this._movementTexture01;
        }
    }
}
