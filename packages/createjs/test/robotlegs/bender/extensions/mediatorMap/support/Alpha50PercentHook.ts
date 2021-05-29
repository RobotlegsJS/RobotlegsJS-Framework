// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IHook } from "@robotlegsjs/core";

import { ExampleView } from "./ExampleView";

@injectable()
export class Alpha50PercentHook implements IHook {
    @inject(ExampleView)
    public view: ExampleView;

    public hook(): void {
        this.view.alpha = 0.5;
    }
}
