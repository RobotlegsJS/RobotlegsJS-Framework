import "../../../entry";
import sinon = require("sinon");
import { Tile } from "./../../../../src/battleship/game/models/Tile";
import { Ship } from "../../../../src/battleship/game/models/Ship";
import { BattleField } from "../../../../src/battleship/game/models/BattleField";
import { assert } from "chai";

describe("BattleField", () => {
    let battlefield: BattleField = new BattleField();

    beforeEach(() => {
        battlefield = new BattleField();
    });

    afterEach(() => {
        battlefield = undefined;
    });

    context("addShip", () => {
        it("should add the ship to ships array", () => {
            let ship: Ship = new Ship(3);
            battlefield.addShip(ship);
            assert.include(battlefield.ships, ship);
        });

        it("should update the grid according of ship positions", () => {
            let ship: Ship = new Ship(2);
            ship.tiles.push(new Tile(0, 1));
            ship.tiles.push(new Tile(0, 2));
            battlefield.addShip(ship);
            assert.notEqual(battlefield.grid.getTileId(0, 1), Tile.BLANKED);
            assert.notEqual(battlefield.grid.getTileId(0, 2), Tile.BLANKED);
        });
    });
});
