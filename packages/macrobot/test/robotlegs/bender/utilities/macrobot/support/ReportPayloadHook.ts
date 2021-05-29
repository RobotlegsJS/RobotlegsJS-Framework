// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "@robotlegsjs/core";

@injectable()
export class ReportPayloadHook {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    @inject(String)
    protected _str: string;

    public hook() {
        this._report("Hook of " + this._str);
    }
}
