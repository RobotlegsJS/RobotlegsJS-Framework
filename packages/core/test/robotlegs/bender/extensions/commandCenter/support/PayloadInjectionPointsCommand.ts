// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, named } from "inversify";

@injectable()
export class PayloadInjectionPointsCommand {
    protected _message: string;
    protected _code: number;
    protected _reportingFunction: Function;

    public constructor(
        @inject("Function")
        @named("reportingFunction")
        reportingFunction: Function,
        @inject(String) message: string,
        @inject(Number) code: number
    ) {
        this._reportingFunction = reportingFunction;
        this._message = message;
        this._code = code;
    }

    public execute(): void {
        if (this._reportingFunction) {
            this._reportingFunction(this._message);
            this._reportingFunction(this._code);
        }
    }
}
