import { TweenLite } from "gsap";
import { Container } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { MagicValues } from "../utils/MagicValues";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { CustomButton } from "./components/CustomButton";

export class YouWinPopup extends Container {
    private _titleText: any;
    private _msgText: any;

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
        let posY = MagicValues.MAX_HEIGHT * 0.8;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let tweenTitle = new TweenLite(this._titleText, 0.3, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let tweenText1 = new TweenLite(this._msgText, 0.3, { alpha: 1 });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let tweenButton1 = new TweenLite(this._retryButton, 0.1, { y: posY });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let tweenButton2 = new TweenLite(this._homeButton, 0.1, { y: posY, delay: 0.1 });
    }

    private _createBackgrounds(): void {
        this.addChild(PixiFactory.getShadowBackground(0.8));
        this.addChild(PixiFactory.getShadowHeader());
    }

    private _createButtons(): void {
        this._homeButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME);
        this._homeButton.x = MagicValues.HALF_WIDTH + this._homeButton.width * 0.5 + 4;
        this._homeButton.y = MagicValues.MAX_HEIGHT + 100;
        this.addChild(this._homeButton);

        this._retryButton = PixiFactory.getIconButton(AtlasKeys.ICON_RETRY);
        this._retryButton.x = MagicValues.HALF_WIDTH - this._retryButton.width * 0.5 - 4;
        this._retryButton.y = MagicValues.MAX_HEIGHT + 100;
        this.addChild(this._retryButton);
    }

    private _createText(): void {
        this._titleText = PixiFactory.getTitle(Texts.YOU_WIN);
        this._titleText.alpha = 0;
        this.addChild(this._titleText);

        this._msgText = PixiFactory.getText(Texts.WIN_MSG);
        this._msgText.pivot.x = this._msgText.width * 0.5;
        this._msgText.x = MagicValues.HALF_WIDTH;
        this._msgText.y = 130;
        this._msgText.alpha = 0;
        this.addChild(this._msgText);
    }
}
