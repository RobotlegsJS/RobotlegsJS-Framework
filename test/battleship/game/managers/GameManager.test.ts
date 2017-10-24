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
        it("should return false when the tile has the id HITTED", () => {
            battleField.grid.setTileId(Tile.HITTED, 1, 1);
            assert.isFalse(gameManager.attack(battleField, 1, 1));
        });

        it("should return true when the tile has not the id HITTED", () => {
            battleField.grid.setTileId(Tile.BLANKED, 1, 1);
            assert.isTrue(gameManager.attack(battleField, 1, 1));
        });

        it("should dispatch a event AttackEvent.SUCCESS when a ship is hit", () => {
            let ship: Ship = battleField.ships[0];
            let dispatcherSpy = sinon.spy(gameManager.eventDispatcher, "dispatchEvent");

            gameManager.attack(battleField, ship.tiles[0].col, ship.tiles[0].row);
            let event: AttackEvent = <AttackEvent>dispatcherSpy.firstCall.args[0];

            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event.type, AttackEvent.SUCCESS, "type");
        });

        it("should dispatch a event AttackEvent.FAIL when a ship is not hit", () => {
            battleField.grid.setTileId(Tile.BLANKED, 1, 1);
            let dispatcherSpy = sinon.spy(gameManager.eventDispatcher, "dispatchEvent");

            gameManager.attack(battleField, 1, 1);
            let event: AttackEvent = <AttackEvent>dispatcherSpy.firstCall.args[0];

            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event.type, AttackEvent.FAIL, "type");
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
