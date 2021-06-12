import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static CREATE_LEVEL_COMMAND = "createLevelCommand";

    public static CLEAR_BATTLEFIELD = "clearBattlefield";
    public static DRAW_BATTLEFIELD = "drawBattlefield";
    public static UPDATE_BATTLEFIELD = "updateBattlefield";

    public static ENEMY_ATTACK_COMMAND = "enemyAttackCommand";
    public static HERO_ATTACK_COMMAND = "heroAttackCommand";

    public static ENEMY_PHASE = "enemyPhase";
    public static HERO_PHASE = "heroPhase";

    public extra: any;
    constructor(type: string) {
        super(type);
    }
}
