// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { Signal } from "@robotlegsjs/signals";

@injectable()
export class DelaySignal extends Signal {
    public constructor() {
        super(Symbol, Number);
    }
}
