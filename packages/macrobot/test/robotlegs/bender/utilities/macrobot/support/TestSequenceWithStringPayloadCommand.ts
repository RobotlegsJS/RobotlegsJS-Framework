// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";
import { SubCommandPayload } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SubCommandPayload";
import { ReportStringCommand } from "./ReportStringCommand";

@injectable()
export class TestSequenceWithStringPayloadCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportStringCommand).withPayloads(new SubCommandPayload("Hello"));
        this.add(ReportStringCommand).withPayloads(new SubCommandPayload("World", String));
        this.add(ReportStringCommand).withPayloads("!");
    }
}
