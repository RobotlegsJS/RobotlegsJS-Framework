import "../../../entry";
import { Tile } from "./../../../../src/battleship/game/models/Tile";
import { Ship } from "./../../../../src/battleship/game/models/Ship";
import { assert } from "chai";

describe("Ship", () => {
    let ship: Ship;

    beforeEach(() => {
        ship = new Ship(3);
    });

    afterEach(() => {
        ship = undefined;
    });

    context("constructor", () => {
        it("should store the params", () => {
            let size = 4;
            ship = new Ship(size);
            assert.equal(ship.hp, size);
            assert.equal(ship.size, size);
        });
    });

    context("decreaseHP", () => {
        it("should return the current HP less one", () => {
            let hp = ship.hp - 1;
            ship.decreaseHP();
            assert.equal(hp, ship.hp);
        });

        it("cannot be below than zero", () => {
            ship = new Ship(0);
            ship.decreaseHP();
            assert.equal(0, ship.hp);
        });
    });

    context("setTiles", () => {
        it("should set the array of tiles", () => {
            let tiles = new Array<Tile>();
            tiles.push(new Tile(0, 0));
            tiles.push(new Tile(0, 1));
            tiles.push(new Tile(0, 2));
            ship.setTiles(tiles);
            assert.deepEqual(tiles, ship.tiles);
        });

        it("should update the size and hp based on the tiles length", () => {
            let tiles = new Array<Tile>();
            tiles.push(new Tile(0, 0));
            tiles.push(new Tile(0, 1));
            tiles.push(new Tile(0, 2));
            tiles.push(new Tile(0, 3));
            ship.setTiles(tiles);
            assert.equal(tiles.length, ship.hp);
            assert.equal(tiles.length, ship.size);
        });
    });
});
