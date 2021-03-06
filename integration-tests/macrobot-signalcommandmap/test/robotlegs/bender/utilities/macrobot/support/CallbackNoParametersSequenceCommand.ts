// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";
import { SequenceMacro } from "@robotlegsjs/macrobot";
import { CallbackNoParametersCommand } from "./CallbackNoParametersCommand";

@injectable()
export class CallbackNoParametersSequenceCommand extends SequenceMacro {
    public prepare(): void {
        this.add(CallbackNoParametersCommand);
    }
}
