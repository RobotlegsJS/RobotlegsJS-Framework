// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

export class PalidorEvent extends Event {
    public static REMOVE_CURRENT_VIEW: string = "removeCurrentView";
    public static REMOVE_ALL_FLOATING_VIEWS: string = "removeAllFloatingViews";
    public static REMOVE_LAST_FLOATING_VIEW_ADDED: string = "removeLastFloatingViewAdded";

    public constructor(type: string) {
        super(type);
    }
}
