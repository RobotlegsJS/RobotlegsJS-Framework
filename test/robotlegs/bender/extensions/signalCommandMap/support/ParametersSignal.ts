// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { Signal } from "@robotlegsjs/signals";

@injectable()
export class ParametersSignal extends Signal {
    constructor() {
        super(Boolean, Number, String, Symbol, Object, Date, Array);
    }
}
