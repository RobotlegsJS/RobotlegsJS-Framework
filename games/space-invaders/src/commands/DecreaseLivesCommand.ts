import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

@injectable()
export class DecreaseLivesCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        this._model.lives -= 1;
        this._gameService.updateHUDData();

        if (this._model.lives === 0) {
            this._gameService.gameOver();
        }
    }
}
