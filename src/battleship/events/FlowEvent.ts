import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW = "showIntroView";
    public static SHOW_GAME_VIEW = "showGameView";
    public static SHOW_HOME_VIEW = "showHomeView";

    constructor(type: string) {
        super(type);
    }
}
