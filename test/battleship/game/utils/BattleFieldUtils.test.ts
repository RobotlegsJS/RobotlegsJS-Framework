import "../../../entry";
import sinon = require("sinon");
import { Tile } from "./../../../../src/battleship/game/models/Tile";
import { BattleField } from "./../../../../src/battleship/game/models/BattleField";
import { BattleFieldUtils } from "../../../../src/battleship/game/utils/BattleFieldUtils";
import { assert } from "chai";

describe("BattleFieldUtils", () => {
    let battleField: BattleField;

    beforeEach(() => {
        battleField = BattleFieldUtils.generateBattleField();
    });

    afterEach(() => {
        battleField = undefined;
    });

    context("generateBattleField", () => {
        it("should return a instance of battlefield", () => {
            battleField = BattleFieldUtils.generateBattleField();
            assert.isNotNull(battleField);
            assert.isDefined(battleField);
        });

        it("should generate a full battlefield with five ships", () => {
            battleField = BattleFieldUtils.generateBattleField();
            assert.equal(battleField.ships.length, 5);
        });
    });

    context("isTileEmpty", () => {
        it("should return true when the tile is blanked", () => {
            battleField.grid.setTileId(Tile.BLANKED, 0, 1);
            assert.equal(battleField.grid.getTileId(0, 1), Tile.BLANKED);
        });

        it("should return false when the tile is not empty", () => {
            battleField.grid.setTileId(1, 0, 1);
            assert.notEqual(battleField.grid.getTileId(0, 1), Tile.BLANKED);
        });
    });
    context("getValidTileList", () => {
        it("should return an array with all tiles of the grid", () => {
            let list = BattleFieldUtils.getValidTileList(battleField);
            let gridSize = battleField.grid.maxCols * battleField.grid.maxRows;
            assert.equal(list.length, gridSize);
        });
        it("should return an array with all tiles of the grid except the tiles with the tileId equal to HITTED", () => {
            battleField.attackTile(0, 0);
            battleField.attackTile(0, 1);
            battleField.attackTile(0, 2);
            battleField.attackTile(0, 3);
            let list = BattleFieldUtils.getValidTileList(battleField);
            let gridSize = battleField.grid.maxCols * battleField.grid.maxRows;
            assert.equal(list.length, gridSize - 4);
        });
    });
    it("should set the tiles into a new Ship and add the ship to the battlefield", () => {
        let tiles: Tile[] = new Array<Tile>();
        tiles.push(new Tile(0, 0));
        tiles.push(new Tile(0, 1));
        tiles.push(new Tile(0, 2));

        BattleFieldUtils.addShipByTiles(battleField, tiles);

        assert.notEqual(battleField.grid.getTileId(0, 0), Tile.BLANKED);
        assert.notEqual(battleField.grid.getTileId(0, 1), Tile.BLANKED);
        assert.notEqual(battleField.grid.getTileId(0, 2), Tile.BLANKED);
    });

    /*
    TODO: addRandomShipToBattleField
    TODO: addShipByTiles
    */
});
