import { GameStatus } from "./../models/GameStatus";
import { LevelModel } from "./../models/LevelModel";
import { GameService } from "./../../services/GameService";
import { FlowService } from "./../../services/FlowService";

import { injectable, inject, ICommand } from "@robotlegsjs/core";

@injectable()
export class GameOverCommand implements ICommand {

    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameStatus)
    public gameStatus: GameStatus;

    public execute(): void {
        this.gameService.pause();

        if (this.gameStatus.isGameOver) {
            this.flowService.showGameOverPopup();
        } else {
            this.flowService.showYouWinPopup();
        }
    }
}
