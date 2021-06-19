import { Sprite, Texture } from "pixi.js";
import { AtlasKeys } from "./../../utils/AtlasKeys";

export class CustomButton extends Sprite {
    private _downState: Texture;
    private _overState: Texture;
    private _upState: Texture;

    private _isDown: boolean;
    private _isOver: boolean;

    public constructor(atlasKey: string) {
        super(AtlasKeys.getTexture(atlasKey + "_up.png"));

        const downStateTexture: Texture = AtlasKeys.getTexture(atlasKey + "_over.png");
        const upStateTexture: Texture = AtlasKeys.getTexture(atlasKey + "_up.png");

        this._downState = downStateTexture;
        this._overState = downStateTexture;
        this._upState = upStateTexture;

        this._setInitialValues();
        this._setupInteractions();
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
