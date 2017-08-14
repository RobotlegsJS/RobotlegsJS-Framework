import { CustomButton } from "./components/CustomButton";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { Container, Text } from "pixi.js";

export class YouWinPopup extends Container {

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

    public showInfo(time: number, numClick: number): void {
        let clock = Texts.GAME_TIME + MagicValues.convertTime(time);
        let maxRowsText = PixiFactory.getText(clock, 12);
        maxRowsText.x = 20;
        maxRowsText.y = 220;
        this.addChild(maxRowsText);

        let maxMinesText = PixiFactory.getText(Texts.NUM_CLICKS + numClick, 12);
        maxMinesText.x = 20;
        maxMinesText.y = 290;
        this.addChild(maxMinesText);
    }

    private setupBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground(.8));
        this.addChild(PixiFactory.getShadowHeader());
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
        this.addChild(PixiFactory.getTitle(Texts.YOU_WIN));
        let msg = PixiFactory.getText(Texts.WIN_MSG, 12);
        msg.x = 20;
        msg.y = 150;
        this.addChild(msg);

        let maxRowsText = PixiFactory.getText(Texts.GAME_TIME, 12);
        maxRowsText.x = 20;
        maxRowsText.y = 220;
        this.addChild(maxRowsText);

        let maxMinesText = PixiFactory.getText(Texts.NUM_CLICKS, 12);
        maxMinesText.x = 20;
        maxMinesText.y = 290;
        this.addChild(maxMinesText);
    }

}
