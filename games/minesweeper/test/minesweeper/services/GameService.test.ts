import { EventDispatcher } from "@robotlegsjs/core";
import { assert } from "chai";
import { GameEvent } from "../../../src/minesweeper/events/GameEvent";
import { GameStatus } from "../../../src/minesweeper/game/models/GameStatus";
import { GameService } from "../../../src/minesweeper/services/GameService";
import { Texts } from "../../../src/minesweeper/utils/Texts";
import "../../entry";

import sinon = require("sinon");

describe("GameService", () => {
    let gameService: GameService;

    beforeEach(() => {
        gameService = new GameService();
        gameService.eventDispatcher = new EventDispatcher();
        gameService.gameStatus = new GameStatus();
    });

    afterEach(() => {
        gameService = undefined;
    });

    it("DispatchEventWith", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        let type = "TestDispatchEventWith";
        gameService.dispatchEventWith(type);
        let event = dispatcherSpy.firstCall.args[0];

        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, type);
    });

    it("RetryCommand", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.retryCommand();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, GameEvent.RETRY_GAME_COMMAND);
    });

    it("GameOverCommand", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.gameOverCommand();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, GameEvent.GAME_OVER_COMMAND);
    });

    it("ExportLevelDataCommand", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.exportLevelDataCommand();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, GameEvent.EXPORT_LEVEL_DATA_COMMAND);
    });

    it("UpdateHUDData", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.updateHUDData();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, GameEvent.UPDATE_HUD_DATA);
    });

    it("ClearGridField", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.clearGridField();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, GameEvent.CLEAR_GRID);
    });

    it("UpdateGridField", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.updateGridField();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event, GameEvent.UPDATE_GRID);
    });

    it("Pause", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.pause();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.isTrue(gameService.gameStatus.isPaused);
        assert.equal(event, GameEvent.PAUSE);
    });

    it("resume", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEventWith" as any);
        gameService.resume();
        let event = dispatcherSpy.firstCall.args[0];
        assert.isTrue(dispatcherSpy.calledOnce);
        assert.isFalse(gameService.gameStatus.isPaused);
        assert.equal(event, GameEvent.RESUME);
    });

    it("Start", () => {
        gameService.start();
        assert.isFalse(gameService.gameStatus.isGameOver);
    });

    it("GameOver", () => {
        gameService.gameOver();
        assert.isTrue(gameService.gameStatus.isGameOver);
    });

    it("CreateLevelCommand", () => {
        let dispatcherSpy = sinon.spy(gameService.eventDispatcher, "dispatchEvent" as any);
        let leveId = Texts.EASY;
        gameService.createLevel(leveId);
        let event: GameEvent = <GameEvent>dispatcherSpy.firstCall.args[0];

        assert.isTrue(dispatcherSpy.calledOnce);
        assert.equal(event.type, GameEvent.CREATE_LEVEL_COMMAND, "type");
        assert.equal(event.extra.levelId, leveId, "levelId");
    });
});
