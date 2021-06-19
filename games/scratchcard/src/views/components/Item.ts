import { Container, Graphics } from "pixi.js";
import { Colors } from "../../utils/Colors";
import { MagicValues } from "../../utils/MagicValues";
import { PixiFactory } from "../../utils/PixiFactory";

export class Item extends Container {
    private _border: Graphics;
    private _asset: string;

    public constructor(asset: string, hightlight: boolean) {
        super();
        this._asset = asset;
        if (hightlight) {
            this._createBorder();
        }
        this._createSprite();
    }

    private _createBorder(): void {
        const ITEM_SIZE = MagicValues.ITEM_SIZE + 5;
        this._border = PixiFactory.getColorBox(ITEM_SIZE, ITEM_SIZE, Colors.HIGHLIGHT);
        this._border.x = -5;
        this._border.y = -5;
        this.addChild(this._border);
    }

    private _createSprite(): void {
        this.addChild(PixiFactory.getSprite(this._asset));
    }
}
