import "../../../entry";
import { Player } from "./../../../../src/battleship/game/models/Player";
import { assert } from "chai";

describe("Player", () => {
    let player: Player;

    beforeEach(() => {
        player = new Player();
    });

    afterEach(() => {
        player = undefined;
    });

    context("constants", () => {
        it("should exist the constants HUMAN and BOT", () => {
            assert.exists(Player.HUMAN);
            assert.exists(Player.BOT);
        });
    });

    context("constructor", () => {
        it("should store the params", () => {
            player = new Player(Player.HUMAN);
            assert.equal(player.type, Player.HUMAN);
        });

        it("should store default value to type", () => {
            assert.equal(player.type, Player.BOT);
        });
    });
});
