import { inject, injectable } from "@robotlegsjs/core";
import { Texts } from "../../utils/Texts";
import { Cell } from "../models/Cell";
import { CustomLevelModel } from "../models/CustomLevelModel";
import { GridUtils } from "../utils/GridUtils";
import { LevelUtils } from "../utils/LevelUtils";
import { GameService } from "./../../services/GameService";
import { LevelModel } from "./../models/LevelModel";

@injectable()
export class GameManager {
    @inject(LevelModel)
    public level: LevelModel;

    @inject(CustomLevelModel)
    public customLevel: CustomLevelModel;

    @inject(GameService)
    public gameService: GameService;

    public generateGrid(levelId: string): void {
        if (levelId === Texts.CUSTOM) {
            LevelUtils.generateCustomLevel(this.level, this.customLevel);
        } else if (levelId === Texts.HARD) {
            LevelUtils.generateHardLevel(this.level);
        } else if (levelId === Texts.NORMAL) {
            LevelUtils.generateNormalLevel(this.level);
        } else {
            LevelUtils.generateBeginnerLevel(this.level);
        }
    }

    public reveal(cell: Cell): void {
        if (cell.isMine() === true) {
            this.level.update.push(cell);
            this.invokeGameOver();
        } else {
            this.level.numClicks += 1;
            this.floodFill(cell);
            this.gameService.updateGridField();

            if (this.isFinished() === true) {
                this.invokeYouWin();
            }
        }
    }

    public invokeGameOver(): void {
        this.gameService.updateGridField();
        this.gameService.gameOver();
        this.gameService.gameOverCommand();
    }

    public invokeYouWin(): void {
        this.gameService.gameOverCommand();
    }

    public isFinished(): boolean {
        const totalCells = this.level.grid.maxCols * this.level.grid.maxRows;

        return totalCells === this.level.numMines + this.level.update.length;
    }

    public floodFill(cell: Cell): void {
        if (this.level.update.indexOf(cell) === -1) {
            this.level.update.push(cell);
            if (cell.value === 0 && cell.isMine() === false) {
                const neighbour: Cell[] = GridUtils.getNeighbors(this.level.grid, cell);
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < neighbour.length; i++) {
                    if (neighbour[i].isMine() === false) {
                        this.floodFill(neighbour[i]);
                    }
                }
            }
        }
    }

    public flag(cell: Cell): void {
        if (!cell.isFlag) {
            this.level.numFlags -= 1;
        }
        cell.isFlag = true;
        this.gameService.updateGridField();
        this.gameService.updateHUDData();
    }
}
