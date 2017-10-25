import { Colors } from "../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Container, Graphics } from "pixi.js";
export class EnemyComponent extends Container {
    private _background: Container;
    private _field: Container;
    private _type: string;

    public get type(): string {
        return this._type;
    }

    public get field(): Container {
        return this._field;
    }

    public get background(): Container {
        return this._background;
    }

    constructor(type: string) {
        super();
        this._type = type;

        this.setupBackground();
        this.setupTexts();
    }

    public setupBackground(): void {
        let length = MagicValues.TILE_WIDTH * 9 * 1.4 + 2;
        let graphic: Graphics = PixiFactory.getColorBoxRounded(length, length, 0x000000);
        graphic.rotation = Math.PI / 4;
        this._background = new Container();
        this._background.addChild(graphic);
        this._background.scale.y = 0.5;
        this._background.visible = false;
        this._background.x = 200;
        this._background.y = 50;
        this.addChild(this._background);

        this._field = new Container();
        this._field.x = 200;
        this._field.y = 50;
        this.addChild(this._field);
    }

    private setupTexts(): void {
        let title = PixiFactory.getText(this._type);
        title.x = 10;
        title.y = 10;
        this.addChild(title);
    }
}
