// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IHook, inject, injectable } from "@robotlegsjs/core";
import { Sprite } from "pixi.js";

@injectable()
export class Alpha50PercentHook implements IHook {
    @inject(Sprite)
    public view: Sprite;

    public hook(): void {
        this.view.alpha = 0.5;
    }
}
