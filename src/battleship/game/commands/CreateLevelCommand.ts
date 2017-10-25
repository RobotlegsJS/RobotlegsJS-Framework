import { BattleFieldUtils } from "./../utils/BattleFieldUtils";
import { LevelModel } from "./../models/LevelModel";
import { GameService } from "./../../services/GameService";
import { FlowService } from "./../../services/FlowService";

import { injectable, inject, ICommand } from "@robotlegsjs/core";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(LevelModel) public levelModel: LevelModel;

    @inject(GameService) public gameService: GameService;

    @inject(FlowService) public flowService: FlowService;

    public execute(): void {
        this.flowService.setGameView();

        this.levelModel.hero = BattleFieldUtils.generateBattleField();
        this.levelModel.enemy = BattleFieldUtils.generateBattleField();

        this.gameService.clearBattleField();
        this.gameService.drawBattleField();
        this.gameService.heroPhase();
    }
}
