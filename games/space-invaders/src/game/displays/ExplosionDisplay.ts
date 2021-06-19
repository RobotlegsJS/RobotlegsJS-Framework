import { Sprite } from "pixi.js";
import { AtlasKeys } from "./../../utils/AtlasKeys";

export class ExplosionDisplay extends Sprite {
    private _texture1: any;
    private _texture2: any;

    public constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_01.png"));

        this._texture1 = AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_01.png");
        this._texture2 = AtlasKeys.getTexture(AtlasKeys.EXPLOSION + "_02.png");

        this.anchor.set(0.5);
    }

    public firstFrame(): void {
        this.texture = this._texture1;
    }

    public nextFrame(): void {
        this.texture = this._texture2;
    }
}
