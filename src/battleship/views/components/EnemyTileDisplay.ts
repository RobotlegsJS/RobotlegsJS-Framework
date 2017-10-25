import { TileDisplay } from "./TileDisplay";

export class EnemyTileDisplay extends TileDisplay {
    public set enabled(value) {
        this.interactive = value;
        this.buttonMode = value;
        this._enabled = value;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    constructor(tileId: number, col: number, row: number) {
        super(tileId, col, row);
        this.enabled = true;
    }
}
