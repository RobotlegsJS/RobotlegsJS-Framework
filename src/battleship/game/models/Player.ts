import { BattleField } from "./BattleField";
import { Grid } from "./Grid";

export class Player {
    public static BOT: string = "bot";
    public static HUMAN: string = "human";

    public battleField: BattleField;
    private _type: string;

    public get type(): string {
        return this._type;
    }

    constructor(type: string = Player.BOT) {
        this._type = type;
    }
}
