import { PixiFactory } from "./../../utils/PixiFactory";
import { Colors } from "./../../utils/Colors";
import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Sprite, Texture, Container } from "pixi.js";

export class CustomButton extends Sprite {

    private _downState: Texture;
    private _overState: Texture;
    private _upState: Texture;

    private _isDown: boolean;
    private _isOver: boolean;

    private _ico: Sprite;
    private _textField: Container;
    private _text: string;

    public get text(): string {
        return this._text;
    }

    constructor() {
        super(AtlasKeys.getTexture("button_background_large.png"));

        let downStateTexture: Texture = AtlasKeys.getTexture("button_background_large.png");
        let upStateTexture: Texture = AtlasKeys.getTexture("button_background_large.png");

        this._downState = downStateTexture;
        this._overState = downStateTexture;
        this._upState = upStateTexture;

        this.setInitialValues();
        this.setupInteractions();
    }

    public setIco(name: string): void {
        if (this._ico) {
            this.removeChild(this._ico);
        }

        this._ico = new Sprite(AtlasKeys.getTexture(name));
        this._ico.anchor.set(.5);
        this._ico.tint = Colors.BACKGROUND_DARK;
        this.addChild(this._ico);
    }

    public setText(text: string): void {
        this._text = text;
        if (this._textField) {
            this.removeChild(this._textField);
        }

        this._textField = PixiFactory.getButtonText(text);
        this.addChild(this._textField);
    }

    private setInitialValues(): void {
        this.anchor.set(.5);
        this.interactive = true;
        this.buttonMode = true;
    }

    private setupInteractions(): void {
        this.on("pointerup", this.onButtonUp);
        this.on("pointerupoutside", this.onButtonUp);
        this.on("pointerdown", this.onButtonDown);
        this.on("pointerover", this.onButtonOver);
        this.on("pointerout", this.onButtonOut);
    }

    private onButtonDown(): void {
        this._isDown = true;
        this.texture = this._downState;
        this.scale.set(.95, .95);
    }

    private onButtonOut(): void {
        this._isOver = false;
        this.texture = this._upState;
        this.scale.set(1, 1);
    }

    private onButtonOver(): void {
        this._isOver = true;
        this.texture = this._overState;
    }

    private onButtonUp(): void {
        this._isDown = false;
        this.scale.set(1, 1);

        if (this._isOver) {
            this.texture = this._overState;
        } else {
            this.texture = this._upState;
        }
    }
}
