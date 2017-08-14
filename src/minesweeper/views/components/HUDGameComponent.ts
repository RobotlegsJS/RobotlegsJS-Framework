import { Texts } from "./../../utils/Texts";
import { ViewPortSize } from "./../../utils/ViewPortSize";
import { AtlasKeys } from "./../../utils/AtlasKeys";
import { PixiFactory } from "./../../utils/PixiFactory";
import { MagicValues } from "./../../utils/MagicValues";
import { LevelModel } from "./../../game/models/LevelModel";
import { CustomButton } from "./CustomButton";

import { Container } from "pixi.js";

export class HUDGameComponent extends Container {

    private _levelTextField: any;
    private _numFlagsTextField: any;
    private _clockTextField: any;

    private _pauseButton: CustomButton;
    public get pauseButton(): CustomButton {
        return this._pauseButton;
    }

    constructor() {
        super();

        this.createTextFields();
        this.createButtons();
    }

    public updateValues(model: LevelModel): void {
        this._levelTextField.text = model.levelId;
        this._numFlagsTextField.text = model.numFlags;
        this._clockTextField.text = MagicValues.convertTime(model.clock);
    }

    private createTextFields(): void {
        this._levelTextField = PixiFactory.getText(Texts.EASY, 42);
        this._levelTextField.x = 10;
        this._levelTextField.y = 10;
        this.addChild(this._levelTextField);

        this._clockTextField = PixiFactory.getText("0:00", 42);
        this._clockTextField.x = 10;
        this._clockTextField.y = 50;
        this.addChild(this._clockTextField);

        this._numFlagsTextField = PixiFactory.getText("10", 42);
        this._numFlagsTextField.x = 245;
        this._numFlagsTextField.y = 50;
        this.addChild(this._numFlagsTextField);
    }

    private createButtons(): void {
        this._pauseButton = PixiFactory.getIconButton(AtlasKeys.ICON_PAUSE);
        this._pauseButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET_HUD - 40;
        this._pauseButton.y = MagicValues.BORDER_OFFSET_HUD + 40;
        this.addChild(this._pauseButton);
    }
}
