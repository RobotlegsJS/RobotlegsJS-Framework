import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static CREATE_LEVEL_COMMAND: string = "createLevelCommand";

    public static CLEAR_BATTLEFIELD: string = "clearBattlefield";
    public static DRAW_BATTLEFIELD: string = "drawBattlefield";
    public static UPDATE_BATTLEFIELD: string = "updateBattlefield";

    public static ENEMY_ATTACK_COMMAND: string = "enemyAttackCommand";
    public static HERO_ATTACK_COMMAND: string = "heroAttackCommand";

    public static ENEMY_PHASE: string = "enemyPhase";
    public static HERO_PHASE: string = "heroPhase";

    public extra: any;
    public constructor(type: string) {
        super(type);
    }
}
