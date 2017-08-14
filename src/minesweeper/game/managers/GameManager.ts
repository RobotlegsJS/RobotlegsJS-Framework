import { CustomLevelModel } from "../models/CustomLevelModel";
import { GridUtils } from "../utils/GridUtils";
import { Texts } from "../../utils/Texts";
import { Cell } from "../models/Cell";
import { GameService } from "./../../services/GameService";
import { LevelUtils } from "../utils/LevelUtils";
import { LevelModel } from "./../models/LevelModel";

import { injectable, inject } from "@robotlegsjs/core";

@injectable()
export class GameManager {

    @inject(LevelModel)
    public level: LevelModel;

    @inject(CustomLevelModel)
    public customLevel: CustomLevelModel;

    @inject(GameService)
    public gameService: GameService;

    public generateGrid(levelId) {
        if (levelId === Texts.EASY) {
            LevelUtils.generateBeginnerLevel(this.level);
        } else if (levelId === Texts.NORMAL) {
            LevelUtils.generateNormalLevel(this.level);
        } else if (levelId === Texts.HARD) {
            LevelUtils.generateHardLevel(this.level);
        } else if (levelId === Texts.CUSTOM) {
            LevelUtils.generateCustomLevel(this.level, this.customLevel);
        }
    }

    public reveal(cell: Cell): void {
        if (cell.isMine()) {
            this.level.update.push(cell);
            this.gameService.updateGridField();
            this.gameService.gameOver();
            this.gameService.gameOverCommand();
        } else {
            this.floodFill(cell);
            this.gameService.updateGridField();

            if (this.isFinished()) {
                this.gameService.gameOverCommand();
            }
        }
    }

    public isFinished(): boolean {
        let totalCells = this.level.grid.maxCols * this.level.grid.maxRows;

        return (totalCells === (this.level.numMines + this.level.update.length));
    }

    public floodFill(cell: Cell): void {
        if (this.level.update.indexOf(cell) === -1) {
            this.level.update.push(cell);
            if (cell.value === 0 && !cell.isMine()) {
                let neighbour: Array<Cell> = GridUtils.getNeighbors(this.level.grid, cell);
                for (let i = 0; i < neighbour.length; i++) {
                    if (!neighbour[i].isMine()) {
                        this.floodFill(neighbour[i]);
                    }
                }
            }
        }
    }

    public flag(cell: Cell): void {
        if (!cell.isFlag) {
            cell.isFlag = true;
            this.level.numFlags -= 1;
            this.gameService.updateGridField();
            this.gameService.updateHUDData();
        }
    }
}
