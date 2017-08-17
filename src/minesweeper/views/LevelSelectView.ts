import { CustomButton } from "./components/CustomButton";
import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { TweenLite } from "gsap";
import { Container } from "pixi.js";

export class LevelSelectView extends Container {
    private _titleText: any;
    private _easyText: any;
    private _normalText: any;
    private _hardText: any;
    private _customText: any;

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
        this.createTexts();
        this.createButtons();
    }

    public updateHighscore(list: any): void {
        this._easyText.text = Texts.EASY + ": " + MagicValues.convertTime(list[Texts.EASY]);
        this._normalText.text = Texts.NORMAL + ": " + MagicValues.convertTime(list[Texts.NORMAL]);
        this._hardText.text = Texts.HARD + ": " + MagicValues.convertTime(list[Texts.HARD]);
        this._customText.text = Texts.CUSTOM + ": " + MagicValues.convertTime(list[Texts.CUSTOM]);

        this._easyText.pivot.x = this._easyText.width * .5;
        this._easyText.x = ViewPortSize.HALF_WIDTH;

        this._normalText.pivot.x = this._normalText.width * .5;
        this._normalText.x = ViewPortSize.HALF_WIDTH;

        this._hardText.pivot.x = this._hardText.width * .5;
        this._hardText.x = ViewPortSize.HALF_WIDTH;

        this._customText.pivot.x = this._customText.width * .5;
        this._customText.x = ViewPortSize.HALF_WIDTH;
    }

    public animationIn(): void {
        let posY = ViewPortSize.MAX_HEIGHT * .8;
        let tweenTitle = new TweenLite(this._titleText, .3, { alpha: 1 });
        let tweenText1 = new TweenLite(this._easyText, .3, { alpha: 1, delay: .1 });
        let tweenText2 = new TweenLite(this._normalText, .3, { alpha: 1, delay: .2 });
        let tweenText3 = new TweenLite(this._hardText, .3, { alpha: 1, delay: .3 });
        let tweenText4 = new TweenLite(this._customText, .3, { alpha: 1, delay: .4 });
        let tweenButton1 = new TweenLite(this.easyButton, .1, { y: posY, delay: .2 });
        let tweenButton2 = new TweenLite(this.normalButton, .1, { y: posY, delay: .3 });
        let tweenButton3 = new TweenLite(this.hardButton, .1, { y: posY, delay: .4 });
        let tweenButton4 = new TweenLite(this.customButton, .1, { y: posY, delay: .5 });
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private createTexts(): void {
        this._titleText = PixiFactory.getTitle(Texts.LEVEL_SELECT);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);

        this._easyText = PixiFactory.getText("");
        this._easyText.alpha = 0;
        this._easyText.y = 160;
        this.addChild(this._easyText);

        this._normalText = PixiFactory.getText("");
        this._normalText.alpha = 0;
        this._normalText.y = 220;
        this.addChild(this._normalText);

        this._hardText = PixiFactory.getText("");
        this._hardText.alpha = 0;
        this._hardText.y = 280;
        this.addChild(this._hardText);

        this._customText = PixiFactory.getText("");
        this._customText.alpha = 0;
        this._customText.y = 340;
        this.addChild(this._customText);
    }

    private createButtons(): void {
        let posY = ViewPortSize.MAX_HEIGHT + 100;
        this._easyButton = PixiFactory.getTextButton(Texts.EASY);
        this._easyButton.x = ViewPortSize.HALF_WIDTH - 120;
        this._easyButton.y = posY;
        this._easyButton.anchor.set(.5);
        this.addChild(this._easyButton);

        this._normalButton = PixiFactory.getTextButton(Texts.NORMAL);
        this._normalButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._normalButton.y = posY;
        this._normalButton.anchor.set(.5);
        this.addChild(this._normalButton);

        this._hardButton = PixiFactory.getTextButton(Texts.HARD);
        this._hardButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._hardButton.y = posY;
        this._hardButton.anchor.set(.5);
        this.addChild(this._hardButton);

        this._customButton = PixiFactory.getTextButton(Texts.CUSTOM);
        this._customButton.x = ViewPortSize.HALF_WIDTH + 120;
        this._customButton.y = posY;
        this._customButton.anchor.set(.5);
        this.addChild(this._customButton);
    }
}
