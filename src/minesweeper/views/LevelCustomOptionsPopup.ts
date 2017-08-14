import { NumericStepper } from "./components/NumericStepper";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";
import { AtlasKeys } from "../utils/AtlasKeys";
import { Texts } from "../utils/Texts";
import { PixiFactory } from "./../utils/PixiFactory";
import { Container, Sprite } from "pixi.js";

export class LevelCustomOptionsPopup extends Container {

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

    constructor() {
        super();

        this.createBackground();
        this.createText();
        this.createButtons();
        this.createNumericSteppers();
    }
    private createNumericSteppers(): void {
        this._maxColsNS = new NumericStepper(6, 13, 9);
        this._maxColsNS.x = 260;
        this._maxColsNS.y = 160;
        this.addChild(this._maxColsNS);

        this._maxRowsNS = new NumericStepper(6, 16, 9);
        this._maxRowsNS.x = 260;
        this._maxRowsNS.y = 230;
        this.addChild(this._maxRowsNS);

        this._maxMinesNS = new NumericStepper(4, 20);
        this._maxMinesNS.x = 260;
        this._maxMinesNS.y = 300;
        this.addChild(this._maxMinesNS);
    }

    private createText(): void {
        this.addChild(PixiFactory.getTitle(Texts.LEVEL_EDITOR_OPTIONS));

        let maxColsText = PixiFactory.getText(Texts.MAX_COLS);
        maxColsText.x = 20;
        maxColsText.y = 150;
        this.addChild(maxColsText);

        let maxRowsText = PixiFactory.getText(Texts.MAX_ROWS);
        maxRowsText.x = 20;
        maxRowsText.y = 220;
        this.addChild(maxRowsText);

        let maxMinesText = PixiFactory.getText(Texts.MAX_MINES);
        maxMinesText.x = 20;
        maxMinesText.y = 290;
        this.addChild(maxMinesText);
    }

    private createBackground(): void {
        this.addChild(PixiFactory.getShadowBackground(.8));
        this.addChild(PixiFactory.getShadowHeader());
    }

    private createButtons(): void {
        this._backButton = PixiFactory.getTextButton(Texts.BACK);
        this._backButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._backButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this._backButton.anchor.set(.5);
        this.addChild(this._backButton);

        this._playButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME);
        this._playButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._playButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this._playButton.anchor.set(.5);
        this.addChild(this._playButton);
    }
}
