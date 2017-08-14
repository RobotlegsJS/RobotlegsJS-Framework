import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { Container, Text } from "pixi.js";

export class PausePopup extends Container {

    private _downloadButton: CustomButton;
    public get downloadButton(): CustomButton {
        return this._downloadButton;
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

    constructor() {
        super();

        this.interactive = true;

        this.setupBackgrounds();
        this.setupButtons();
        this.setupText();
    }

    private setupBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground());
        this.addChild(PixiFactory.getShadowHeader());
    }

    private setupButtons(): void {
        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = ViewPortSize.HALF_WIDTH + this._homeButton.width * .5 + 4;
        this._homeButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this.addChild(this._homeButton);

        this._resumeButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME);
        this._resumeButton.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET_HUD - 40;
        this._resumeButton.y = MagicValues.BORDER_OFFSET_HUD + 40;
        this.addChild(this._resumeButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = ViewPortSize.HALF_WIDTH - this._retryButton.width * .5 - 4;
        this._retryButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this.addChild(this._retryButton);

        this._downloadButton = PixiFactory.getTextButton("EXPORT\nLEVEL");
        this._downloadButton.x = ViewPortSize.HALF_WIDTH + 120;
        this._downloadButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this.addChild(this._downloadButton);
    }

    private setupText(): void {
        this.addChild(PixiFactory.getTitle(Texts.PAUSED));
    }
}
