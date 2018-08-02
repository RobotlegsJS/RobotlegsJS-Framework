// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { ReportDelayAsyncCommand } from "./ReportDelayAsyncCommand";

@injectable()
export class TestAtomicSequenceWithAsyncAndCompleteCallbackCommand extends SequenceMacro {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    public prepare(): void {
        this.add(ReportDelayAsyncCommand).withPayloads("Command 1", 50, true);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 2", 50, false);
        this.add(ReportDelayAsyncCommand).withPayloads("Command 3", 50, false);

        this.registerCompleteCallback(this.onComplete.bind(this));
    }

    protected onComplete(success: boolean): void {
        if (!success) {
            this._report("All commands have been executed but some of them failed.");
        }
    }
}
