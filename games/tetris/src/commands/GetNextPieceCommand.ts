import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameModel } from "./../models/GameModel";
import { GameService } from "./../services/GameService";
import { TileGroupFactory } from "./../utils/TileGroupFactory";

@injectable()
export class GetNextPieceCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        this._model.currentPiece = this._model.nextPiece;
        this._model.nextPiece = TileGroupFactory.getRandomTileGroup();

        this._gameService.updateNextPiece();
        this._gameService.updateData();
    }
}
