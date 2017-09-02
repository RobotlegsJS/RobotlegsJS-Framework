import { Event } from "@robotlegsjs/core";

export class PalidorEvent extends Event {

    public static REMOVE_CURRENT_VIEW = "removeCurrentView";
    public static REMOVE_ALL_FLOATING_VIEWS = "removeAllFloatingViews";
    public static REMOVE_LAST_FLOATING_VIEW_ADDED = "removeLastFloatingViewAdded";

    constructor(type: string) {
        super(type);
    }
}
