import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

@injectable()
export class IncreaseLevelCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        this._model.level += 1;

        this._gameService.clearBattleField();
        this._gameService.updateHUDData();
        this._gameService.createLevelCommand();
    }
}
