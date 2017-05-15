import { AtlasKeys } from "./../../utils/AtlasKeys";

import { Sprite } from "pixi.js";

export class BulletDisplay extends Sprite {

    constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.BULLET));

        this.anchor.x = .5;
    }
}
