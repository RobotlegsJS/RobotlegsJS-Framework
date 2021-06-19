// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "@robotlegsjs/core";

@injectable()
export class ViewInjectedMediator {
    @inject(createjs.Container)
    public mediatedItem: createjs.Container;

    public initialize(): void {}

    public destroy(): void {}
}
