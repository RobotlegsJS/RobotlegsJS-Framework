import { Container, Sprite, Texture } from "pixi.js";
import { AtlasKeys } from "../../utils/AtlasKeys";
import { Colors } from "../../utils/Colors";
import { PixiFactory } from "../../utils/PixiFactory";

export class CustomButton extends Sprite {
    private _downState: Texture;
    private _overState: Texture;
    private _upState: Texture;

    private _isDown: boolean;
    private _isOver: boolean;

    private _ico: Sprite;
    private _labelText: Container;
    private _textValue: string;

    public get text(): string {
        return this._textValue;
    }

    public constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.BUTTON));

        let downStateTexture: Texture = AtlasKeys.getTexture(AtlasKeys.BUTTON);
        let upStateTexture: Texture = AtlasKeys.getTexture(AtlasKeys.BUTTON);

        this._downState = downStateTexture;
        this._overState = downStateTexture;
        this._upState = upStateTexture;

        this._setInitialValues();
        this._createInteractions();
    }

    public setIco(name: string): void {
        if (this._ico) {
            this.removeChild(this._ico);
        }

        this._ico = new Sprite(AtlasKeys.getTexture(name));
        this._ico.anchor.set(0.5);
        this._ico.tint = Colors.BUTTON_ICON;
        this.addChild(this._ico);
    }

    public setText(text: string): void {
        this._textValue = text;
        if (this._labelText) {
            this.removeChild(this._labelText);
        }

        this._labelText = PixiFactory.getButtonLabel(text);
        this.addChild(this._labelText);
    }

    private _setInitialValues(): void {
        this.anchor.set(0.5);
        this.interactive = true;
        this.buttonMode = true;
    }

    private _createInteractions(): void {
        this.on("pointerup", this._onButtonUp);
        this.on("pointerupoutside", this._onButtonUp);
        this.on("pointerdown", this._onButtonDown);
        this.on("pointerover", this._onButtonOver);
        this.on("pointerout", this._onButtonOut);
    }

    private _onButtonDown(): void {
        this._isDown = true;
        this.texture = this._downState;
        this.scale.set(0.95, 0.95);
    }

    private _onButtonOut(): void {
        this._isOver = false;
        this.texture = this._upState;
        this.scale.set(1, 1);
    }

    private _onButtonOver(): void {
        this._isOver = true;
        this.texture = this._overState;
    }

    private _onButtonUp(): void {
        this._isDown = false;
        this.scale.set(1, 1);

        this.texture = this._isOver ? this._overState : this._upState;
    }
}
