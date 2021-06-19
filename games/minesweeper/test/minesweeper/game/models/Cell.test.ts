import "../../../entry";

import { Cell } from "./../../../../src/minesweeper/game/models/Cell";
import { assert } from "chai";

describe("Cell", () => {
    let cell: Cell;

    beforeEach(() => {
        cell = new Cell(5, 3);
    });

    afterEach(() => {
        cell = undefined;
    });

    it("Constructor: Default values", () => {
        let value = 0;
        let col = 3;
        let row = 4;

        cell = new Cell(col, row);
        assert.equal(value, cell.value);
        assert.equal(col, cell.col);
        assert.equal(row, cell.row);
    });

    it("IncreaseValue", () => {
        let newValue = cell.value + 1;
        cell.increaseValue();

        assert.equal(newValue, cell.value);
    });

    it("DecreaseValue", () => {
        cell.increaseValue();
        cell.increaseValue();
        cell.increaseValue();
        let newValue = cell.value - 1;

        cell.decreaseValue();

        assert.equal(newValue, cell.value);
    });

    it("DecreaseValue: when the value is equal to zero", () => {
        let newValue = 0;
        cell.decreaseValue();

        assert.equal(newValue, cell.value);
    });
});
