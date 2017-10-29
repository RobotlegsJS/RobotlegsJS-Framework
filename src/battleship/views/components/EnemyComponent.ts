import { ShipDisplay } from "./ShipDisplay";
import { IsoUtils } from "./../../utils/IsoUtils";
import { Ship } from "../../game/models/Ship";
import { Colors } from "../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Container, Graphics, Sprite } from "pixi.js";
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

        this._background = PixiFactory.getIsometricBackground(length, 0x00aa00);
        this._background.visible = false;
        this._background.x = 200;
        this._background.y = 53;
        this.addChild(this._background);

        let isobg = PixiFactory.getIsometricBackground(length, 0x000000);
        isobg.x = 200;
        isobg.y = 50;
        this.addChild(isobg);

        this._field = new Container();
        this._field.x = 200;
        this._field.y = 50;
        this.addChild(this._field);
    }
    public createShip(ship: Ship): Sprite {
        let shipDisplay = new ShipDisplay(ship);
        shipDisplay.visible = false;
        this.field.addChild(shipDisplay);
        return shipDisplay;
    }
    private setupTexts(): void {
        let title = PixiFactory.getText(this._type);
        title.x = 10;
        title.y = 10;
        this.addChild(title);
    }
}
