import { assert } from "chai";
import "../../../entry";
import { Cell } from "./../../../../src/minesweeper/game/models/Cell";
import { GridData } from "./../../../../src/minesweeper/game/models/GridData";

describe("GridData", () => {
    let grid: GridData;

    beforeEach(() => {
        grid = new GridData(5, 8);
    });

    afterEach(() => {
        grid = undefined;
    });

    it("Constructor: Default values", () => {
        let maxCols = 9;
        let maxRows = 9;
        grid = new GridData();
        assert.equal(maxCols, grid.maxCols);
        assert.equal(maxRows, grid.maxRows);
    });

    it("GetCell", () => {
        let col = 2;
        let row = 2;
        let cell = new Cell(col, row);
        grid.setCell(cell);
        cell = grid.getCell(col, row);

        assert.isTrue(cell.col === col && cell.row === row);
    });

    it("GetCell: Returns undefined when the values are more than grid size ", () => {
        let cell = grid.getCell(60, 60);

        assert.equal(undefined, cell);
    });

    it("SetCell", () => {
        let col = 0;
        let row = 0;
        let cell = new Cell(col, row);
        grid.setCell(cell);
        assert.deepEqual(cell, grid.getCell(col, row));
    });
});
