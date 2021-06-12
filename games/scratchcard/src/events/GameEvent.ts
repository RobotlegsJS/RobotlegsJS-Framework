import { Event } from "@robotlegsjs/core";

export class GameEvent extends Event {
    public static START_GAME_COMMAND: string = "startGameCommand";
    public static END_GAME_COMMAND: string = "endGameCommand";

    public static START: string = "start";
    public static END: string = "end";

    public constructor(type: string) {
        super(type);
    }
}
