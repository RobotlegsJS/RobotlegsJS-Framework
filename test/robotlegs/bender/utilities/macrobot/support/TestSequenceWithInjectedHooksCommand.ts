// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportStringCommand } from "./ReportStringCommand";
import { ReportCommandHook } from "./ReportCommandHook";

@injectable()
export class TestSequenceWithInjectedHooksCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportStringCommand)
            .withPayloads("Command 1")
            .withHooks(ReportCommandHook);
        this.add(ReportStringCommand)
            .withPayloads("Command 2")
            .withHooks(ReportCommandHook);
        this.add(ReportStringCommand)
            .withPayloads("Command 3")
            .withHooks(ReportCommandHook);
    }
}
