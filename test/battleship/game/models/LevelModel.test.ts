import { Player } from "./../../../../src/battleship/game/models/Player";
import "../../../entry";
import { LevelModel } from "../../../../src/battleship/game/models/LevelModel";
import { assert } from "chai";

describe("AttackEvent", () => {
    let levelModel: LevelModel = new LevelModel();

    beforeEach(() => {
        levelModel = new LevelModel();
    });

    afterEach(() => {
        levelModel = undefined;
    });

    context("constructor", () => {
        it("should instantiate a enemy and hero", () => {
            assert.instanceOf(levelModel.enemy, Player);
            assert.instanceOf(levelModel.hero, Player);
        });

        it("should set the turn to HUMAN", () => {
            assert.equal(levelModel.turn, Player.HUMAN);
        });
    });
});
