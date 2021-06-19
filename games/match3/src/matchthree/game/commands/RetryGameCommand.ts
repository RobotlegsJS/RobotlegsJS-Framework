import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { FlowService } from "./../../services/FlowService";
import { GameService } from "./../../services/GameService";
import { GameManager } from "./../managers/GameManager";
import { LevelModel } from "./../models/LevelModel";

@injectable()
export class RetryGameCommand implements ICommand {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameManager)
    private _gameManager: GameManager;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    public execute(): void {
        this._gameService.clearGridField();

        this._levelModel.reset();

        this._gameService.updateHUDData();
        this._gameService.start();
        this._flowService.showStartingPopup();

        this._gameManager.generateGrid(this._levelModel.maxCols, this._levelModel.maxRows);
        this._gameManager.nextStep();
    }
}
