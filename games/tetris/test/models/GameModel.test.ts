import { assert } from "chai";
import { GameModel } from "../../src/models/GameModel";
import "../entry";

describe("GameModel", () => {
    it("Clear: Returns the values to default", () => {
        let model: GameModel = new GameModel();
        model.clear();
        let result = model.level === 1 && model.lines === 0 && model.score === 0;
        assert.isTrue(result);
    });
});
