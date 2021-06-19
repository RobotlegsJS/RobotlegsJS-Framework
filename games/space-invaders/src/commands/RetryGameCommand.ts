import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";

@injectable()
export class RetryGameCommand implements ICommand {
    @inject(GameModel)
    private _gameModel: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        this._gameService.clearBattleField();

        this._gameModel.clear();

        this._gameService.createLevelCommand();
    }
}
