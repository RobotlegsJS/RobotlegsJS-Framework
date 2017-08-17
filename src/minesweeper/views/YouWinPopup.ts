import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { Container, Text } from "pixi.js";
import { TweenLite } from "gsap";

export class YouWinPopup extends Container {

    private _titleText: any;
    private _msgText: any;
    private _timeText: any;
    private _bestText: any;
    private _clicksText: any;

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
        let tweenText1 = new TweenLite(this._msgText, .3, { alpha: 1 });
        let tweenText2 = new TweenLite(this._timeText, .3, { alpha: 1 });
        let tweenText3 = new TweenLite(this._bestText, .3, { alpha: 1 });
        let tweenText4 = new TweenLite(this._clicksText, .3, { alpha: 1 });
        let tweenButton1 = new TweenLite(this._retryButton, .1, { y: posY });
        let tweenButton2 = new TweenLite(this._homeButton, .1, { y: posY, delay: .1 });
    }

    public showInfo(time: number, numClick: number): void {
        this._timeText.text = Texts.GAME_TIME + MagicValues.convertTime(time);
        this._bestText.text = Texts.GAME_BEST_TIME + MagicValues.convertTime(time);
        this._clicksText.text = Texts.NUM_CLICKS + numClick;

        this._timeText.pivot.x = this._timeText.width * .5;
        this._timeText.x = ViewPortSize.HALF_WIDTH;

        this._bestText.pivot.x = this._bestText.width * .5;
        this._bestText.x = ViewPortSize.HALF_WIDTH;

        this._clicksText.pivot.x = this._clicksText.width * .5;
        this._clicksText.x = ViewPortSize.HALF_WIDTH;
    }

    private createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground(.8));
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
        this._titleText = PixiFactory.getTitle(Texts.YOU_WIN);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);

        this._msgText = PixiFactory.getText(Texts.WIN_MSG);
        this._msgText.pivot.x = this._msgText.width * .5;
        this._msgText.x = ViewPortSize.HALF_WIDTH;
        this._msgText.y = 130;
        this._msgText.alpha = 0;
        this.addChild(this._msgText);

        this._timeText = PixiFactory.getText(Texts.GAME_TIME);
        this._timeText.y = 260;
        this._timeText.alpha = 0;
        this.addChild(this._timeText);

        this._bestText = PixiFactory.getText(Texts.GAME_BEST_TIME);
        this._bestText.y = 310;
        this._bestText.alpha = 0;
        this.addChild(this._bestText);

        this._clicksText = PixiFactory.getText(Texts.NUM_CLICKS);
        this._clicksText.y = 360;
        this._clicksText.alpha = 0;
        this.addChild(this._clicksText);
    }
}
