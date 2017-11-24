import { Container, Graphics } from "pixi.js";

import { Colors } from "./../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";

export class Item extends Container {
    private border: Graphics;
    private _asset: string;

    constructor(asset: string, hightlight: boolean) {
        super();
        this._asset = asset;
        if (hightlight) {
            this.createBorder();
        }
        this.createSprite();
    }
    private createBorder(): void {
        const ITEM_SIZE = MagicValues.ITEM_SIZE + 5;
        this.border = PixiFactory.getColorBox(ITEM_SIZE, ITEM_SIZE, Colors.HIGHLIGHT);
        this.border.x = -5;
        this.border.y = -5;
        this.addChild(this.border);
    }
    private createSprite(): void {
        this.addChild(PixiFactory.getSprite(this._asset));
    }
}
