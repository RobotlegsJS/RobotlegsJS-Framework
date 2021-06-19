import { Container, Graphics, Text } from "pixi.js";
import { Colors } from "./../utils/Colors";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { TextButton } from "./components/TextButton";

export class HUDView extends Container {
    private _remaining: Text;
    private _playButton: TextButton;
    private _endButton: TextButton;
    private _scratchArea: Graphics;

    public get playButton(): TextButton {
        return this._playButton;
    }

    public get endButton(): TextButton {
        return this._endButton;
    }

    public get scratchArea(): Graphics {
        return this._scratchArea;
    }

    public constructor() {
        super();
        this._createBackground();
        this._createButtons();
        this._createTexts();
        this._createComponents();
    }

    public updateRemaining(value: number): void {
        this._remaining.text = `${Texts.HUD_SCRATCH_REMAINING} ${value}`;
    }

    private _createComponents(): void {
        const { SCRATCH_BOX_HEIGHT, SCRATCH_BOX_WIDTH } = MagicValues;
        this._scratchArea = PixiFactory.getColorBox(
            SCRATCH_BOX_WIDTH,
            SCRATCH_BOX_HEIGHT,
            Colors.BACKGROUND_DARK
        );
        this._scratchArea.x = 10;
        this._scratchArea.y = 100;
        this._scratchArea.alpha = 0.1;
        this.addChild(this._scratchArea);
    }

    private _createBackground(): void {
        const { MAX_WIDTH, HUD_HEIGHT } = MagicValues;
        this.addChild(PixiFactory.getColorBox(MAX_WIDTH, HUD_HEIGHT, Colors.BACKGROUND_DARK));
    }

    private _createButtons(): void {
        this._playButton = new TextButton();
        this._playButton.setText(Texts.PLAY);
        this._playButton.x = MagicValues.HALF_WIDTH;
        this._playButton.y = MagicValues.MAX_HEIGHT - 45;
        this.addChild(this._playButton);

        this._endButton = new TextButton();
        this._endButton.setText(Texts.CLEAR_ALL);
        this._endButton.x = MagicValues.HALF_WIDTH;
        this._endButton.y = MagicValues.MAX_HEIGHT - 45;
        this._endButton.visible = false;
        this.addChild(this._endButton);
    }

    private _createTexts(): void {
        this._remaining = PixiFactory.getText("", Colors.TEXT);
        this._remaining.text = `${Texts.HUD_SCRATCH_REMAINING} 0`;
        this._remaining.position.set(5, 20);
        this.addChild(this._remaining);
    }
}
