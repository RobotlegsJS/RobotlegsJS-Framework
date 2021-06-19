import { assert } from "chai";
import { GridData } from "../../../../src/minesweeper/game/models/GridData";
import "../../../entry";
import { LevelModel } from "./../../../../src/minesweeper/game/models/LevelModel";

describe("LevelModel", () => {
    let level: LevelModel;

    beforeEach(() => {
        level = new LevelModel();
        level.setGrid(new GridData());
    });

    afterEach(() => {
        level = undefined;
    });

    it("SetGrid:", () => {
        level.setGrid(new GridData());
        assert.notEqual(undefined, level.grid);
    });
});
