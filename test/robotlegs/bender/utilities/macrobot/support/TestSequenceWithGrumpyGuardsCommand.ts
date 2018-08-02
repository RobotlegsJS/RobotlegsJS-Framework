// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { GrumpyGuard } from "./GrumpyGuard";
import { HappyGuard } from "./HappyGuard";
import { ReportStringCommand } from "./ReportStringCommand";

@injectable()
export class TestSequenceWithGrumpyGuardsCommand extends SequenceMacro {
    public prepare(): void {
        this.add(ReportStringCommand)
            .withPayloads("Command 1")
            .withGuards(GrumpyGuard);
        this.add(ReportStringCommand)
            .withPayloads("Command 2")
            .withGuards(HappyGuard, GrumpyGuard);
        this.add(ReportStringCommand)
            .withPayloads("Command 3")
            .withGuards(HappyGuard, HappyGuard, GrumpyGuard);
    }
}
