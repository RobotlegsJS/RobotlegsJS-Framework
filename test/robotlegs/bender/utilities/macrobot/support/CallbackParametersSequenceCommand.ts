// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, named } from "@robotlegsjs/core";

import { SequenceMacro } from "../../../../../../src/robotlegs/bender/utilities/macrobot/impl/SequenceMacro";

import { CallbackParametersCommand } from "./CallbackParametersCommand";

@injectable()
export class CallbackParametersSequenceCommand extends SequenceMacro {
    @inject(Boolean)
    public booleanValue: boolean;

    @inject(Number)
    public numValue: number;

    @inject(String)
    public stringValue: string;

    @inject(Symbol)
    public symbolValue: symbol;

    @inject(Object)
    public objectValue: object;

    @inject(Date)
    public dateValue: Date;

    @inject(Array)
    public arrayValue: any[];

    @inject("Function")
    @named("reportingFunction")
    public reportingFunction: Function;

    public prepare(): void {
        this.add(CallbackParametersCommand);
    }
}
