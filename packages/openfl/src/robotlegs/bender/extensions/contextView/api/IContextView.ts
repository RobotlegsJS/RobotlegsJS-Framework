// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import Stage from "openfl/display/Stage";

export let IContextView = Symbol("IContextView");
export interface IContextView {
    view: Stage;
}
