import "../../../entry";
import { Grid } from "./../../../../src/battleship/game/models/Grid";
import { assert } from "chai";

describe("Grid", () => {
    let grid: Grid;

    beforeEach(() => {
        grid = new Grid();
    });

    afterEach(() => {
        grid = undefined;
    });

    context("constructor", () => {
        it("should store default values to maxColumn and maxRow", () => {
            let maxCols = 9;
            let maxRows = 9;
            grid = new Grid();
            assert.equal(maxCols, grid.maxCols);
            assert.equal(maxRows, grid.maxRows);
        });

        it("should store the params", () => {
            let maxCols = 3;
            let maxRows = 5;
            grid = new Grid(maxCols, maxRows);
            assert.equal(maxCols, grid.maxCols);
            assert.equal(maxRows, grid.maxRows);
        });
    });

    context("get/set tiledId", () => {
        it("should return the value 2 when the method getTileId is invoked", () => {
            let col = 2;
            let row = 2;
            let value = 2;
            grid.setTileId(value, col, row);

            assert.equal(grid.getTileId(col, row), value);
        });

        it("should return NaN when the values the method getTileId is invoked with values greater than grid", () => {
            assert.isNaN(grid.getTileId(60, 60));
        });

        it("should set the correct value when the method setTileId is invoked", () => {
            let col = 4;
            let row = 5;
            let value = 2;
            grid.setTileId(value, col, row);

            assert.equal(grid.getTileId(col, row), value);
        });
    });
});
