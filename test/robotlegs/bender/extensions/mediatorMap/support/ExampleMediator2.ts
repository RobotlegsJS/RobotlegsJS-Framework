// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { MediatorWatcher } from "./MediatorWatcher";
import { ExampleView } from "./ExampleView";

@injectable()
export class ExampleMediator2 {
    @inject(MediatorWatcher)
    public mediatorWatcher: MediatorWatcher;

    @inject(ExampleView)
    public view: ExampleView;

    public initialize(): void {
        this.mediatorWatcher.notify("ExampleMediator2");
    }

    public destroy(): void {
        this.mediatorWatcher.notify("ExampleMediator2 destroy");
    }
}
