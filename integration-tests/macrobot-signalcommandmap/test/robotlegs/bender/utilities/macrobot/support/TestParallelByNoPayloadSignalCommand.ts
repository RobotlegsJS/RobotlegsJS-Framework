// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { ParallelMacro } from "@robotlegsjs/macrobot";

import { ReportNoPayloadAsyncCommand } from "./ReportNoPayloadAsyncCommand";

@injectable()
export class TestParallelByNoPayloadSignalCommand extends ParallelMacro {
    public prepare(): void {
        this.add(ReportNoPayloadAsyncCommand);
        this.add(ReportNoPayloadAsyncCommand);
        this.add(ReportNoPayloadAsyncCommand);
        this.add(ReportNoPayloadAsyncCommand);
    }
}
