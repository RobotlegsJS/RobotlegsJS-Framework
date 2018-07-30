// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { Signal } from "@robotlegsjs/signals";

@injectable()
export class SupportSignal2 extends Signal {
    constructor() {
        super();
    }
}
