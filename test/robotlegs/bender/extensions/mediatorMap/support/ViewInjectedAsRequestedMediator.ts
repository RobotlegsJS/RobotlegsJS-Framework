// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import DisplayObject from "openfl/display/DisplayObject";

import { injectable, inject } from "@robotlegsjs/core";

@injectable()
export class ViewInjectedAsRequestedMediator {
    @inject(DisplayObject)
    public mediatedItem: DisplayObject;

    public initialize(): void {}

    public destroy(): void {}
}
