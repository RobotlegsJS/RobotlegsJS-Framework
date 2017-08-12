import { GridData } from "./GridData";
import { Cell } from "./Cell";

export class LevelModel {
    private _numMines: number;
    public get numMines(): number {
        return this._numMines;
    }

    private _grid: GridData;
    public get grid(): GridData {
        return this._grid;
    }

    private _mines: Array<Cell>;
    public get mines(): Array<Cell> {
        return this._mines;
    }

    private _open: Array<Cell>;
    public get open(): Array<Cell> {
        return this._open;
    }

    constructor() {
        this._mines = new Array<Cell>();
        this._open = new Array<Cell>();
    }

    public setNumMines(value: number) {
        this._numMines = value;
    }

    public setGrid(grid: GridData) {
        this._grid = grid;
    }
}
