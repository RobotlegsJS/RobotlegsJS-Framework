import { BattleField } from "./../models/BattleField";
import { AttackEvent } from "../events/AttackEvent";
import { Tile } from "./../models/Tile";
import { Player } from "../models/Player";
import { BattleFieldUtils } from "../utils/BattleFieldUtils";
import { injectable, inject, IEventDispatcher } from "@robotlegsjs/core";

@injectable()
export class GameManager {
    @inject(IEventDispatcher) public eventDispatcher: IEventDispatcher;

    public attack(battleField: BattleField, col: number, row: number): boolean {
        if (battleField.grid.getTileId(col, row) === Tile.HITTED) {
            return false;
        }
        let ship = battleField.attackShip(col, row);

        if (ship !== null) {
            this.eventDispatcher.dispatchEvent(new AttackEvent(AttackEvent.SUCCESS));
        } else {
            this.eventDispatcher.dispatchEvent(new AttackEvent(AttackEvent.FAIL));
        }
        return true;
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
