import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameEvent } from "../../events/GameEvent";
import { FlowService } from "../../services/FlowService";
import { GameService } from "../../services/GameService";
import { GameManager } from "../managers/GameManager";
import { LevelModel } from "../models/LevelModel";
import { LevelsRepository } from "../utils/LevelRepository";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameManager)
    private _gameManager: GameManager;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    @inject(GameEvent)
    private _gameEvent: GameEvent;

    @inject(LevelsRepository)
    private _levelsRepository: LevelsRepository;

    public execute(): void {
        this._levelModel.levelId = this._gameEvent.extra.levelId;
        this._levelModel.levelInfo = this._levelsRepository.getLevelInfoById(
            this._levelModel.levelId
        );
        this._levelModel.reset();
        this._levelModel.numMoves = this._levelModel.levelInfo.numMoves;

        this._gameManager.generateGrid(this._levelModel.maxCols, this._levelModel.maxRows);

        this._gameService.updateHUDData();
        this._gameService.start();

        this._flowService.setGameView();
        this._flowService.showStartingPopup();
    }
}
