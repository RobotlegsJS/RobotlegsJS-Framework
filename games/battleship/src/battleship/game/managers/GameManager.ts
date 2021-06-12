import { FlowService } from "./../../services/FlowService";
import { AttackEvent } from "./../events/AttackEvent";
import { GameService } from "../../services/GameService";
import { LevelModel } from "./../models/LevelModel";
import { BattleField } from "./../models/BattleField";
import { Tile } from "./../models/Tile";
import { Player } from "../models/Player";
import { BattleFieldUtils } from "../utils/BattleFieldUtils";
import { injectable, inject, IEventDispatcher } from "@robotlegsjs/core";

@injectable()
export class GameManager {
    @inject(IEventDispatcher) public eventDispatcher: IEventDispatcher;
    @inject(LevelModel) public levelModel: LevelModel;
    @inject(GameService) public gameService: GameService;
    @inject(FlowService) public flowService: FlowService;

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
