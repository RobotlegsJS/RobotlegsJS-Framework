import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static CREATE_LEVEL_COMMAND: string = "createLevelCommand";
    public static GAME_OVER_COMMAND: string = "gameOverCommand";
    public static RETRY_GAME_COMMAND: string = "retryGameCommand";
    public static SWAP_PIECES_COMMAND: string = "swapPiecesCommand";
    public static SWAP_PIECES_CONFIRM_COMMAND: string = "piecesSwappedCommand";

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
