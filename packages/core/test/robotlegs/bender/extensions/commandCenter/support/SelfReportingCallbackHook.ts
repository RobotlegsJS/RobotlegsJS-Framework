// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, named } from "inversify";
import { SelfReportingCallbackCommand } from "./SelfReportingCallbackCommand";

@injectable()
export class SelfReportingCallbackHook {
    protected _callback: Function;
    protected _command: SelfReportingCallbackCommand;

    public constructor(
        @inject("Function")
        @named("hookCallback")
        callback: Function,
        @inject(SelfReportingCallbackCommand) command: SelfReportingCallbackCommand
    ) {
        this._callback = callback;
        this._command = command;
    }

    public hook(): void {
        this._callback(this);
    }

    public get command(): SelfReportingCallbackCommand {
        return this._command;
    }
}
