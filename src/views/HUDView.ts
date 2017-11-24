import { Container, Text } from "pixi.js";

import { Colors } from "./../utils/Colors";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { TextButton } from "./components/TextButton";

export class HUDView extends Container {
    private _remaining: Text;
    private _button: TextButton;
    public get button(): TextButton {
        return this._button;
    }

    constructor() {
        super();
        this.createBackground();
        this.createButtons();
        this.createTexts();
    }
    public updateRemaining(value: number): void {
        this._remaining.text = `${Texts.HUD_SCRATCH_REMAINING} ${value}`;
    }
    private createBackground(): void {
        const { MAX_WIDTH, HUD_HEIGHT } = MagicValues;
        this.addChild(PixiFactory.getColorBox(MAX_WIDTH, HUD_HEIGHT, Colors.BACKGROUND_DARK));
    }
    private createButtons(): void {
        this._button = new TextButton();
        this._button.setText(Texts.PLAY);
        this._button.x = MagicValues.HALF_WIDTH;
        this._button.y = MagicValues.MAX_HEIGHT - 45;
        this.addChild(this._button);
    }
    private createTexts(): void {
        this._remaining = PixiFactory.getText("", Colors.TEXT);
        this._remaining.text = `${Texts.HUD_SCRATCH_REMAINING} 0`;
        this._remaining.position.set(5, 20);
        this.addChild(this._remaining);
    }
}
