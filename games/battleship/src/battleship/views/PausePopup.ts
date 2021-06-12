import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";

import { TweenLite } from "gsap";
import { Container, Text } from "pixi.js";

export class PausePopup extends Container {
    private _titleText: any;

    private _homeButton: CustomButton;
    public get homeButton(): CustomButton {
        return this._homeButton;
    }

    private _resumeButton: CustomButton;
    public get resumeButton(): CustomButton {
        return this._resumeButton;
    }

    private _retryButton: CustomButton;
    public get retryButton(): CustomButton {
        return this._retryButton;
    }

    constructor() {
        super();

        this.interactive = true;

        this.createBackgrounds();
        this.createButtons();
        this.createTexts();
    }

    public animationIn(): void {
        let posY = MagicValues.MAX_HEIGHT * 0.8;
        let tweenTitle = new TweenLite(this._titleText, 0.3, { alpha: 1 });
        let tweenButton0 = new TweenLite(this._resumeButton, 0.1, { y: 50, delay: 0.1 });
        let tweenButton2 = new TweenLite(this._retryButton, 0.1, { y: posY, delay: 0.3 });
        let tweenButton3 = new TweenLite(this._homeButton, 0.1, { y: posY, delay: 0.4 });
    }

    private createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground());
        this.addChild(PixiFactory.getShadowHeader());
    }

    private createButtons(): void {
        let posY = MagicValues.MAX_HEIGHT + 100;

        this._resumeButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME);
        this._resumeButton.x = MagicValues.MAX_WIDTH - 50;
        this._resumeButton.y = -100;
        this.addChild(this._resumeButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = MagicValues.HALF_WIDTH - 40;
        this._retryButton.y = posY;
        this.addChild(this._retryButton);

        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = MagicValues.HALF_WIDTH + 40;
        this._homeButton.y = posY;
        this.addChild(this._homeButton);
    }

    private createTexts(): void {
        this._titleText = PixiFactory.getTitle(Texts.PAUSED);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);
    }
}
