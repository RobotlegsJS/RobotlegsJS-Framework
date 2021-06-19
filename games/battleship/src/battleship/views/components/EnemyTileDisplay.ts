import { TileDisplay } from "./TileDisplay";

export class EnemyTileDisplay extends TileDisplay {
    private _enabled: boolean;

    public set enabled(value: boolean) {
        this.interactive = value;
        this.buttonMode = value;
        this._enabled = value;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public constructor(tileId: number, col: number, row: number) {
        super(tileId, col, row);
        this.enabled = true;
    }
}
