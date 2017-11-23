import { Event } from "@robotlegsjs/core";

export class FlowEvent extends Event {
    public static SHOW_INTRO_VIEW = "showIntroView";
    public static SHOW_MAIN_VIEW = "showMainView";

    constructor(type: string) {
        super(type);
    }
}
