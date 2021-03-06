import { BitmapText, Container } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";
import { IconButton } from "./components/IconButton";

export class OptionsView extends Container {
    private _deleteButton: IconButton;
    private _backButton: IconButton;
    public get deleteButton(): IconButton {
        return this._deleteButton;
    }
    public get backButton(): IconButton {
        return this._backButton;
    }

    public constructor() {
        super();

        this._createBackgrounds();
        this._createTexts();
        this._createButtons();
    }

    private _createBackgrounds(): void {
        this.addChild(PixiFactory.getBackground());
        this.addChild(PixiFactory.getBackgroundPopup());
    }

    private _createTexts(): void {
        this.addChild(PixiFactory.getTitle(Texts.OPTIONS));

        const hiScore: BitmapText = PixiFactory.getText(Texts.HI_SCORE);
        hiScore.x = MagicValues.BORDER_OFFSET_POPUP;
        hiScore.y = 180;
        this.addChild(hiScore);
    }

    private _createButtons(): void {
        this._deleteButton = PixiFactory.getIconButton(
            AtlasKeys.ICON_DELETE,
            IconButton.TYPE_SMALL_DANGER
        );
        this._deleteButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET_POPUP - 25;
        this._deleteButton.y = 200;
        this.addChild(this._deleteButton);

        this._backButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME, IconButton.TYPE_MEDIUM);
        this._backButton.x = ViewPortSize.HALF_WIDTH;
        this._backButton.y = ViewPortSize.MAX_HEIGHT - MagicValues.BORDER_OFFSET_BOTTOM;
        this.addChild(this._backButton);
    }
}
