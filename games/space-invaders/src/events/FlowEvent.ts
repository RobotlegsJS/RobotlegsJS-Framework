import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_GAME_VIEW: string = "showGameView";
    public static SHOW_HOME_VIEW: string = "showHomeView";
    public static SHOW_INTRO_VIEW: string = "showIntroView";
    public static SHOW_OPTIONS_VIEW: string = "showOptionsView";

    public static SHOW_GAME_OVER_POPUP: string = "showGameOverPopup";
    public static SHOW_INFO_POPUP: string = "showInfoPopup";
    public static SHOW_PAUSE_POPUP: string = "showPausePopup";
    public static SHOW_RESET_CONFIRM_POPUP: string = "showResetConfirmPopup";
    public static SHOW_STARTING_POPUP: string = "showStartingPopup";

    public static CLOSE_POPUP: string = "closePopup";

    public constructor(type: string) {
        super(type);
    }
}
