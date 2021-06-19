// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, named } from "@robotlegsjs/core";
import { Payload } from "./Payload";

@injectable()
export class PayloadInjectedGuard {
    @inject("Function")
    @named("approveCallback")
    public callback: Function;

    @inject(Payload)
    public payload: Payload;

    public approve(): boolean {
        this.callback(this, PayloadInjectedGuard);
        return true;
    }
}
