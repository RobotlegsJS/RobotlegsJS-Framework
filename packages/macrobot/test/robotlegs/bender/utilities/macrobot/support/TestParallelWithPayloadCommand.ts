// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { ParallelMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/ParallelMacro";
import { ReportEventWithDelayCommand } from "./ReportEventWithDelayCommand";

@injectable()
export class TestParallelWithPayloadCommand extends ParallelMacro {
    public prepare(): void {
        this.add(ReportEventWithDelayCommand).withPayloads("Command 1", 100);
        this.add(ReportEventWithDelayCommand).withPayloads("Command 2", 75);
        this.add(ReportEventWithDelayCommand).withPayloads("Command 3", 50);
        this.add(ReportEventWithDelayCommand).withPayloads("Command 4", 25);
    }
}
