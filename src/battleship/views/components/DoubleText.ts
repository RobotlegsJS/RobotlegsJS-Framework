import { PixiFactory } from "../../utils/PixiFactory";
import { Container } from "pixi.js";
export class DoubleText extends Container {
    private _labelText: any;
    private _textText: any;
    private _label: string;
    private _text: string;

    public set text(value: string) {
        this._textText.text = value;
    }

    public set label(value: string) {
        this._labelText.text = value;
    }

    constructor(label: string = "", text: string = "") {
        super();

        this._label = label;
        this._text = text;

        this.setupTexts();
    }

    public setupTexts(): void {
        this._labelText = PixiFactory.getTextHUDSmall(this._label);
        this.addChild(this._labelText);

        this._textText = PixiFactory.getTextHUDSmall(this._text);
        this._textText.y = 20;
        this.addChild(this._textText);
    }
}
