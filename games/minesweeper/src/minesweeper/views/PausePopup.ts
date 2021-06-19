import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";

export class PausePopup extends Container {
    private _titleText: any;

    private _exportButton: CustomButton;
    public get exportButton(): CustomButton {
        return this._exportButton;
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

    private _levelButton: CustomButton;
    public get levelButton(): CustomButton {
        return this._levelButton;
    }

    public constructor() {
        super();

        this.interactive = true;

        this._createBackgrounds();
        this._createButtons();
        this._createTexts();
    }

    public animationIn(): void {
        const posY = ViewPortSize.MAX_HEIGHT * 0.8;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenTitle = new TweenLite(this._titleText, 0.3, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton0 = new TweenLite(this._resumeButton, 0.1, { y: 50, delay: 0.1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton1 = new TweenLite(this._exportButton, 0.1, { y: posY, delay: 0.2 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton2 = new TweenLite(this._retryButton, 0.1, { y: posY, delay: 0.3 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton3 = new TweenLite(this._homeButton, 0.1, { y: posY, delay: 0.4 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const tweenButton4 = new TweenLite(this._levelButton, 0.1, { y: posY, delay: 0.5 });
    }

    private _createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground());
        this.addChild(PixiFactory.getShadowHeader());
    }

    private _createButtons(): void {
        const posY = ViewPortSize.MAX_HEIGHT + 100;

        this._resumeButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME);
        this._resumeButton.x = ViewPortSize.MAX_WIDTH - 50;
        this._resumeButton.y = -100;
        this.addChild(this._resumeButton);

        this._exportButton = PixiFactory.getTextButton(Texts.EXPORT_LEVEL);
        this._exportButton.x = ViewPortSize.HALF_WIDTH - 120;
        this._exportButton.y = posY;
        this.addChild(this._exportButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = ViewPortSize.HALF_WIDTH - 40;
        this._retryButton.y = posY;
        this.addChild(this._retryButton);

        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = ViewPortSize.HALF_WIDTH + 40;
        this._homeButton.y = posY;
        this.addChild(this._homeButton);

        this._levelButton = PixiFactory.getTextButton(Texts.LEVEL_SELECT_BUTTON);
        this._levelButton.x = ViewPortSize.HALF_WIDTH + 120;
        this._levelButton.y = posY;
        this.addChild(this._levelButton);
    }

    private _createTexts(): void {
        this._titleText = PixiFactory.getTitle(Texts.PAUSED);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);
    }
}
