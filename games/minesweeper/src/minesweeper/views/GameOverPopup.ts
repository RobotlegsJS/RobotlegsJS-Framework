import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";

export class GameOverPopup extends Container {
    private _titleText: any;

    private _homeButton: CustomButton;
    public get homeButton(): CustomButton {
        return this._homeButton;
    }

    private _retryButton: CustomButton;
    public get retryButton(): CustomButton {
        return this._retryButton;
    }

    public constructor() {
        super();

        this.interactive = true;

        this._createBackgrounds();
        this._createButtons();
        this._createText();
    }

    public animationIn(): void {
        const posY = ViewPortSize.MAX_HEIGHT * 0.8;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenTitle = new TweenLite(this._titleText, 0.3, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton1 = new TweenLite(this._retryButton, 0.1, { y: posY });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton2 = new TweenLite(this._homeButton, 0.1, { y: posY, delay: 0.1 });
    }

    private _createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground(0.6));
        this.addChild(PixiFactory.getShadowHeader());
    }

    private _createButtons(): void {
        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = ViewPortSize.HALF_WIDTH + this._homeButton.width * 0.5 + 4;
        this._homeButton.y = ViewPortSize.MAX_HEIGHT + 100;
        this.addChild(this._homeButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = ViewPortSize.HALF_WIDTH - this._retryButton.width * 0.5 - 4;
        this._retryButton.y = ViewPortSize.MAX_HEIGHT + 100;
        this.addChild(this._retryButton);
    }

    private _createText(): void {
        this._titleText = PixiFactory.getTitle(Texts.GAME_OVER);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);
    }
}
