import { IEventDispatcher, inject, injectable } from "@robotlegsjs/core";
import { FlowService } from "../../services/FlowService";
import { GameService } from "../../services/GameService";
import { AttackEvent } from "../events/AttackEvent";
import { BattleField } from "../models/BattleField";
import { LevelModel } from "../models/LevelModel";

@injectable()
export class GameManager {
    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    public attack(battleField: BattleField, col: number, row: number): string {
        let tileId = battleField.attackTile(col, row);
        if (tileId > 0) {
            battleField.decreaseShipHP(tileId);
            if (battleField.isGameOver()) {
                return "gameOver";
            }
            return AttackEvent.SUCCESS;
        }
        return AttackEvent.FAIL;
    }

    public hasShips(battleField: BattleField): boolean {
        for (let ship of battleField.ships) {
            if (ship.hp > 0) {
                return true;
            }
        }
        return false;
    }
}
