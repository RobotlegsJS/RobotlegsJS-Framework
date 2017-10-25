import { DoubleText } from "./DoubleText";
import { Colors } from "../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Container, Graphics } from "pixi.js";
export class HeroComponent extends Container {
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

    public get background(): Graphics {
        return this._background;
    }

    constructor(type: string) {
        super();
        this._type = type;

        this.setupBackground();
        this.setupTexts();
    }

    public setupBackground(): void {
        this._background = PixiFactory.getColorBoxRounded(
            MagicValues.MAX_WIDTH,
            MagicValues.HALF_HEIGHT - 50,
            0x000000
        );
        this._background.visible = false;
        this.addChild(this._background);

        this._field = new Container();
        this._field.x = 20;
        this._field.y = 50;
        this.addChild(this._field);
    }

    private setupTexts(): void {
        this._doubleTexts = new Array<DoubleText>();
        for (let i = 0; i < 5; i++) {
            let doubleText: DoubleText = new DoubleText("0", "0");
            doubleText.x = 210;
            doubleText.y = i * 40 + 40;
            this.addChild(doubleText);
            this._doubleTexts.push(doubleText);
        }

        this.addChild(PixiFactory.getText(this._type));
    }
}
