import { Cell } from "./Cell";

export class GridData {
    private _maxCols: number;
    private _maxRows: number;

    private _grid: Cell[][];

    public get maxRows(): number {
        return this._maxRows;
    }
    public get maxCols(): number {
        return this._maxCols;
    }

    constructor(maxCols = 9, maxRows = 9) {
        this._grid = new Array<Cell[]>();
        this._maxCols = maxCols;
        this._maxRows = maxRows;
        this.generateEmptyGrid();
    }
    public getCell(col: number, row: number): Cell {
        if (col < this._maxCols && row < this._maxRows && col >= 0 && row >= 0) {
            return this._grid[row][col];
        }
        return undefined;
    }
    public setCell(cell: Cell): void {
        this._grid[cell.row][cell.col] = cell;
    }
    private generateEmptyGrid(): void {
        let line: Cell[];
        for (let row = 0; row < this._maxRows; row++) {
            line = new Array<Cell>();
            for (let col = 0; col < this._maxCols; col++) {
                line.push(new Cell(col, row));
            }
            this._grid.push(line);
        }
    }
}
