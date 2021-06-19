import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { FlowService } from "../../services/FlowService";
import { GameService } from "../../services/GameService";
import { LevelModel } from "../models/LevelModel";
import { BattleFieldUtils } from "../utils/BattleFieldUtils";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    public execute(): void {
        this.flowService.setGameView();

        this.levelModel.hero = BattleFieldUtils.generateBattleField();
        this.levelModel.enemy = BattleFieldUtils.generateBattleField();

        this.gameService.clearBattleField();
        this.gameService.drawBattleField();
        this.gameService.heroPhase();
    }
}
