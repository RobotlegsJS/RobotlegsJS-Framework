import "../../../entry";
import { Tile } from "./../../../../src/battleship/game/models/Tile";
import { assert } from "chai";

describe("Tile", () => {
    context("constructor", () => {
        it("should store the params", () => {
            let col = 5;
            let row = 3;
            let tile = new Tile(col, row);
            assert.equal(col, tile.col);
            assert.equal(row, tile.row);
        });

        it("should store default values to column and row", () => {
            let tile = new Tile();
            assert.equal(0, tile.col);
            assert.equal(0, tile.row);
        });
    });
});
