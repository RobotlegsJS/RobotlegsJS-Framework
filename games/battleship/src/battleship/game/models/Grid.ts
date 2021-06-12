import { Tile } from "./Tile";
export class Grid {
    private _maxCols: number;
    private _maxRows: number;

    private _grid: number[][];

    public get maxRows(): number {
        return this._maxRows;
    }

    public get maxCols(): number {
        return this._maxCols;
    }

    constructor(maxCols = 9, maxRows = 9) {
        this._grid = new Array<number[]>();
        this._maxCols = maxCols;
        this._maxRows = maxRows;
        this.generateEmptyGrid();
    }

    public getTileId(col: number, row: number): number {
        if (col < this._maxCols && row < this._maxRows && col >= 0 && row >= 0) {
            return this._grid[row][col];
        }
        return NaN;
    }

    public setTileId(tileId: number, col: number, row: number): void {
        this._grid[row][col] = tileId;
    }

    private generateEmptyGrid(): void {
        let line: number[];
        for (let row = 0; row < this._maxRows; row++) {
            line = new Array<number>();
            for (let col = 0; col < this._maxCols; col++) {
                line.push(Tile.BLANKED);
            }
            this._grid.push(line);
        }
    }
}
