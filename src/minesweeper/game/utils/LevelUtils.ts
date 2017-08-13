import { GridUtils } from "./GridUtils";
import { Cell } from "./../models/Cell";
import { GridData } from "../models/GridData";
import { LevelModel } from "./../models/LevelModel";

export class LevelUtils {
    public static generateBeginnerLevel(level: LevelModel): void {
        level.numMines = 10;
        level.numFlags = 10;
        level.setGrid(new GridData(9, 9));
        this.generateMines(level, level.numMines);
    }
    public static generateNormalLevel(level: LevelModel): void {
        level.numMines = 13;
        level.numFlags = 13;
        level.setGrid(new GridData(12, 12));
        this.generateMines(level, level.numMines);
    }
    public static generateHardLevel(level: LevelModel): void {
        level.numMines = 16;
        level.numFlags = 16;
        level.setGrid(new GridData(13, 16));
        this.generateMines(level, level.numMines);
    }

    public static generateMines(level: LevelModel, numMines: number): void {
        while (level.numMines !== level.mines.length) {
            let rndCol: number = Math.floor(Math.random() * level.grid.maxCols);
            let rndRow: number = Math.floor(Math.random() * level.grid.maxRows);
            let cell: Cell = level.grid.getCell(rndCol, rndRow);
            if (!cell.isMine()) {
                this.setMine(level, cell);
            }
        }
    }

    public static setMine(level: LevelModel, cell: Cell) {
        cell.setCellAsAMine();
        level.mines.push(cell);
        level.grid.setCell(cell);

        let neighbors: Array<Cell> = GridUtils.getNeighbors(level.grid, cell);
        for (let i = 0; i < neighbors.length; i++) {
            neighbors[i].increaseValue();
        }
    }
}
