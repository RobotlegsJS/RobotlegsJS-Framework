import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { Cell } from "../models/Cell";
import { LevelModel } from "./../models/LevelModel";

@injectable()
export class ExportLevelDataCommand implements ICommand {
    @inject(LevelModel) public levelModel: LevelModel;

    public execute(): void {
        const level = {
            levelId: this.levelModel.levelId,
            maxCols: this.levelModel.grid.maxCols,
            maxRows: this.levelModel.grid.maxRows,
            mines: {
                numMines: this.levelModel.numMines,
                positions: this.parseMines(this.levelModel.mines)
            }
        };
        const fileName =
            level.levelId +
            "_" +
            level.maxCols +
            "_" +
            level.maxRows +
            "_" +
            this.levelModel.numMines +
            ".json";
        this.export(JSON.stringify(level), fileName, "text/plain");
    }
    public export(text, name, type) {
        const a = document.createElement("a");
        const file = new Blob([text], { type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }
    private parseMines(mines: Cell[]): Array<{ col; row }> {
        const list: Array<{ col; row }> = new Array<{ col; row }>();
        for (let i = 0; i < mines.length; i++) {
            list.push({ col: mines[i].col, row: mines[i].row });
        }
        return list;
    }
}
