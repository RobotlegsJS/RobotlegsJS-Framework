// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event, ICommand, inject, injectable, named } from "@robotlegsjs/core";

@injectable()
export class ReportEventCommand implements ICommand {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    @inject(Event)
    protected _event: Event;

    @inject(Number)
    protected _order: number;

    public execute(): void {
        this._report(this._event.data + this._order);
    }
}
