import { Container } from "pixi.js";

import { PixiFactory } from "../../utils/PixiFactory";
import { CustomButton } from "./CustomButton";

export class NumericStepper extends Container {
    private _value: number;
    public get value(): number {
        return this._value;
    }
    private _maxValue: number;
    private _minValue: number;

    private _decreaseButton: CustomButton;
    private _increaseButton: CustomButton;

    private _valueText: any;

    constructor(minValue: number, maxValue: number, value = 0) {
        super();

        this._value = value || minValue;
        this._minValue = minValue;
        this._maxValue = maxValue;

        this.interactive = true;
        this.createTexts();
        this.createButtons();
        this.scale.set(0.5);
    }
    public createTexts(): void {
        this._valueText = PixiFactory.getText(this._value.toString());
        this._valueText.x = 85;
        this._valueText.y = -5;
        this.addChild(this._valueText);
    }
    public createButtons(): void {
        this._decreaseButton = PixiFactory.getTextButton("-");
        this._decreaseButton.y = 10;
        this.addChild(this._decreaseButton);
        this._decreaseButton.on("mouseup", this.descrease);

        this._increaseButton = PixiFactory.getTextButton("+");
        this._increaseButton.x = 210;
        this._increaseButton.y = 10;
        this.addChild(this._increaseButton);
        this._increaseButton.on("mouseup", this.increase);
    }
    private descrease = (e: any, thisNS = this) => {
        thisNS._value = Math.max(thisNS._minValue, thisNS._value - 1);
        thisNS._valueText.text = thisNS._value.toString();
    };
    private increase = (e: any, thisNS = this) => {
        thisNS._value = Math.min(thisNS._maxValue, thisNS._value + 1);
        thisNS._valueText.text = thisNS._value.toString();
    };
}
