// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "inversify";

import { ICommand } from "@robotlegsjs/core";

@injectable()
export class ReportingCommand3 implements ICommand {
    @inject("Function")
    @named("executeCallback")
    public callback: Function;

    public execute(): void {
        this.callback(this, ReportingCommand3);
    }
}
