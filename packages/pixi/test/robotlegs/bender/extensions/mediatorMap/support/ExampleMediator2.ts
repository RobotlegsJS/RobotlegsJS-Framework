// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "@robotlegsjs/core";
import { Sprite } from "pixi.js";
import { MediatorWatcher } from "./MediatorWatcher";

@injectable()
export class ExampleMediator2 {
    @inject(MediatorWatcher)
    public mediatorWatcher: MediatorWatcher;

    @inject(Sprite)
    public view: Sprite;

    public initialize(): void {
        this.mediatorWatcher.notify("ExampleMediator2");
    }

    public destroy(): void {
        this.mediatorWatcher.notify("ExampleMediator2 destroy");
    }
}
