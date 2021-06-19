import { Container, Text } from "pixi.js";
import { AtlasKeys } from "../utils/AtlasKeys";
import { PixiFactory } from "../utils/PixiFactory";
import { Texts } from "../utils/Texts";
import { ViewPortSize } from "../utils/ViewPortSize";
import { CustomButton } from "./components/CustomButton";

export class ResetConfirmPopup extends Container {
    private _cancelButton: CustomButton;
    public get cancelButton(): CustomButton {
        return this._cancelButton;
    }

    private _confirmButton: CustomButton;
    public get confirmButton(): CustomButton {
        return this._confirmButton;
    }

    public constructor() {
        super();

        this.interactive = true;

        this._setupBackground();
        this._setupTexts();
        this._setupButtons();
    }

    private _setupBackground(): void {
        this.addChild(PixiFactory.getShadowBackground());
        this.addChild(PixiFactory.getBoardBackground());
    }

    private _setupTexts(): void {
        const msg: Text = PixiFactory.getText(Texts.CONFIRM_RESET);
        msg.anchor.set(0.5);
        msg.x = ViewPortSize.HALF_WIDTH;
        msg.y = ViewPortSize.HALF_HEIGHT - 30;
        this.addChild(msg);
    }

    private _setupButtons(): void {
        this._cancelButton = PixiFactory.getButton(AtlasKeys.BUTTON_CANCEL);
        this._cancelButton.x = ViewPortSize.HALF_WIDTH + 25;
        this._cancelButton.y = ViewPortSize.HALF_HEIGHT + 15;
        this.addChild(this._cancelButton);

        this._confirmButton = PixiFactory.getButton(AtlasKeys.BUTTON_CONFIRM);
        this._confirmButton.x = ViewPortSize.HALF_WIDTH - 25;
        this._confirmButton.y = ViewPortSize.HALF_HEIGHT + 15;
        this.addChild(this._confirmButton);
    }
}
