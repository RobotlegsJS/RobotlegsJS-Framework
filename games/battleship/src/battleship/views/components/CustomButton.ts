import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Colors } from "./../../utils/Colors";
import { PixiFactory } from "./../../utils/PixiFactory";

import { Sprite, Texture, Container } from "pixi.js";

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

    constructor() {
        super(AtlasKeys.getTexture(AtlasKeys.BUTTON));

        let downStateTexture: Texture = AtlasKeys.getTexture(AtlasKeys.BUTTON);
        let upStateTexture: Texture = AtlasKeys.getTexture(AtlasKeys.BUTTON);

        this._downState = downStateTexture;
        this._overState = downStateTexture;
        this._upState = upStateTexture;

        this.setInitialValues();
        this.createInteractions();
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

    private setInitialValues(): void {
        this.anchor.set(0.5);
        this.interactive = true;
        this.buttonMode = true;
    }

    private createInteractions(): void {
        this.on("pointerup", this.onButtonUp);
        this.on("pointerupoutside", this.onButtonUp);
        this.on("pointerdown", this.onButtonDown);
        this.on("pointerover", this.onButtonOver);
        this.on("pointerout", this.onButtonOut);
    }

    private onButtonDown(): void {
        this._isDown = true;
        this.texture = this._downState;
        this.scale.set(0.95, 0.95);
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

        this.texture = this._isOver ? this._overState : this._upState;
    }
}
