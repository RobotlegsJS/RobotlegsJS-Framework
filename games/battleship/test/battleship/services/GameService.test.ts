import "../../entry";
import sinon = require("sinon");
import { GameEvent } from "../../../src/battleship/events/GameEvent";
import { GameService } from "./../../../src/battleship/services/GameService";
import { EventDispatcher } from "@robotlegsjs/core";
import { assert } from "chai";

describe("GameService", () => {
    let gameService: GameService;

    beforeEach(() => {
        gameService = new GameService();
        gameService.eventDispatcher = new EventDispatcher();
    });

    afterEach(() => {
        gameService = undefined;
    });
    context("commands", () => {
        it("should dispatch the event CREATE_LEVEL_COMMAND when the method creatLevelCommand is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.createLevelCommand();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.CREATE_LEVEL_COMMAND);
        });
        it("should dispatch the event CREATE_LEVEL_COMMAND when the method retryCommand is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.retryCommand();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.CREATE_LEVEL_COMMAND);
        });
        it("should dispatch the event ENEMY_ATTACK_COMMAND when the method enemyAttackCommand is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.enemyAttackCommand();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.ENEMY_ATTACK_COMMAND);
        });
        it("should dispatch the event HERO_ATTACK_COMMAND when the method heroAttackCommand is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEvent");
            gameService.heroAttackCommand(1, 2);
            let event: GameEvent = <GameEvent>dispatcherSpy.firstCall.args[0];

            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event.type, GameEvent.HERO_ATTACK_COMMAND, "type");
            assert.equal(event.extra.col, 1, "col");
            assert.equal(event.extra.row, 2, "row");
        });
    });
    context("phase", () => {
        it("should dispatch the event ENEMY_PHASE when the method enemyPhase is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.enemyPhase();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.ENEMY_PHASE);
        });
        it("should dispatch the event HERO_PHASE when the method heroPhase is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.heroPhase();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.HERO_PHASE);
        });
    });
    context("battlefield", () => {
        it("should dispatch the event CLEAR_BATTLEFIELD when the method enemyPhase is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.clearBattleField();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.CLEAR_BATTLEFIELD);
        });
        it("should dispatch the event DRAW_BATTLEFIELD when the method heroPhase is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.drawBattleField();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.DRAW_BATTLEFIELD);
        });
        it("should dispatch the event UPDATE_BATTLEFIELD when the method heroPhase is invoked", () => {
            let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
            gameService.updateBattleField();
            let event = dispatcherSpy.firstCall.args[0];
            assert.isTrue(dispatcherSpy.calledOnce);
            assert.equal(event, GameEvent.UPDATE_BATTLEFIELD);
        });
    });
    it("DispatchEventWith", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith");
        let type = "TestDispatchEventWith";
        gameService.dispatchEventWith(type);
        let event = dispatcherSpy.firstCall.args[0];

        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, type);
    });
});
