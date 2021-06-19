// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand, inject, injectable, named } from "@robotlegsjs/core";
import { Payload } from "./Payload";

@injectable()
export class ExecuteMethodWithParametersCommand implements ICommand {
    @inject("Function")
    @named("executeCallback")
    public callback: Function;

    public payload: Payload;

    public execute(payload: Payload = null): void {
        this.payload = payload;
        this.callback(this);
    }
}
