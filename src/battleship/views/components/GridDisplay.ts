import { EnemyTileDisplay } from "./EnemyTileDisplay";
import { Player } from "./../../game/models/Player";
import { MagicValues } from "../../utils/MagicValues";
import { Tile } from "./../../game/models/Tile";
import { IsoUtils } from "../../utils/IsoUtils";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Grid } from "../../game/models/Grid";
import { TileDisplay } from "./TileDisplay";
import { Container } from "pixi.js";
export class GridDisplay extends Container {
    private _displays: Map<string, TileDisplay>;
    private _type: string;
    private _background: Container;
    public set focus(value: boolean) {
        this._background.visible = value;
    }
    constructor(type: string = Player.HERO) {
        super();

        this._displays = new Map<string, TileDisplay>();
        this._type = type;
    }
    public clear(): void {
        this._displays.clear();
        this.removeChildren();
    }
    public updateGrid(grid): void {
        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let display: TileDisplay = this._displays.get(this.getKey(col, row));
                if (grid.getTileId(col, row) === Tile.HITTED) {
                    display.attack();
                }
            }
        }
    }
    public drawGrid(grid: Grid): void {
        this.clear();
        this.createBackground(grid.maxCols, grid.maxRows);

        for (let row = 0; row < grid.maxRows; row++) {
            for (let col = 0; col < grid.maxCols; col++) {
                let tileId = grid.getTileId(col, row);
                let positions = IsoUtils.toIso(col, row);
                let display: TileDisplay;
                if (this._type === Player.HERO) {
                    display = new TileDisplay(tileId, col, row);
                } else if (this._type === Player.ENEMY) {
                    display = new EnemyTileDisplay(tileId, col, row);
                }
                display.x = positions.x;
                display.y = positions.y;
                this.addChild(display);
                this._displays.set(this.getKey(col, row), display);
            }
        }
    }
    public getDisplay(col: number, row: number): TileDisplay {
        const key = this.getKey(col, row);
        return this._displays.get(key);
    }
    private getKey(col: number, row: number): string {
        return `${col}_${row}`;
    }
    private createBackground(maxCols: number, maxRows: number): void {
        let length = MagicValues.TILE_WIDTH * maxCols + 2;
        this._background = PixiFactory.getIsometricBackground(length, 0x00aa00);
        this._background.y = 3;
        this._background.visible = false;
        this.addChild(this._background);

        let isoBackground = PixiFactory.getIsometricBackground(length, 0x000000);
        this.addChild(isoBackground);
    }
}
