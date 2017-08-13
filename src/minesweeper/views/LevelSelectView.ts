import { Texts } from "./../utils/Texts";
import { AtlasKeys } from "./../utils/AtlasKeys";
import { PixiFactory } from "./../utils/PixiFactory";
import { MagicValues } from "./../utils/MagicValues";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";
import { Container } from "pixi.js";

export class LevelSelectView extends Container {

    private _easyButton: CustomButton;
    private _normalButton: CustomButton;
    private _hardButton: CustomButton;
    private _customButton: CustomButton;

    public get easyButton(): CustomButton {
        return this._easyButton;
    }

    public get normalButton(): CustomButton {
        return this._normalButton;
    }

    public get hardButton(): CustomButton {
        return this._hardButton;
    }

    public get customButton(): CustomButton {
        return this._customButton;
    }

    constructor() {
        super();

        this.createBackground();
        this.createText();
        this.createButtons();
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private createText(): void {
        this.addChild(PixiFactory.getTitle(Texts.LEVEL_SELECT));
    }

    private createButtons(): void {

        this._easyButton = PixiFactory.getTextButton(Texts.EASY);
        this._easyButton.x = ViewPortSize.HALF_WIDTH - 120;
        this._easyButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this._easyButton.anchor.set(.5);
        this.addChild(this._easyButton);

        this._normalButton = PixiFactory.getTextButton(Texts.NORMAL);
        this._normalButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._normalButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this._normalButton.anchor.set(.5);
        this.addChild(this._normalButton);

        this._hardButton = PixiFactory.getTextButton(Texts.HARD);
        this._hardButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._hardButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this._hardButton.anchor.set(.5);
        this.addChild(this._hardButton);

        this._customButton = PixiFactory.getTextButton(Texts.CUSTOM);
        this._customButton.x = ViewPortSize.HALF_WIDTH + 120;
        this._customButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this._customButton.anchor.set(.5);
        this.addChild(this._customButton);
    }
}
