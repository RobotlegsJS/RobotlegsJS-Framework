// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { Report1Command } from "./Report1Command";
import { Report2Command } from "./Report2Command";
import { Report3Command } from "./Report3Command";

@injectable()
export class TestSequenceAnChangeAtomicLaterCommand extends SequenceMacro {
    @inject("Function")
    @named("reportingFunction")
    protected _report: Function;

    public prepare(): void {
        this.add(Report1Command);
        this.add(Report2Command);
        this.add(Report3Command);

        this.registerCompleteCallback(this.onComplete.bind(this));
    }

    protected onComplete(): void {
        this.atomic = false;

        this._report("Atomic property changed after execution of sequence.");
    }
}
