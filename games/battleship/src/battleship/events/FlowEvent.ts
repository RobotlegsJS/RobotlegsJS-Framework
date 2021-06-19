import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW: string = "showIntroView";
    public static SHOW_GAME_VIEW: string = "showGameView";
    public static SHOW_HOME_VIEW: string = "showHomeView";

    public static SHOW_GAME_OVER_POPUP: string = "showGameOverPopup";
    public static SHOW_YOU_WIN_POPUP: string = "showYouWinPopup";
    public static SHOW_PAUSE_POPUP: string = "showPausePopup";

    public constructor(type: string) {
        super(type);
    }
}
