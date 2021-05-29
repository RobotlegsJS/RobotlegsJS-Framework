// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { ExampleView } from "./ExampleView";
import { MediatorWatcher } from "./MediatorWatcher";

@injectable()
export class ExampleMediator {
    @inject(MediatorWatcher)
    public mediatorWatcher: MediatorWatcher;

    @inject(ExampleView)
    public view: ExampleView;

    public initialize(): void {
        this.mediatorWatcher.notify("ExampleMediator");
    }

    public destroy(): void {
        this.mediatorWatcher.notify("ExampleMediator destroy");
    }
}
