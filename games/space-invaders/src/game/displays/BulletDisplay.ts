import { Sprite } from "pixi.js";

import { AtlasKeys } from "./../../utils/AtlasKeys";

export class BulletDisplay extends Sprite {
    constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.BULLET));

        this.anchor.x = 0.5;
    }
}
