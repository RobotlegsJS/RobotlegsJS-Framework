import { assert } from "chai";
import "../../../entry";
import { Player } from "./../../../../src/battleship/game/models/Player";

describe("Player", () => {
    context("constants", () => {
        it("should exist the constants HERO and ENEMY", () => {
            assert.exists(Player.HERO);
            assert.exists(Player.ENEMY);
        });
    });
});
