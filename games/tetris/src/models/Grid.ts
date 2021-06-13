import { Tile } from "./Tile";

export class Grid {
    private _maxCols: number;
    private _maxRows: number;
    private _grid: Tile[][];

    public constructor(cols: number = 10, rows: number = 20) {
        this._grid = [];
        this._maxCols = cols;
        this._maxRows = rows;

        this._generateEmptyGrid();
    }

    public removeRow(index: number): Tile[] {
        const removedRow: Tile[] = this.getRow(index);
        this._grid.splice(index, 1);

        this._insertNewEmpytRow(0);

        return removedRow;
    }

    public getRow(index: number): Tile[] {
        return this._grid[index];
    }

    public get maxCols(): number {
        return this._maxCols;
    }

    public get maxRows(): number {
        return this._maxRows;
    }

    public isEmptyTile(col: number, row: number): Boolean {
        return this._grid[row][col] == null;
    }

    public setTile(tile: Tile, col: number, row: number): void {
        this._grid[row][col] = tile;
    }

    public getTile(col: number, row: number): Tile {
        return this._grid[row][col] || null;
    }

    private _generateEmptyGrid(): void {
        let line: Tile[];
        for (let row = 0; row < this._maxRows; row++) {
            line = [];
            for (let col = 0; col < this._maxCols; col++) {
                line.push(null);
            }
            this._grid.push(line);
        }
    }

    private _insertNewEmpytRow(index: number): void {
        const newRow: Tile[] = [];
        for (let i = 0; i < this._maxCols; i++) {
            newRow.push(null);
        }
        this._grid.splice(index, 0, newRow);
    }
}
