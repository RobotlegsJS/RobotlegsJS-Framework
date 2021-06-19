import { Container, Graphics, Text } from "pixi.js";

import { Colors } from "../../utils/Colors";

export class TextButton extends Container {
    private _isDown: boolean;
    private _isOver: boolean;

    private _labelText: Container;
    private _textValue: string;

    private _background: Graphics;

    public get text(): string {
        return this._textValue;
    }

    public constructor() {
        super();

        this._setInitialValues();
        this._createBackground();
        this._createInteractions();
    }

    public setText(text: string): void {
        this._textValue = text;
        if (this._labelText) {
            this.removeChild(this._labelText);
        }
        this._labelText = new Text(text, { fill: [Colors.TEXT] });
        this._labelText.pivot.x = this._labelText.width * 0.5;
        this._labelText.pivot.y = this._labelText.height * 0.5;
        this.addChild(this._labelText);
    }

    private _setInitialValues(): void {
        this.interactive = true;
        this.buttonMode = true;
    }

    private _createBackground(): void {
        this._background = new Graphics();
        this._background.beginFill(Colors.BACKGROUND_DARK);
        this._background.drawRoundedRect(0, 0, 410, 80, 5);
        this._background.pivot.x = this._background.width * 0.5;
        this._background.pivot.y = this._background.height * 0.5;
        this.addChild(this._background);
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
        this.scale.set(0.95, 0.95);
    }

    private _onButtonOut(): void {
        this._isOver = false;
        this.scale.set(1, 1);
    }

    private _onButtonOver(): void {
        this._isOver = true;
    }

    private _onButtonUp(): void {
        this._isDown = false;
        this.scale.set(1, 1);
    }
}
