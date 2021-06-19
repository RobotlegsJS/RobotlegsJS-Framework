import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { GameEvent } from "../../events/GameEvent";
import { FlowService } from "../../services/FlowService";
import { GameService } from "../../services/GameService";
import { AttackEvent } from "../events/AttackEvent";
import { GameManager } from "../managers/GameManager";
import { LevelModel } from "../models/LevelModel";

@injectable()
export class HeroAttackCommand implements ICommand {
    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameManager)
    public gameManager: GameManager;

    @inject(GameEvent)
    public gameEvent: GameEvent;

    public execute(): void {
        let result = this.gameManager.attack(
            this.levelModel.enemy,
            this.gameEvent.extra.col,
            this.gameEvent.extra.row
        );

        this.gameService.updateBattleField();

        if (result === "gameOver") {
            this.flowService.showYouWinPopup();
        } else if (result === AttackEvent.FAIL) {
            this.gameService.enemyPhase();
            this.gameService.enemyAttackCommand();
        }
    }
}
