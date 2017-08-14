import { Cell } from "./Cell";

import { injectable } from "@robotlegsjs/core";

@injectable()
export class CustomLevelModel {

    public maxCols: number;
    public maxRows: number;
    public numMines: number;

    public mines: Array<Cell>;

    constructor() {
        this.mines = new Array<Cell>();
    }
}
