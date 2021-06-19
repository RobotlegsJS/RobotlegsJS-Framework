import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";
import { NumericStepper } from "./components/NumericStepper";

export class LevelCustomOptionsView extends Container {
    private _titleText: any;
    private _maxColsText: any;
    private _maxRowsText: any;
    private _maxMinesText: any;

    private _backButton: CustomButton;
    public get backButton(): CustomButton {
        return this._backButton;
    }

    private _playButton: CustomButton;
    public get playButton(): CustomButton {
        return this._playButton;
    }

    private _maxColsNS: NumericStepper;
    public get maxColsNS(): NumericStepper {
        return this._maxColsNS;
    }

    private _maxRowsNS: NumericStepper;
    public get maxRowsNS(): NumericStepper {
        return this._maxRowsNS;
    }

    private _maxMinesNS: NumericStepper;
    public get maxMinesNS(): NumericStepper {
        return this._maxMinesNS;
    }

    public constructor() {
        super();

        this._createBackground();
        this._createTexts();
        this._createButtons();
        this._createNumericSteppers();
    }

    public animationIn(): void {
        const posY = ViewPortSize.MAX_HEIGHT * 0.8;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenTitle = new TweenLite(this._titleText, 0.3, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText1 = new TweenLite(this._maxColsText, 0.3, { alpha: 1, delay: 0.1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenNS1 = new TweenLite(this._maxColsNS, 0.3, { alpha: 1, delay: 0.2 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText2 = new TweenLite(this._maxRowsText, 0.3, { alpha: 1, delay: 0.2 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenNS2 = new TweenLite(this._maxRowsNS, 0.3, { alpha: 1, delay: 0.3 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenText3 = new TweenLite(this._maxMinesText, 0.3, { alpha: 1, delay: 0.3 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenNS3 = new TweenLite(this._maxMinesNS, 0.3, { alpha: 1, delay: 0.4 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton3 = new TweenLite(this.backButton, 0.1, { y: posY, delay: 0.3 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton4 = new TweenLite(this.playButton, 0.1, { y: posY, delay: 0.4 });
    }

    private _createNumericSteppers(): void {
        this._maxColsNS = new NumericStepper(6, 13, 9);
        this._maxColsNS.x = 260;
        this._maxColsNS.y = 160;
        this._maxColsNS.alpha = 0;
        this.addChild(this._maxColsNS);

        this._maxRowsNS = new NumericStepper(6, 16, 9);
        this._maxRowsNS.x = 260;
        this._maxRowsNS.y = 230;
        this._maxRowsNS.alpha = 0;
        this.addChild(this._maxRowsNS);

        this._maxMinesNS = new NumericStepper(4, 20);
        this._maxMinesNS.x = 260;
        this._maxMinesNS.y = 300;
        this._maxMinesNS.alpha = 0;
        this.addChild(this._maxMinesNS);
    }

    private _createTexts(): void {
        this._titleText = PixiFactory.getTitle(Texts.LEVEL_EDITOR_OPTIONS);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);

        this._maxColsText = PixiFactory.getText(Texts.MAX_COLS);
        this._maxColsText.x = 20;
        this._maxColsText.y = 150;
        this._maxColsText.alpha = 0;
        this.addChild(this._maxColsText);

        this._maxRowsText = PixiFactory.getText(Texts.MAX_ROWS);
        this._maxRowsText.x = 20;
        this._maxRowsText.y = 220;
        this._maxRowsText.alpha = 0;
        this.addChild(this._maxRowsText);

        this._maxMinesText = PixiFactory.getText(Texts.MAX_MINES);
        this._maxMinesText.x = 20;
        this._maxMinesText.y = 290;
        this._maxMinesText.alpha = 0;
        this.addChild(this._maxMinesText);
    }

    private _createBackground(): void {
        this.addChild(PixiFactory.getColorBackground());
    }

    private _createButtons(): void {
        this._backButton = PixiFactory.getTextButton(Texts.BACK);
        this._backButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._backButton.y = ViewPortSize.MAX_HEIGHT + 100;
        this._backButton.anchor.set(0.5);
        this.addChild(this._backButton);

        this._playButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME);
        this._playButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._playButton.y = ViewPortSize.MAX_HEIGHT + 100;
        this._playButton.anchor.set(0.5);
        this.addChild(this._playButton);
    }
}
