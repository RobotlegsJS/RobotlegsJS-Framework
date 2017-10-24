import { DoubleText } from "./DoubleText";
import { Colors } from "../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Container, Graphics } from "pixi.js";
export class PlayerComponent extends Container {
    private _background: Graphics;
    private _field: Container;
    private _type: string;
    private _doubleTexts: DoubleText[];
    public get doubleTexts(): DoubleText[] {
        return this._doubleTexts;
    }
    public get type(): string {
        return this._type;
    }

    public get field(): Container {
        return this._field;
    }

    constructor(type: string) {
        super();
        this._type = type;

        this.setupBackground();
        this.setupTexts();
    }

    public setupBackground(): void {
        this._background = PixiFactory.getColorBox(MagicValues.MAX_WIDTH, MagicValues.HALF_HEIGHT, 0xff0000);
        this._background.visible = false;
        this.addChild(this._background);

        this._field = new Container();
        this._field.x = 20;
        this._field.y = 80;
        this.addChild(this._field);
    }

    private setupTexts(): void {
        this._doubleTexts = new Array<DoubleText>();
        for (let i = 0; i < 5; i++) {
            let doubleText: DoubleText = new DoubleText("0", "0");
            doubleText.x = 220;
            doubleText.y = i * 50 + 50;
            this.addChild(doubleText);
            this._doubleTexts.push(doubleText);
        }

        this.addChild(PixiFactory.getText(this._type));
    }
}
