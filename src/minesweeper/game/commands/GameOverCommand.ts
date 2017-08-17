import { HighScoreManager } from "./../managers/HighScoreManager";
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

    @inject(HighScoreManager)
    public highScoreManager: HighScoreManager;

    public execute(): void {
        this.gameService.pause();

        if (this.gameStatus.isGameOver) {
            this.flowService.showGameOverPopup();
        } else {
            this.highScoreManager.save(this.levelModel.levelId, this.levelModel.clock);
            this.flowService.showYouWinPopup();
        }
    }
}
