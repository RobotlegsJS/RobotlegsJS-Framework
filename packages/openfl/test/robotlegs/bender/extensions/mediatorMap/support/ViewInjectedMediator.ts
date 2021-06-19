// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "@robotlegsjs/core";
import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

@injectable()
export class ViewInjectedMediator {
    @inject(DisplayObjectContainer)
    public mediatedItem: DisplayObjectContainer;

    public initialize(): void {}

    public destroy(): void {}
}
