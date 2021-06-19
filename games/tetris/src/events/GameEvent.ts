import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static CREATE_LEVEL: string = "createLevel";
    public static CLEAR_GRID: string = "clearGrid";
    public static GAME_OVER: string = "gameOver";

    public static PAUSE: string = "pause";
    public static RESUME: string = "resume";

    public static GET_NEXT_PIECE: string = "getNextPiece";
    public static INCREASE_POINTS: string = "increasePoints";

    public static UPDATE_DATA: string = "updateData";
    public static UPDATE_NEXT_PIECE: string = "updateNextPiece";

    public lines: number;

    public constructor(type: string) {
        super(type);
    }
}
