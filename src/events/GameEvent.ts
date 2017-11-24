import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static START_GAME_COMMAND = "startGameCommand";
    public static END_GAME_COMMAND = "endGameCommand";

    public static START = "start";
    public static END = "end";

    constructor(type: string) {
        super(type);
    }
}
