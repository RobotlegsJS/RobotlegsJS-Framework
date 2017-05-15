import { AtlasKeys } from "./../../utils/AtlasKeys";

import { Sprite } from "pixi.js";

export class CannonDisplay extends Sprite {

    constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.CANNON));

        this.anchor.set(.5);
    }
}
