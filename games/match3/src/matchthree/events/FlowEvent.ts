import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW: string = "showIntroView";
    public static SHOW_GAME_VIEW: string = "showGameView";
    public static SHOW_HOME_VIEW: string = "showHomeView";
    public static SHOW_LEVEL_SELECT_VIEW: string = "showLevelSelectView";
    public static SHOW_OPTIONS_VIEW: string = "showOptionsView";

    public static SHOW_ALERT_POPUP: string = "showAlertPopup";
    public static SHOW_GAME_OVER_POPUP: string = "showGameOverPopup";
    public static SHOW_PAUSE_POPUP: string = "showPausePopup";
    public static SHOW_STARTING_POPUP: string = "showStartingPopup";
    public static SHOW_YOU_WIN_POPUP: string = "showYouWinPopup";

    public constructor(type: string) {
        super(type);
    }
}
