import { Sprite } from "pixi.js";

import { AtlasKeys } from "./../../utils/AtlasKeys";

export class ExplosionDisplay extends Sprite {
    private texture1: any;
    private texture2: any;

    constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_01.png"));

        this.texture1 = AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_01.png");
        this.texture2 = AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_02.png");

        this.anchor.set(0.5);
    }
    public firstFrame(): void {
        this.texture = this.texture1;
    }
    public nextFrame(): void {
        this.texture = this.texture2;
    }
}
