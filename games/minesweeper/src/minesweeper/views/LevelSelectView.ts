import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";

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

    public constructor() {
        super();

        this._createBackground();
        this._createTexts();
        this._createButtons();
    }

    public updateHighscore(list: any): void {
        this._easyText.text = Texts.EASY + ": " + MagicValues.convertTime(list[Texts.EASY]);
        this._normalText.text = Texts.NORMAL + ": " + MagicValues.convertTime(list[Texts.NORMAL]);
        this._hardText.text = Texts.HARD + ": " + MagicValues.convertTime(list[Texts.HARD]);
        this._customText.text = Texts.CUSTOM + ": " + MagicValues.convertTime(list[Texts.CUSTOM]);

        this._easyText.pivot.x = this._easyText.width * 0.5;
        this._easyText.x = ViewPortSize.HALF_WIDTH;

        this._normalText.pivot.x = this._normalText.width * 0.5;
        this._normalText.x = ViewPortSize.HALF_WIDTH;

        this._hardText.pivot.x = this._hardText.width * 0.5;
        this._hardText.x = ViewPortSize.HALF_WIDTH;

        this._customText.pivot.x = this._customText.width * 0.5;
        this._customText.x = ViewPortSize.HALF_WIDTH;
    }

    public animationIn(): void {
        const posY = ViewPortSize.MAX_HEIGHT * 0.8;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenTitle = new TweenLite(this._titleText, 0.3, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText1 = new TweenLite(this._easyText, 0.3, { alpha: 1, delay: 0.1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText2 = new TweenLite(this._normalText, 0.3, { alpha: 1, delay: 0.2 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText3 = new TweenLite(this._hardText, 0.3, { alpha: 1, delay: 0.3 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText4 = new TweenLite(this._customText, 0.3, { alpha: 1, delay: 0.4 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton1 = new TweenLite(this.easyButton, 0.1, { y: posY, delay: 0.2 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton2 = new TweenLite(this.normalButton, 0.1, { y: posY, delay: 0.3 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton3 = new TweenLite(this.hardButton, 0.1, { y: posY, delay: 0.4 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton4 = new TweenLite(this.customButton, 0.1, { y: posY, delay: 0.5 });
    }

    private _createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private _createTexts(): void {
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

    private _createButtons(): void {
        const posY = ViewPortSize.MAX_HEIGHT + 100;
        this._easyButton = PixiFactory.getTextButton(Texts.EASY);
        this._easyButton.x = ViewPortSize.HALF_WIDTH - 120;
        this._easyButton.y = posY;
        this._easyButton.anchor.set(0.5);
        this.addChild(this._easyButton);

        this._normalButton = PixiFactory.getTextButton(Texts.NORMAL);
        this._normalButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._normalButton.y = posY;
        this._normalButton.anchor.set(0.5);
        this.addChild(this._normalButton);

        this._hardButton = PixiFactory.getTextButton(Texts.HARD);
        this._hardButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._hardButton.y = posY;
        this._hardButton.anchor.set(0.5);
        this.addChild(this._hardButton);

        this._customButton = PixiFactory.getTextButton(Texts.CUSTOM);
        this._customButton.x = ViewPortSize.HALF_WIDTH + 120;
        this._customButton.y = posY;
        this._customButton.anchor.set(0.5);
        this.addChild(this._customButton);
    }
}
