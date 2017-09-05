import { GameModel } from "./../models/GameModel";
import { GameStatus } from "./../models/GameStatus";
import { FlowService } from "./../services/FlowService";

import { ICommand, inject, injectable } from "@robotlegsjs/core";

@injectable()
export class GameOverCommand implements ICommand {

    @inject(GameModel)
    private model: GameModel;

    @inject(FlowService)
    private flowService: FlowService;

    /*@inject(SharedObjectManager)
    public  sharedObjectManager:SharedObjectManager;*/

    public execute(): void {
        this.model.status = GameStatus.GAMEOVER;

        /*sharedObjectManager.updateHighScore();*/

        this.flowService.showGameOverPopup();
    }
}
