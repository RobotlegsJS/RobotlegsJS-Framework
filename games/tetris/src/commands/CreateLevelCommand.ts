import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameModel } from "./../models/GameModel";
import { GameStatus } from "./../models/GameStatus";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { TileGroupFactory } from "./../utils/TileGroupFactory";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    public execute(): void {
        this._model.clear();
        this._model.currentPiece = TileGroupFactory.getRandomTileGroup();
        this._model.nextPiece = TileGroupFactory.getRandomTileGroup();

        this._gameService.clearGrid();
        this._gameService.updateNextPiece();
        this._gameService.updateData();

        if (this._model.status) {
            this._flowService.showStartingPopup();
        } else {
            this._flowService.showInfoPopup();
        }

        this._model.status = GameStatus.GAME;
    }
}
