// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

@injectable()
export class ViewInjectedAsRequestedMediator {
    @inject(createjs.DisplayObject)
    public mediatedItem: createjs.DisplayObject;

    public initialize(): void {}

    public destroy(): void {}
}
