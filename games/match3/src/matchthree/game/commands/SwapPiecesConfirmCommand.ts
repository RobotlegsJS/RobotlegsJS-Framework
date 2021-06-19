import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameService } from "../../services/GameService";
import { GameStatus } from "../models/GameStatus";
import { LevelInfo } from "../models/LevelInfo";
import { LevelModel } from "../models/LevelModel";

@injectable()
export class SwapPiecesConfirmCommand implements ICommand {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameStatus)
    private _gameStatus: GameStatus;

    @inject(GameService)
    private _gameService: GameService;

    public execute(): void {
        if (this._levelModel.levelInfo.levelType === LevelInfo.TIMER_TYPE) {
            return;
        }

        this._levelModel.numMoves -= 1;

        this._gameService.updateHUDData();

        if (this._levelModel.numMoves === 0) {
            this._gameStatus.gameOver();
        }
    }
}
