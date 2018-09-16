// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { ParallelMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/ParallelMacro";

import { ReportDelayAsyncCommand } from "./ReportDelayAsyncCommand";

@injectable()
export class TestParallelBySignalCommand extends ParallelMacro {
    public prepare(): void {
        this.add(ReportDelayAsyncCommand).withPayloads("Command 1");
        this.add(ReportDelayAsyncCommand).withPayloads("Command 2");
        this.add(ReportDelayAsyncCommand).withPayloads("Command 3");
        this.add(ReportDelayAsyncCommand).withPayloads("Command 4");
    }
}
