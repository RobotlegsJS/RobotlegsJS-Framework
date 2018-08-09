// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IGuard } from "@robotlegsjs/core";

import { ExampleView } from "./ExampleView";

@injectable()
export class OnlyIfViewHasChildrenGuard implements IGuard {
    @inject(ExampleView)
    public view: ExampleView;

    public approve(): boolean {
        return this.view.numChildren > 0;
    }
}
