import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Sprite } from "pixi.js";

export class ExplosionDisplay extends Sprite {

    private texture1: any;
    private texture2: any;

    constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_01.png"));

        this.texture1 = AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_01.png");
        this.texture2 = AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_02.png");

        this.anchor.set(.5);
    }

    public firstFrame(): void {
        this.texture = this.texture1;
    }

    public nextFrame(): void {
        this.texture = this.texture2;
    }
}
