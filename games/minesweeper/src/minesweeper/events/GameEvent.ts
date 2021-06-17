import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static CREATE_LEVEL_COMMAND: string = "createLevelCommand";
    public static GAME_OVER_COMMAND: string = "gameOverCommand";
    public static RETRY_GAME_COMMAND: string = "retryGameCommand";
    public static EXPORT_LEVEL_DATA_COMMAND: string = "exportLevelDataCommand";

    public static RESUME: string = "resume";
    public static PAUSE: string = "pause";

    public static UPDATE_HUD_DATA: string = "updateData";

    public static CLEAR_GRID: string = "clearGridField";
    public static UPDATE_GRID: string = "update";

    public extra: any;

    public constructor(type: string) {
        super(type);
    }
}
