// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "inversify";

@injectable()
export class ReportMethodCommand {

    protected _reportingFunc: Function;

    constructor(
        @inject("Function") @named("reportingFunc") reportingFunc: Function
    ) {
        this._reportingFunc = reportingFunc;
    }

    public report(): void {
        if (this._reportingFunc) {
            this._reportingFunc(ReportMethodCommand);
        }
    }
}
