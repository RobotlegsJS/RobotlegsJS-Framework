// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IHook, inject, injectable, named } from "@robotlegsjs/core";
import { ExampleView } from "./ExampleView";
import { RectangleMediator } from "./RectangleMediator";

@injectable()
export class HookWithMediatorAndViewInjectionReportFunction implements IHook {
    @inject(RectangleMediator)
    public mediator: RectangleMediator;

    @inject(ExampleView)
    public view: ExampleView;

    @inject("Function")
    @named("reportView")
    public reportView: Function;

    public hook(): void {
        this.reportView(this.view, this.mediator.width, this.mediator.height);
    }
}
