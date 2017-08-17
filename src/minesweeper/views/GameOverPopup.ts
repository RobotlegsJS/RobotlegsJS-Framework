import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { TweenLite } from "gsap";
import { Container, Text } from "pixi.js";

export class GameOverPopup extends Container {

    private _titleText: any;

    private _homeButton: CustomButton;
    public get homeButton(): CustomButton {
        return this._homeButton;
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
        this.createText();
    }

    public animationIn(): void {
        let posY = ViewPortSize.MAX_HEIGHT * .8;
        let tweenTitle = new TweenLite(this._titleText, .3, { alpha: 1 });
        let tweenButton1 = new TweenLite(this._retryButton, .1, { y: posY });
        let tweenButton2 = new TweenLite(this._homeButton, .1, { y: posY, delay: .1 });
    }

    private createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground(.6));
        this.addChild(PixiFactory.getShadowHeader());
    }

    private createButtons(): void {
        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = ViewPortSize.HALF_WIDTH + this._homeButton.width * .5 + 4;
        this._homeButton.y = ViewPortSize.MAX_HEIGHT + 100;
        this.addChild(this._homeButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = ViewPortSize.HALF_WIDTH - this._retryButton.width * .5 - 4;
        this._retryButton.y = ViewPortSize.MAX_HEIGHT + 100;
        this.addChild(this._retryButton);
    }

    private createText(): void {
        this._titleText = PixiFactory.getTitle(Texts.GAME_OVER);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);
    }
}
