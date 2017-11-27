import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { LevelFactory } from "./../game/factories/LevelFactory";
import { GameModel } from "./../models/GameModel";
import { GameStatus } from "./../models/GameStatus";
import { LevelModel } from "./../models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(FlowService) private flowService: FlowService;
    @inject(GameModel) private gameModel: GameModel;
    @inject(GameService) private gameService: GameService;
    @inject(LevelModel) private levelModel: LevelModel;

    public execute(): void {
        LevelFactory.generateLevel(this.levelModel, this.gameModel.level);

        this.gameService.updateBattleField();
        this.gameService.updateHUDData();

        if (this.gameModel.status) {
            this.flowService.showStartingPopup();
        } else {
            this.flowService.showInfoPopup();
        }

        this.gameModel.status = GameStatus.GAME;
    }
}
