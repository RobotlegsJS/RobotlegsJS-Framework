import { TweenLite } from "gsap";
import { Container, Sprite } from "pixi.js";

import { LevelModel } from "./../../game/models/LevelModel";
import { AtlasKeys } from "./../../utils/AtlasKeys";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Texts } from "./../../utils/Texts";
import { ViewPortSize } from "./../../utils/ViewPortSize";
import { CustomButton } from "./CustomButton";

export class HUDGameComponent extends Container {
    private _levelText: any;
    private _numFlagsText: any;
    private _clockText: any;
    private _flagImg: Sprite;

    private _pauseButton: CustomButton;
    public get pauseButton(): CustomButton {
        return this._pauseButton;
    }

    constructor() {
        super();

        this.createTexts();
        this.createButtons();
        this.createImages();
    }
    public updateValues(model: LevelModel): void {
        this._levelText.text = model.levelId;
        this._clockText.text = MagicValues.convertTime(model.clock);
        this._numFlagsText.text = ":" + model.numFlags;
    }
    public animationIn(): void {
        const tweenText1 = new TweenLite(this._levelText, 0.4, { alpha: 1 });
        const tweenText2 = new TweenLite(this._clockText, 0.4, { alpha: 1, delay: 0.1 });
        const tweenImg = new TweenLite(this._flagImg, 0.4, { alpha: 1, delay: 0.2 });
        const tweenText3 = new TweenLite(this._numFlagsText, 0.4, { alpha: 1, delay: 0.3 });
        const tweenButton = new TweenLite(this.pauseButton, 0.1, { y: 50, delay: 0.2 });
    }
    private createImages(): void {
        this._flagImg = PixiFactory.getImage(AtlasKeys.ICON_FLAG_LARGE);
        this._flagImg.x = 175;
        this._flagImg.y = 56;
        this._flagImg.alpha = 0;
        this.addChild(this._flagImg);
    }
    private createTexts(): void {
        this._levelText = PixiFactory.getHUDText(Texts.EASY);
        this._levelText.x = 10;
        this._levelText.y = 10;
        this._levelText.alpha = 0;
        this.addChild(this._levelText);

        this._clockText = PixiFactory.getHUDText("0:00");
        this._clockText.x = 10;
        this._clockText.y = 50;
        this._clockText.alpha = 0;
        this.addChild(this._clockText);

        this._numFlagsText = PixiFactory.getHUDText("10");
        this._numFlagsText.x = 215;
        this._numFlagsText.y = 50;
        this._numFlagsText.alpha = 0;
        this.addChild(this._numFlagsText);
    }
    private createButtons(): void {
        this._pauseButton = PixiFactory.getIconButton(AtlasKeys.ICON_PAUSE);
        this._pauseButton.x = ViewPortSize.MAX_WIDTH - 50;
        this._pauseButton.y = -100;
        this.addChild(this._pauseButton);
    }
}
