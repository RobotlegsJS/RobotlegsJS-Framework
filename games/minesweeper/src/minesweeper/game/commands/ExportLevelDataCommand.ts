import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { Cell } from "../models/Cell";
import { LevelModel } from "../models/LevelModel";

@injectable()
export class ExportLevelDataCommand implements ICommand {
    @inject(LevelModel)
    public levelModel: LevelModel;

    public execute(): void {
        const level = {
            levelId: this.levelModel.levelId,
            maxCols: this.levelModel.grid.maxCols,
            maxRows: this.levelModel.grid.maxRows,
            mines: {
                numMines: this.levelModel.numMines,
                positions: this._parseMines(this.levelModel.mines)
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

    public export(text: string, name: string, type: string): void {
        const a = document.createElement("a");
        const file = new Blob([text], { type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    private _parseMines(mines: Cell[]): { col: number; row: number }[] {
        const list: { col: number; row: number }[] = [];

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i: number = 0; i < mines.length; i++) {
            list.push({ col: mines[i].col, row: mines[i].row });
        }

        return list;
    }
}
