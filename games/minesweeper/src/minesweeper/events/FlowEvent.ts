import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW = "showIntroView";
    public static SHOW_GAME_VIEW = "showGameView";
    public static SHOW_HOME_VIEW = "showHomeView";
    public static SHOW_LEVEL_SELECT_VIEW = "showLevelSelectView";
    public static SHOW_LEVEL_CUSTOM_OPTIONS_VIEW = "showLevelCustomOptionsView";

    public static SHOW_GAME_OVER_POPUP = "showGameOverPopup";
    public static SHOW_PAUSE_POPUP = "showPausePopup";
    public static SHOW_STARTING_POPUP = "showStartingPopup";
    public static SHOW_YOU_WIN_POPUP = "showYouWinPopup";

    public static CLOSE_POPUP = "closePopup";

    constructor(type: string) {
        super(type);
    }
}
