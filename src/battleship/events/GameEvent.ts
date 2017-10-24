import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static CREATE_LEVEL_COMMAND = "createLevelCommand";

    public static CLEAR_BATTLEFIELD = "clearBattlefield";
    public static DRAW_BATTLEFIELD = "drawBattlefield";
    public static UPDATE_BATTLEFIELD = "updateBattlefield";

    constructor(type: string) {
        super(type);
    }
}
