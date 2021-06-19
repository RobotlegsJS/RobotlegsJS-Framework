import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameModel } from "../models/GameModel";
import { GameStatus } from "../models/GameStatus";
import { FlowService } from "../services/FlowService";

@injectable()
export class GameOverCommand implements ICommand {
    @inject(GameModel)
    private _model: GameModel;

    @inject(FlowService)
    private _flowService: FlowService;

    public execute(): void {
        this._model.status = GameStatus.GAMEOVER;

        this._flowService.showGameOverPopup();
    }
}
