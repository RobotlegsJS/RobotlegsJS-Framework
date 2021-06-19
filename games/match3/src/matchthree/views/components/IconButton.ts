import { Sprite, Texture } from "pixi.js";

import { AtlasKeys } from "./../../utils/AtlasKeys";

export class IconButton extends Sprite {
    public static TYPE_SMALL: string = "button_small";
    public static TYPE_MEDIUM: string = "button_medium";
    public static TYPE_SMALL_DANGER: string = "button_small_danger";

    private _downState: Texture;
    private _overState: Texture;
    private _upState: Texture;

    private _isDown: boolean;
    private _isOver: boolean;

    private _ico: Sprite;

    public constructor(shapeType: String = IconButton.TYPE_SMALL) {
        super(AtlasKeys.getTexture(shapeType + "_up.png"));

        const downStateTexture: Texture = AtlasKeys.getTexture(shapeType + "_down.png");
        const upStateTexture: Texture = AtlasKeys.getTexture(shapeType + "_up.png");

        this._downState = downStateTexture;
        this._overState = downStateTexture;
        this._upState = upStateTexture;

        this._setInitialValues();
        this._setupInteractions();
    }

    public setIco(name: string): void {
        if (this._ico) {
            this.removeChild(this._ico);
        }

        this._ico = new Sprite(AtlasKeys.getTexture(name));
        this._ico.anchor.set(0.5);
        this.addChild(this._ico);
    }

    private _setInitialValues(): void {
        this.anchor.set(0.5);
        this.interactive = true;
        this.buttonMode = true;
    }

    private _setupInteractions(): void {
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
