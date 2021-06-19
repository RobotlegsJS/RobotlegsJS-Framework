import { injectable } from "@robotlegsjs/core";
import { BattleField } from "./BattleField";

@injectable()
export class LevelModel {
    public hero: BattleField;
    public enemy: BattleField;
}
