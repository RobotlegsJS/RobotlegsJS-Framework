import { BattleField } from "./../game/models/BattleField";

export class DebugUtils {
    public static printBattleField(battleField: BattleField): void {
        let field: string = "";
        for (let row = 0; row < battleField.grid.maxRows; row++) {
            for (let col = 0; col < battleField.grid.maxCols; col++) {
                field = `${field} ${battleField.grid.getTileId(col, row)}`;
            }
            field = `${field} \n`;
        }
        console.log(field);
    }
    public static printShipHP(battleField: BattleField): void {
        let hps: string = "";
        for (let ship of battleField.ships) {
            hps = `${hps} : ${ship.hp}`;
        }
        console.log(hps);
    }
}
