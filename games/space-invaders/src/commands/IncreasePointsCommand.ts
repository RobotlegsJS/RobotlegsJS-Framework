import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

@injectable()
export class IncreasePointsCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        this._model.score += 100;

        this._gameService.updateHUDData();
    }
}
