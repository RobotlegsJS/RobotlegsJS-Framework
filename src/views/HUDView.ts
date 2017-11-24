import { Container, Text, Graphics } from "pixi.js";

import { Colors } from "./../utils/Colors";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { TextButton } from "./components/TextButton";

export class HUDView extends Container {
    private _remaining: Text;
    private _button: TextButton;
    private _scratchArea: Graphics;
    public get button(): TextButton {
        return this._button;
    }
    public get scratchArea(): Graphics {
        return this._scratchArea;
    }

    constructor() {
        super();
        this.createBackground();
        this.createButtons();
        this.createTexts();
        this.createComponents();
    }
    public updateRemaining(value: number): void {
        this._remaining.text = `${Texts.HUD_SCRATCH_REMAINING} ${value}`;
    }
    private createComponents(): void {
        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH } = MagicValues;
        this._scratchArea = PixiFactory.getColorBox(SCRATCH_BOX_WIDTH, SCRATCH_BOX_HEIGHT, Colors.BACKGROUND_DARK);
        this._scratchArea.x = 10;
        this._scratchArea.y = 100;
        this._scratchArea.alpha = 0.1;
        this._scratchArea.interactive = true;
        this._scratchArea.buttonMode = true;
        this.addChild(this._scratchArea);
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
