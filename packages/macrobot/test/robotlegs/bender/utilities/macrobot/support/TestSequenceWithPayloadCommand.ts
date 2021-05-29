// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportEventCommand } from "./ReportEventCommand";

@injectable()
export class TestSequenceWithPayloadCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportEventCommand).withPayloads(1);
        this.add(ReportEventCommand).withPayloads(2);
        this.add(ReportEventCommand).withPayloads(3);
    }
}
