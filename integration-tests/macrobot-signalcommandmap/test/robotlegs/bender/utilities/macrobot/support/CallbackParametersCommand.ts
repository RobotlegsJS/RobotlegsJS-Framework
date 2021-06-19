// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand, inject, injectable, named, optional } from "@robotlegsjs/core";

@injectable()
export class CallbackParametersCommand implements ICommand {
    @inject(Boolean)
    @optional()
    public booleanValue: boolean;

    @inject(Number)
    @optional()
    public numValue: number;

    @inject(String)
    @optional()
    public stringValue: string;

    @inject(Symbol)
    @optional()
    public symbolValue: symbol;

    @inject(Object)
    @optional()
    public objectValue: object;

    @inject(Date)
    @optional()
    public dateValue: Date;

    @inject(Array)
    @optional()
    public arrayValue: any[];

    @inject("Function")
    @named("reportingFunction")
    public reportingFunction: Function;

    public execute(): void {
        if (this.booleanValue) {
            this.reportingFunction(this.booleanValue);
        }

        if (this.numValue) {
            this.reportingFunction(this.numValue);
        }

        if (this.stringValue) {
            this.reportingFunction(this.stringValue);
        }

        if (this.symbolValue) {
            this.reportingFunction(this.symbolValue);
        }

        if (this.objectValue) {
            this.reportingFunction(this.objectValue);
        }

        if (this.dateValue) {
            this.reportingFunction(this.dateValue);
        }

        if (this.arrayValue) {
            this.reportingFunction(this.arrayValue);
        }
    }
}
