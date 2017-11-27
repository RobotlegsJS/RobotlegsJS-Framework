import { Texts } from "../../../../src/minesweeper/utils/Texts";
import { CustomLevelModel } from "./../../../../src/minesweeper/game/models/CustomLevelModel";
import { Cell } from "./../../../../src/minesweeper/game/models/Cell";
import { GridUtils } from "./../../../../src/minesweeper/game/utils/GridUtils";
import { LevelUtils } from "./../../../../src/minesweeper/game/utils/LevelUtils";
import { GridData } from "../../../../src/minesweeper/game/models/GridData";
import { LevelModel } from "./../../../../src/minesweeper/game/models/LevelModel";
import { assert } from "chai";

describe("LevelUtils", () => {
    let level: LevelModel;

    beforeEach(() => {
        level = new LevelModel();
        level.setGrid(new GridData());
    });

    afterEach(() => {
        level = undefined;
    });

    it("GenerateBeginnerLevel:", () => {
        LevelUtils.generateBeginnerLevel(level);
        assert.equal(level.grid.maxCols, 9);
        assert.equal(level.grid.maxRows, 9);
        assert.equal(level.levelId, Texts.EASY);
    });

    it("GenerateBeginnerLevel: NumMines", () => {
        LevelUtils.generateBeginnerLevel(level);
        assert.equal(level.numMines, 10);
        assert.equal(level.mines.length, 10);
    });

    it("GenerateNormalLevel:", () => {
        LevelUtils.generateNormalLevel(level);
        assert.equal(level.grid.maxCols, 12);
        assert.equal(level.grid.maxRows, 12);
        assert.equal(level.levelId, Texts.NORMAL);
    });

    it("GenerateNormalLevel: NumMines", () => {
        LevelUtils.generateNormalLevel(level);
        assert.equal(level.numMines, 15);
        assert.equal(level.mines.length, 15);
    });

    it("GenerateHardLevel:", () => {
        LevelUtils.generateHardLevel(level);
        assert.equal(level.grid.maxCols, 13);
        assert.equal(level.grid.maxRows, 16);
        assert.equal(level.levelId, Texts.HARD);
    });

    it("GenerateHardLevel: NumMines", () => {
        LevelUtils.generateHardLevel(level);
        assert.equal(level.numMines, 18);
        assert.equal(level.mines.length, 18);
    });

    it("GenerateCustomLevel:", () => {
        let custom: CustomLevelModel = new CustomLevelModel();
        custom.maxCols = 7;
        custom.maxRows = 8;
        custom.numMines = 13;
        LevelUtils.generateCustomLevel(level, custom);
        assert.equal(level.grid.maxCols, 7);
        assert.equal(level.grid.maxRows, 8);
        assert.equal(level.levelId, Texts.CUSTOM);
    });

    it("GenerateCustomLevel: NumMines", () => {
        let custom: CustomLevelModel = new CustomLevelModel();
        custom.maxCols = 7;
        custom.maxRows = 8;
        custom.numMines = 13;
        LevelUtils.generateCustomLevel(level, custom);
        assert.equal(level.numMines, 13);
        assert.equal(level.mines.length, 13);
    });

    it("SetMine: ", () => {
        let col = 4;
        let row = 3;
        let cell: Cell = level.grid.getCell(col, row);
        LevelUtils.setMine(level, cell);

        let mine: Cell = level.grid.getCell(col, row);

        assert.isTrue(mine.isMine());
        assert.equal(col, mine.col);
        assert.equal(row, mine.row);
    });

    it("SetMine: Setting a single mine and updating the neighbor's value ", () => {
        let col = 4;
        let row = 3;
        let cell: Cell = level.grid.getCell(col, row);
        LevelUtils.setMine(level, cell);

        let neighbors: Array<Cell> = GridUtils.getNeighbors(level.grid, cell);
        let result = true;
        for (let i = 0; i < neighbors.length; i++) {
            result = result && neighbors[i].value === 1;
        }
        assert.isTrue(result);
    });

    it("SetMine: Setting two mine (near) and updating the neighbor's value", () => {
        // First Mine
        let col1 = 4;
        let row1 = 3;
        let mine1: Cell = level.grid.getCell(col1, row1);
        LevelUtils.setMine(level, mine1);

        // Second Mine
        let col2 = 6;
        let row2 = 3;
        let mine2: Cell = level.grid.getCell(col2, row2);
        LevelUtils.setMine(level, mine2);

        let neighbors1: Array<Cell> = GridUtils.getNeighbors(level.grid, mine1);
        let neighbors2: Array<Cell> = GridUtils.getNeighbors(level.grid, mine2);
        let totalIntersectNeighbors = 3;
        let count = 0;
        for (let i = 0; i < neighbors1.length; i++) {
            if (neighbors2.indexOf(neighbors1[i]) !== -1 && neighbors1[i].value === 2) {
                count++;
            }
        }
        assert.equal(totalIntersectNeighbors, count);
    });
});
