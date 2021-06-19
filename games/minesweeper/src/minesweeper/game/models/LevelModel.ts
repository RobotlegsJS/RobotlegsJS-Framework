import { injectable } from "@robotlegsjs/core";
import { Cell } from "./Cell";
import { GridData } from "./GridData";

@injectable()
export class LevelModel {
    public levelId: string;
    public numFlags: number;
    public numMines: number;
    public numClicks: number;
    public clock: number;

    private _grid: GridData;
    public get grid(): GridData {
        return this._grid;
    }

    private _mines: Cell[];
    public get mines(): Cell[] {
        return this._mines;
    }

    private _update: Cell[];
    public get update(): Cell[] {
        return this._update;
    }

    public constructor() {
        this.reset();
    }

    public setGrid(grid: GridData): void {
        this._grid = grid;
    }

    public reset(): void {
        this._mines = new Array<Cell>();
        this._update = new Array<Cell>();
        this.numFlags = 0;
        this.numMines = 0;
        this.clock = 0;
        this.numClicks = 0;
    }
}
