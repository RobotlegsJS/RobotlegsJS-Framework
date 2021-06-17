import { injectable } from "@robotlegsjs/core";

import { Cell } from "./Cell";

@injectable()
export class CustomLevelModel {
    public maxCols: number;
    public maxRows: number;
    public numMines: number;

    public mines: Cell[];

    public constructor() {
        this.mines = [];
    }
}
