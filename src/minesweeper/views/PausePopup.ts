import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { TweenLite } from "gsap";
import { Container, Text } from "pixi.js";

export class PausePopup extends Container {

    private _titleText: any;

    private _exportButton: CustomButton;
    public get exportButton(): CustomButton {
        return this._exportButton;
    }

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

    private _levelButton: CustomButton;
    public get levelButton(): CustomButton {
        return this._levelButton;
    }

    constructor() {
        super();

        this.interactive = true;

        this.createBackgrounds();
        this.createButtons();
        this.createTexts();
    }

    public animationIn(): void {
        let posY = ViewPortSize.MAX_HEIGHT * .8;
        let tweenTitle = new TweenLite(this._titleText, .3, { alpha: 1 });
        let tweenButton0 = new TweenLite(this._resumeButton, .1, { y: 50, delay: .1 });
        let tweenButton1 = new TweenLite(this._exportButton, .1, { y: posY, delay: .2 });
        let tweenButton2 = new TweenLite(this._retryButton, .1, { y: posY, delay: .3 });
        let tweenButton3 = new TweenLite(this._homeButton, .1, { y: posY, delay: .4 });
        let tweenButton4 = new TweenLite(this._levelButton, .1, { y: posY, delay: .5 });
    }

    private createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground());
        this.addChild(PixiFactory.getShadowHeader());
    }

    private createButtons(): void {
        let posY = ViewPortSize.MAX_HEIGHT + 100;

        this._resumeButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME);
        this._resumeButton.x = ViewPortSize.MAX_WIDTH - 50;
        this._resumeButton.y = -100;
        this.addChild(this._resumeButton);

        this._exportButton = PixiFactory.getTextButton(Texts.EXPORT_LEVEL);
        this._exportButton.x = ViewPortSize.HALF_WIDTH - 120;
        this._exportButton.y = posY;
        this.addChild(this._exportButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._retryButton.y = posY;
        this.addChild(this._retryButton);

        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._homeButton.y = posY;
        this.addChild(this._homeButton);

        this._levelButton = PixiFactory.getTextButton(Texts.LEVEL_SELECT_BUTTON);
        this._levelButton.x = ViewPortSize.HALF_WIDTH + 120;
        this._levelButton.y = posY;
        this.addChild(this._levelButton);
    }

    private createTexts(): void {
        this._titleText = PixiFactory.getTitle(Texts.PAUSED);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);
    }
}
