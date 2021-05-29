// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named, ICommand } from "@robotlegsjs/core";

@injectable()
export class ReportMaxNumberCommand implements ICommand {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    @inject(Number)
    @named("value1")
    protected _value1: number;

    @inject(Number)
    @named("value2")
    protected _value2: number;

    public execute(): void {
        this._report(Math.max(this._value1, this._value2));
    }
}
