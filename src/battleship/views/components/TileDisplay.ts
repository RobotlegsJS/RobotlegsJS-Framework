import { Tile } from "../../game/models/Tile";
import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Colors } from "./../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";

import { Graphics, Container } from "pixi.js";

export class TileDisplay extends Container {
    public tileId: number;
    public tile: Tile;

    protected _background: Graphics;
    protected _ship: Graphics;
    protected _enabled: boolean;

    constructor(tileId: number, col: number, row: number) {
        super();

        this.tileId = tileId;
        this.tile = new Tile(col, row);
        this.createBackground();
    }

    public show(): void {
        if (this.tileId > 0) {
            this._ship.visible = true;
        }
    }

    public attack(): void {
        if (this.tileId > 0) {
            this.swichBackgroundColor(0xff0000, this._background);
        } else {
            this.swichBackgroundColor(0x66aaaa, this._background);
        }
    }

    protected createBackground(): void {
        this._background = new Graphics();
        this.addChild(this._background);
        this.swichBackgroundColor(Colors.TILE_BACKGROUND, this._background);

        this._ship = new Graphics();
        this._ship.visible = false;
        this.addChild(this._ship);
        this.swichBackgroundColor(0xff0000, this._ship);
        this._ship.alpha = 0.5;
    }

    protected swichBackgroundColor(color: number, graphic: Graphics): void {
        graphic.clear();
        graphic.beginFill(color);
        graphic.drawRoundedRect(0, 0, MagicValues.TILE_WIDTH - 1, MagicValues.TILE_HEIGHT - 1, 5);
        graphic.pivot.x = graphic.width * 0.5;
        graphic.pivot.y = graphic.height * 0.5;
    }
}
