import { BitmapText, Container, Graphics } from "pixi.js";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { ViewPortSize } from "../utils/ViewPortSize";

export class StartingPopup extends Container {
    private _decreasingNumber: BitmapText;
    private _background: Graphics;

    public constructor() {
        super();

        this.interactive = true;

        this._setupBackgrounds();
        this._setupTexts();
    }

    public changeNumber(n: number): void {
        this._background.alpha -= 0.1;
        this._decreasingNumber.text = String(n);
    }

    private _setupBackgrounds(): void {
        this._background = PixiFactory.getShadowBackground();
        this.addChild(this._background);
    }

    private _setupTexts(): void {
        this._decreasingNumber = PixiFactory.getText("3", MagicValues.SIZE_DEFAULT + 6);
        this._decreasingNumber.anchor.set(0.5, 0.5);
        this._decreasingNumber.scale.set(1.2);
        this._decreasingNumber.x = ViewPortSize.HALF_WIDTH;
        this._decreasingNumber.y = ViewPortSize.HALF_HEIGHT;
        this.addChild(this._decreasingNumber);
    }
}
