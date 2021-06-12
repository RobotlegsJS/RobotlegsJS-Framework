import "../../../entry";
import { Player } from "./../../../../src/battleship/game/models/Player";
import { assert } from "chai";

describe("Player", () => {
    context("constants", () => {
        it("should exist the constants HERO and ENEMY", () => {
            assert.exists(Player.HERO);
            assert.exists(Player.ENEMY);
        });
    });
});
