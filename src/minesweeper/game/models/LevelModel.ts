import { GridData } from "./GridData";
import { Cell } from "./Cell";

import { injectable } from "@robotlegsjs/core";

@injectable()
export class LevelModel {

    public levelId: string;
    public numFlags: number;
    public numMines: number;

    private _grid: GridData;
    public get grid(): GridData {
        return this._grid;
    }

    private _mines: Array<Cell>;
    public get mines(): Array<Cell> {
        return this._mines;
    }

    private _update: Array<Cell>;
    public get update(): Array<Cell> {
        return this._update;
    }

    constructor() {
        this._mines = new Array<Cell>();
        this._update = new Array<Cell>();
    }

    public setGrid(grid: GridData) {
        this._grid = grid;
    }

    public reset(): void {
        this._mines = new Array<Cell>();
        this._update = new Array<Cell>();
        this.numFlags = 0;
        this.numMines = 0;
    }
}
