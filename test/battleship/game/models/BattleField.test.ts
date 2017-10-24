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

    context("attackShip", () => {
        it("should return null when the tile is blanked", () => {
            assert.isNull(battlefield.attackShip(0, 0));
        });

        it("should return null when the tile was hitted before", () => {
            battlefield.grid.setTileId(Tile.HITTED, 1, 1);
            assert.isNull(battlefield.attackShip(1, 1));
        });

        it("should return the ship hit by the attack", () => {
            let ship: Ship = new Ship(2);
            ship.tiles.push(new Tile(0, 1));
            ship.tiles.push(new Tile(0, 2));
            battlefield.addShip(ship);
            assert.isNotNull(battlefield.attackShip(0, 1));
        });

        it("should decrease the HP from the ship hit by the attack", () => {
            let ship: Ship = new Ship(2);
            ship.tiles.push(new Tile(0, 1));
            ship.tiles.push(new Tile(0, 2));
            battlefield.addShip(ship);
            let spy = sinon.spy(ship, "decreaseHP");

            battlefield.attackShip(0, 1);
            assert.isTrue(spy.calledOnce);
        });
    });
});
