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
    @named("reportParameter")
    public reportParameter: Function;

    public execute(): void {
        if (this.booleanValue) {
            this.reportParameter(this.booleanValue);
        }

        if (this.numValue) {
            this.reportParameter(this.numValue);
        }

        if (this.stringValue) {
            this.reportParameter(this.stringValue);
        }

        if (this.symbolValue) {
            this.reportParameter(this.symbolValue);
        }

        if (this.objectValue) {
            this.reportParameter(this.objectValue);
        }

        if (this.dateValue) {
            this.reportParameter(this.dateValue);
        }

        if (this.arrayValue) {
            this.reportParameter(this.arrayValue);
        }
    }
}
