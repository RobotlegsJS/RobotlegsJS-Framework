import { Container, Graphics } from "pixi.js";
import { PixiFactory } from "../utils/PixiFactory";
import { ViewPortSize } from "../utils/ViewPortSize";

export class StartingPopup extends Container {
    private _decreasingNumber: any;
    private _background: Graphics;

    public constructor() {
        super();

        this.interactive = true;

        this._createBackgrounds();
        this._createTexts();
    }

    public changeNumber(n: number): void {
        this._background.alpha -= 0.1;
        this._decreasingNumber.text = String(n);
    }

    private _createBackgrounds(): void {
        this._background = PixiFactory.getShadowBackground();
        this.addChild(this._background);
    }

    private _createTexts(): void {
        this._decreasingNumber = PixiFactory.getText("3");
        this._decreasingNumber.anchor.set(0.5);
        this._decreasingNumber.scale.set(1.2);
        this._decreasingNumber.x = ViewPortSize.HALF_WIDTH;
        this._decreasingNumber.y = ViewPortSize.HALF_HEIGHT;
        this.addChild(this._decreasingNumber);
    }
}
