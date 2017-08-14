import { Cell } from "../models/Cell";
import { LevelModel } from "./../models/LevelModel";
import { CustomLevelModel } from "./../models/CustomLevelModel";
import { injectable, inject, ICommand } from "@robotlegsjs/core";

@injectable()
export class ExportLevelDataCommand implements ICommand {

    @inject(LevelModel)
    public levelModel: LevelModel;

    public execute(): void {
        let level = {
            levelId: this.levelModel.levelId,
            maxCols: this.levelModel.grid.maxCols,
            maxRows: this.levelModel.grid.maxRows,
            mines: {
                numMines: this.levelModel.numMines,
                positions: this.parseMines(this.levelModel.mines)
            }
        };
        let fileName = level.levelId + "_" + level.maxCols + "_" + level.maxRows + "_" + this.levelModel.numMines + ".json";
        this.download(JSON.stringify(level), fileName, "text/plain");
    }

    public download(text, name, type) {
        let a = document.createElement("a");
        let file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    private parseMines(mines: Array<Cell>): Array<{ col, row }> {
        let list: Array<{ col, row }> = new Array<{ col, row }>();
        for (let i = 0; i < mines.length; i++) {
            list.push({ col: mines[i].col, row: mines[i].row });
        }
        return list;
    }
}
