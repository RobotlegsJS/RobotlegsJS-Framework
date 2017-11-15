// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "inversify";

import { ICommand } from "@robotlegsjs/core";

@injectable()
export class CallbackParametersCommand implements ICommand {
    @inject(Boolean) public booleanValue: boolean;

    @inject(Number) public numValue: number;

    @inject(String) public stringValue: string;

    @inject(Symbol) public symbolValue: symbol;

    @inject(Object) public objectValue: object;

    @inject(Date) public dateValue: Date;

    @inject(Array) public arrayValue: any[];

    @inject("Function")
    @named("reportParameter")
    public reportParameter: Function;

    public execute(): void {
        this.reportParameter(this.booleanValue);
        this.reportParameter(this.numValue);
        this.reportParameter(this.stringValue);
        this.reportParameter(this.symbolValue);
        this.reportParameter(this.objectValue);
        this.reportParameter(this.dateValue);
        this.reportParameter(this.arrayValue);
    }
}
