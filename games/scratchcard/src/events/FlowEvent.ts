import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW: string = "showIntroView";
    public static SHOW_MAIN_VIEW: string = "showMainView";
    public static SHOW_FEEDBACK: string = "showFeedback";

    public constructor(type: string) {
        super(type);
    }
}
