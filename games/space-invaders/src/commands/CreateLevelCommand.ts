import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { LevelFactory } from "./../game/factories/LevelFactory";
import { GameModel } from "./../models/GameModel";
import { GameStatus } from "./../models/GameStatus";
import { LevelModel } from "./../models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(FlowService)
    private _flowService: FlowService;

    @inject(GameModel)
    private _gameModel: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    @inject(LevelModel)
    private _levelModel: LevelModel;

    public execute(): void {
        LevelFactory.generateLevel(this._levelModel, this._gameModel.level);

        this._gameService.updateBattleField();
        this._gameService.updateHUDData();

        if (this._gameModel.status) {
            this._flowService.showStartingPopup();
        } else {
            this._flowService.showInfoPopup();
        }

        this._gameModel.status = GameStatus.GAME;
    }
}
