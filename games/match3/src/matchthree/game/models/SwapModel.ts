import { injectable } from "@robotlegsjs/core";
import { Tile } from "./Tile";
import { TouchPhase } from "./TouchPhase";

@injectable()
export class SwapModel {
    public static SWAP: string = "swap";
    public static WAIT: string = "wait";
    public static ROLLBACK: string = "rollback";
    public static VALIDATE: string = "validate";
    public static HORIZONTAL: string = "horizontal";
    public static VERTICAL: string = "vertical";

    public status: string;

    private _first: Tile;
    private _second: Tile;
    private _maxCols: number;
    private _maxRows: number;

    public constructor() {
        this._first = new Tile();
        this._second = new Tile();
    }

    public setMaxValues(maxCols: number, maxRows: number): void {
        this._maxCols = maxCols;
        this._maxRows = maxRows;
    }

    public setPosition(phase: string, col: number, row: number): void {
        let position: Tile;
        position = TouchPhase.BEGAN === phase ? this.first : this._second;
        position.col = this._solveRanger(col, this._maxCols);
        position.row = this._solveRanger(row, this._maxRows);
    }

    public get swapDirection(): string {
        return this.first.col === this.second.col ? SwapModel.VERTICAL : SwapModel.HORIZONTAL;
    }

    public get first(): Tile {
        return this._first;
    }

    public get second(): Tile {
        return this._second;
    }

    public updateStatus(): void {
        this.status = this.status === SwapModel.SWAP ? SwapModel.VALIDATE : "";
    }

    private _solveRanger(value: number, max: number): number {
        return Math.max(Math.min(value, max - 1), 0);
    }
}
