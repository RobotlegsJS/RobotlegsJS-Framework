import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW: string = "showIntroView";
    public static SHOW_GAME_VIEW: string = "showGameView";
    public static SHOW_HOME_VIEW: string = "showHomeView";
    public static SHOW_LEVEL_SELECT_VIEW: string = "showLevelSelectView";
    public static SHOW_LEVEL_CUSTOM_OPTIONS_VIEW: string = "showLevelCustomOptionsView";

    public static SHOW_GAME_OVER_POPUP: string = "showGameOverPopup";
    public static SHOW_PAUSE_POPUP: string = "showPausePopup";
    public static SHOW_STARTING_POPUP: string = "showStartingPopup";
    public static SHOW_YOU_WIN_POPUP: string = "showYouWinPopup";

    public static CLOSE_POPUP: string = "closePopup";

    public constructor(type: string) {
        super(type);
    }
}
