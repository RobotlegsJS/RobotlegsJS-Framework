import { assert } from "chai";
import { Cell } from "../../../../src/minesweeper/game/models/Cell";
import { GridData } from "../../../../src/minesweeper/game/models/GridData";
import { GridUtils } from "../../../../src/minesweeper/game/utils/GridUtils";
import "../../../entry";

describe("GridUtils", () => {
    let grid: GridData;

    beforeEach(() => {
        grid = new GridData(9, 9);
    });

    afterEach(() => {
        grid = undefined;
    });

    it("GetNeighbors", () => {
        let col = 4;
        let row = 3;
        let cell: Cell = grid.getCell(col, row);

        let neighbors: Cell[] = new Array<Cell>();
        neighbors.push(grid.getCell(col - 1, row - 1));
        neighbors.push(grid.getCell(col, row - 1));
        neighbors.push(grid.getCell(col + 1, row - 1));

        neighbors.push(grid.getCell(col - 1, row));
        neighbors.push(grid.getCell(col + 1, row));

        neighbors.push(grid.getCell(col - 1, row + 1));
        neighbors.push(grid.getCell(col, row + 1));
        neighbors.push(grid.getCell(col + 1, row + 1));

        let neighborsResult: Cell[] = GridUtils.getNeighbors(grid, cell);

        let result = true;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < neighbors.length; i++) {
            result = result && neighborsResult.indexOf(neighbors[i]) !== -1;
        }

        assert.isTrue(result);
        assert.equal(neighbors.length, neighborsResult.length);
    });

    it("GetNeighbors: Corner west-north", () => {
        let col = 0;
        let row = 0;
        let cell: Cell = grid.getCell(col, row);

        let neighbors: Cell[] = new Array<Cell>();
        neighbors.push(grid.getCell(col + 1, row));
        neighbors.push(grid.getCell(col, row + 1));
        neighbors.push(grid.getCell(col + 1, row + 1));

        let neighborsResult: Cell[] = GridUtils.getNeighbors(grid, cell);
        let result = true;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < neighbors.length; i++) {
            result = result && neighborsResult.indexOf(neighbors[i]) !== -1;
        }

        assert.isTrue(result);
        assert.equal(neighbors.length, neighborsResult.length);
    });

    it("GetNeighbors: Corner north-east", () => {
        let col = grid.maxCols - 1;
        let row = 0;
        let cell: Cell = grid.getCell(col, row);

        let neighbors: Cell[] = new Array<Cell>();
        neighbors.push(grid.getCell(col - 1, row));
        neighbors.push(grid.getCell(col - 1, row + 1));
        neighbors.push(grid.getCell(col, row + 1));

        let neighborsResult: Cell[] = GridUtils.getNeighbors(grid, cell);
        let result = true;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < neighbors.length; i++) {
            result = result && neighborsResult.indexOf(neighbors[i]) !== -1;
        }

        assert.isTrue(result);
        assert.equal(neighbors.length, neighborsResult.length);
    });

    it("GetNeighbors: Corner west-south", () => {
        let col = 0;
        let row = grid.maxRows - 1;
        let cell: Cell = grid.getCell(col, row);

        let neighbors: Cell[] = new Array<Cell>();
        neighbors.push(grid.getCell(col, row - 1));
        neighbors.push(grid.getCell(col + 1, row - 1));
        neighbors.push(grid.getCell(col + 1, row));

        let neighborsResult: Cell[] = GridUtils.getNeighbors(grid, cell);
        let result = true;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < neighbors.length; i++) {
            result = result && neighborsResult.indexOf(neighbors[i]) !== -1;
        }

        assert.isTrue(result);
        assert.equal(neighbors.length, neighborsResult.length);
    });

    it("GetNeighbors: Corner south-east", () => {
        let col = grid.maxCols - 1;
        let row = grid.maxRows - 1;
        let cell: Cell = grid.getCell(col, row);

        let neighbors: Cell[] = new Array<Cell>();
        neighbors.push(grid.getCell(col, row - 1));
        neighbors.push(grid.getCell(col - 1, row - 1));
        neighbors.push(grid.getCell(col - 1, row));

        let neighborsResult: Cell[] = GridUtils.getNeighbors(grid, cell);
        let result = true;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < neighbors.length; i++) {
            result = result && neighborsResult.indexOf(neighbors[i]) !== -1;
        }

        assert.isTrue(result);
        assert.equal(neighbors.length, neighborsResult.length);
    });
});
