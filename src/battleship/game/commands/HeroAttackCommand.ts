import { GameEvent } from "../../events/GameEvent";
import { AttackEvent } from "./../events/AttackEvent";
import { Tile } from "./../models/Tile";
import { GameManager } from "./../managers/GameManager";
import { BattleFieldUtils } from "./../utils/BattleFieldUtils";
import { LevelModel } from "./../models/LevelModel";
import { GameService } from "./../../services/GameService";
import { FlowService } from "./../../services/FlowService";

import { injectable, inject, ICommand } from "@robotlegsjs/core";

@injectable()
export class HeroAttackCommand implements ICommand {
    @inject(LevelModel) public levelModel: LevelModel;

    @inject(GameService) public gameService: GameService;

    @inject(FlowService) public flowService: FlowService;

    @inject(GameManager) public gameManager: GameManager;
    @inject(GameEvent) public gameEvent: GameEvent;

    public execute(): void {
        let result = this.gameManager.attack(this.levelModel.enemy, this.gameEvent.extra.col, this.gameEvent.extra.row);

        this.gameService.updateBattleField();

        if (result === "gameOver") {
            this.flowService.showYouWinPopup();
        } else if (result === AttackEvent.FAIL) {
            this.gameService.enemyPhase();
            this.gameService.enemyAttackCommand();
        }
    }
}
