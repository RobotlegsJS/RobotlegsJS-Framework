import { BattleFieldUtils } from "./../utils/BattleFieldUtils";
import { GameManager } from "./../managers/GameManager";
import { LevelModel } from "./../models/LevelModel";
import { GameService } from "./../../services/GameService";
import { FlowService } from "./../../services/FlowService";

import { injectable, inject, ICommand } from "@robotlegsjs/core";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(LevelModel) public levelModel: LevelModel;

    @inject(GameManager) public gameManager: GameManager;

    @inject(GameService) public gameService: GameService;

    @inject(FlowService) public flowService: FlowService;

    public execute(): void {
        this.flowService.setGameView();

        this.levelModel.hero.battleField = BattleFieldUtils.generateBattleField();
        this.levelModel.enemy.battleField = BattleFieldUtils.generateBattleField();

        this.gameService.clearBattleField();
        this.gameService.drawBattleField();
        /*  this.levelModel.levelId = this.gameEvent.extra.levelId;
        this.levelModel.reset();

        this.gameManager.generateGrid(this.levelModel.levelId);

        this.gameService.start();

        this.flowService.setGameView();
        this.flowService.showStartingPopup(); */
    }
}
