import { EventDispatcher } from "@robotlegsjs/core";
import { assert } from "chai";
import { CustomLevelModel } from "../../../../src/minesweeper/game/models/CustomLevelModel";
import { LevelUtils } from "../../../../src/minesweeper/game/utils/LevelUtils";
import "../../../entry";
import { GameManager } from "./../../../../src/minesweeper/game/managers/GameManager";
import { Cell } from "./../../../../src/minesweeper/game/models/Cell";
import { GameStatus } from "./../../../../src/minesweeper/game/models/GameStatus";
import { GridData } from "./../../../../src/minesweeper/game/models/GridData";
import { LevelModel } from "./../../../../src/minesweeper/game/models/LevelModel";
import { GameService } from "./../../../../src/minesweeper/services/GameService";
import { Texts } from "./../../../../src/minesweeper/utils/Texts";

import sinon = require("sinon");

describe("GameManager", () => {
    let manager: GameManager;
    let level: LevelModel;
    let customModel: CustomLevelModel;
    let grid: GridData;
    let service: GameService;

    beforeEach(() => {
        grid = new GridData();

        level = new LevelModel();
        level.setGrid(grid);

        customModel = new CustomLevelModel();
        customModel.maxCols = 9;
        customModel.maxRows = 9;
        customModel.numMines = 10;

        service = new GameService();
        service.eventDispatcher = new EventDispatcher();
        service.gameStatus = new GameStatus();
        service.gameStatus.start();

        manager = new GameManager();
        manager.gameService = service;
        manager.level = level;
        manager.customLevel = customModel;
    });

    afterEach(() => {
        grid = undefined;
        level = undefined;
        customModel = undefined;
        manager = undefined;
    });

    it("GenerateGrid: Easy", () => {
        manager.generateGrid(Texts.EASY);
        assert.equal(Texts.EASY, level.levelId);
    });

    it("GenerateGrid: Normal", () => {
        manager.generateGrid(Texts.NORMAL);
        assert.equal(Texts.NORMAL, level.levelId);
    });

    it("GenerateGrid: Hard", () => {
        manager.generateGrid(Texts.HARD);
        assert.equal(Texts.HARD, level.levelId);
    });

    it("GenerateGrid: Custom", () => {
        manager.generateGrid(Texts.CUSTOM);
        assert.equal(Texts.CUSTOM, level.levelId);
    });

    it("Reveal: The grid must be updated", () => {
        let cell = new Cell(1, 1);

        let spy = sinon.spy(service, "updateGridField");
        manager.reveal(cell);
        assert.isTrue(spy.calledOnce);
    });

    it("Reveal: FloodFill", () => {
        let cell = manager.level.grid.getCell(0, 0);
        manager.level.grid.getCell(5, 5).setCellAsAMine();

        let spy = sinon.spy(manager, "floodFill");
        manager.reveal(cell);
        assert.isTrue(spy.calledWith(cell));
    });

    it("Reveal: InvokeGameOver", () => {
        LevelUtils.setMine(level, manager.level.grid.getCell(0, 0));
        let cell = manager.level.grid.getCell(0, 0);

        let spy = sinon.spy(manager, "invokeGameOver");
        manager.reveal(cell);
        assert.isTrue(spy.calledOnce);
    });

    it("Reveal: InvokeYouWin", () => {
        manager.level.levelId = Texts.CUSTOM;
        manager.level.numMines = 2;
        manager.level.numFlags = 2;
        manager.level.setGrid(new GridData(6, 6));
        LevelUtils.setMine(level, manager.level.grid.getCell(0, 0));
        LevelUtils.setMine(level, manager.level.grid.getCell(1, 0));
        let cell = manager.level.grid.getCell(5, 5);
        let dispatcherSpy = sinon.spy(manager, "invokeYouWin");
        manager.reveal(cell);
        assert.isTrue(dispatcherSpy.calledOnce);
    });

    it("IsFinished: ", () => {
        let total = manager.level.grid.maxCols * manager.level.grid.maxRows;
        let numCellReveled = total - manager.level.numMines;
        manager.level.update.length = numCellReveled;

        assert.isTrue(manager.isFinished());
    });

    it("Flag: ", () => {
        let cell = new Cell(1, 2);
        let numFlags = manager.level.numFlags;
        manager.flag(cell);
        assert.isTrue(cell.isFlag);
        assert.equal(numFlags - 1, manager.level.numFlags);
    });

    it("Flag: The Cell already contains a flag", () => {
        let cell = new Cell(1, 2);
        cell.isFlag = true;
        let numFlags = manager.level.numFlags;

        manager.flag(cell);
        assert.equal(numFlags, manager.level.numFlags);
    });

    it("FloodFill:", () => {
        grid = new GridData(9, 9);
        grid.getCell(0, 0).setCellAsAMine();
        level.setGrid(grid);
        level.numMines = 1;

        let lastMoviment = new Cell(6, 6);

        manager.reveal(lastMoviment);
        assert.equal(grid.maxCols * grid.maxRows, level.update.length);
    });

    it("FloodFill: Recursive FloodFill", () => {
        let cell = manager.level.grid.getCell(0, 0);
        manager.level.grid.getCell(5, 5).setCellAsAMine();

        let spy = sinon.spy(manager, "floodFill");
        manager.floodFill(cell);
        assert.isTrue(spy.calledWith(cell));
        assert.isTrue(spy.callCount > 1);
    });
});
