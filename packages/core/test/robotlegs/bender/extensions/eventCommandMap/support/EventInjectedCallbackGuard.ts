// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, named } from "inversify";
import { Event } from "../../../../../../src/robotlegs/bender/events/impl/Event";
import { IGuard } from "../../../../../../src/robotlegs/bender/framework/api/IGuard";

@injectable()
export class EventInjectedCallbackGuard implements IGuard {
    protected _callback: Function;
    protected _event: Event;

    public constructor(
        @inject("Function")
        @named("approveCallback")
        callback: Function,
        @inject(Event) event: Event
    ) {
        this._callback = callback;
        this._event = event;
    }

    public approve(): boolean {
        this._callback(this);
        return true;
    }

    public get event(): Event {
        return this._event;
    }
}
