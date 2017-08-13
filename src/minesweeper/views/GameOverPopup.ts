import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { Container, Text } from "pixi.js";

export class GameOverPopup extends Container {

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

        this.setupBackgrounds();
        this.setupButtons();
        this.setupText();
    }

    private setupBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground());
    }

    private setupButtons(): void {
        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = ViewPortSize.HALF_WIDTH + this._homeButton.width * .5 + 4;
        this._homeButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this.addChild(this._homeButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = ViewPortSize.HALF_WIDTH - this._retryButton.width * .5 - 4;
        this._retryButton.y = ViewPortSize.MAX_HEIGHT * .8;
        this.addChild(this._retryButton);
    }

    private setupText(): void {
        this.addChild(PixiFactory.getTitle(Texts.GAME_OVER));
    }
}
