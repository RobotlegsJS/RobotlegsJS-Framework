import { BattleField } from "./BattleField";
import { injectable } from "@robotlegsjs/core";

@injectable()
export class LevelModel {
    public hero: BattleField;
    public enemy: BattleField;
}
