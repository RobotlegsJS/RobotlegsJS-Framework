// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { SequenceMacro } from "@robotlegsjs/macrobot";
import { CallbackCustomPayloadCommand } from "./CallbackCustomPayloadCommand";
import { CallbackCustomPayloadSequenceCommand } from "./CallbackCustomPayloadSequenceCommand";

@injectable()
export class TestSequenceByCustomPayloadSignalCommand extends SequenceMacro {
    public prepare(): void {
        this.add(CallbackCustomPayloadSequenceCommand).withPayloads("command1");
        this.add(CallbackCustomPayloadCommand).withPayloads("command2");
    }
}
