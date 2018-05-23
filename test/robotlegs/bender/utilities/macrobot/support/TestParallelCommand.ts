// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { ParallelMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/ParallelMacro";

import { ReportDelayAsyncCommand } from "./ReportDelayAsyncCommand";

@injectable()
export class TestParallelCommand extends ParallelMacro {
    public prepare(): void {
        this.add(ReportDelayAsyncCommand).withPayloads("Command 1", 100);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 2", 75);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 3", 50);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 4", 25);
    }
}
