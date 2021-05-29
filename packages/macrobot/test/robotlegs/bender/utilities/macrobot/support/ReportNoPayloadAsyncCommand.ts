// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { AsyncCommand } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/AsyncCommand";

@injectable()
export class ReportNoPayloadAsyncCommand extends AsyncCommand {
    public execute(): void {
        setTimeout(this.onTimeout.bind(this), 50 * Math.random());
    }

    protected onTimeout(): void {
        this.dispatchComplete(true);
    }
}
