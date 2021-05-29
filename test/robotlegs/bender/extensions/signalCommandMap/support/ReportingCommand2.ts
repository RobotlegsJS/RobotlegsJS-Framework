// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named, ICommand } from "@robotlegsjs/core";

@injectable()
export class ReportingCommand2 implements ICommand {
    @inject("Function")
    @named("executeCallback")
    public callback: Function;

    public execute(): void {
        this.callback(this, ReportingCommand2);
    }
}
