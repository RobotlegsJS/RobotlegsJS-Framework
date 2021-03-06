import { Sprite } from "pixi.js";
import { AtlasKeys } from "../../utils/AtlasKeys";

export class CannonDisplay extends Sprite {
    public constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.CANNON));

        this.anchor.set(0.5);
    }
}
