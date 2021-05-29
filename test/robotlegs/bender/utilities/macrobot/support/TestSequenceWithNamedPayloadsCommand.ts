// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { SubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandPayload";
import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportMaxNumberCommand } from "./ReportMaxNumberCommand";

@injectable()
export class TestSequenceWithNamedPayloadsCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportMaxNumberCommand).withPayloads(
            new SubCommandPayload(1).withName("value1"),
            new SubCommandPayload(2).withName("value2")
        );
        this.add(ReportMaxNumberCommand).withPayloads(
            new SubCommandPayload(20).withName("value1"),
            new SubCommandPayload(10).withName("value2")
        );
        this.add(ReportMaxNumberCommand).withPayloads(
            new SubCommandPayload(200).withName("value1"),
            new SubCommandPayload(100).withName("value2")
        );
    }
}
