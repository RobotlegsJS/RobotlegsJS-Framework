import "../../../entry";
import sinon = require("sinon");
import { AttackEvent } from "./../../../../src/battleship/game/events/AttackEvent";
import { Ship } from "./../../../../src/battleship/game/models/Ship";
import { Tile } from "../../../../src/battleship/game/models/Tile";
import { BattleFieldUtils } from "./../../../../src/battleship/game/utils/BattleFieldUtils";
import { BattleField } from "./../../../../src/battleship/game/models/BattleField";
import { GameManager } from "../../../../src/battleship/game/managers/GameManager";
import { EventDispatcher } from "@robotlegsjs/core";
import { assert } from "chai";

describe("GameManager", () => {
    let gameManager: GameManager;
    let battleField: BattleField;
    beforeEach(() => {
        gameManager = new GameManager();
        gameManager.eventDispatcher = new EventDispatcher();
        battleField = BattleFieldUtils.generateBattleField();
    });

    afterEach(() => {
        gameManager = undefined;
        battleField = undefined;
    });

    context("attack", () => {
        it("should return FAIL when the tile hit is not a ship", () => {
            battleField.grid.setTileId(Tile.BLANKED, 1, 1);
            assert.equal(gameManager.attack(battleField, 1, 1), AttackEvent.FAIL);
        });

        it("should return SUCCESS when the tile hit is not a ship", () => {
            let ship: Ship = battleField.ships[0];
            assert.equal(gameManager.attack(battleField, ship.tiles[0].col, ship.tiles[0].row), AttackEvent.SUCCESS);
        });
        it("should return gameOver when the last ship is hit", () => {
            let result;
            for (let ship of battleField.ships) {
                for (let tile of ship.tiles) {
                    result = gameManager.attack(battleField, tile.col, tile.row);
                }
            }

            assert.equal(result, "gameOver");
        });
    });

    context("hasShips", () => {
        it("should return true if the battlefield contains a ship with hp more than zero", () => {
            assert.isTrue(gameManager.hasShips(battleField));
        });

        it("should return false when the battlefidld does not contains a ship with hp", () => {
            battleField = new BattleField();
            BattleFieldUtils.addRandomShipToBattleField(battleField, 2);
            let ship: Ship = battleField.ships[0];
            ship.decreaseHP();
            ship.decreaseHP();
            assert.isFalse(gameManager.hasShips(battleField));
        });
    });
});
