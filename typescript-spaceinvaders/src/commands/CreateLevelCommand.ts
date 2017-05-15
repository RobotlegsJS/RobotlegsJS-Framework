import { LevelFactory } from "./../game/factories/LevelFactory";
import { GameModel } from "./../models/GameModel";
import { GameStatus } from "./../models/GameStatus";
import { LevelModel } from "./../models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";

import { ICommand, injectable, inject } from "robotlegs";

@injectable()
export class CreateLevelCommand implements ICommand {

    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameModel)
    public gameModel: GameModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(LevelModel)
    public levelModel: LevelModel;

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
