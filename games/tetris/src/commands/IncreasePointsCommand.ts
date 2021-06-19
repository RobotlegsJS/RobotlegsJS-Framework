import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "./../events/GameEvent";
import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";
import { GameUtils } from "./../utils/GameUtils";

@injectable()
export class IncreasePointsCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameEvent)
    private _event: GameEvent;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        this._model.score += GameUtils.getPointsByLines(this._event.lines);
        this._model.level = GameUtils.getCurrentLevel(this._model.lines);
        this._model.lines += this._event.lines;

        this._gameService.updateData();
    }
}
