// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "inversify";

import { ICommand } from "@robotlegsjs/core";

@injectable()
export class TargetCommand implements ICommand {

    public static TARGET_VALUE: number;

    @inject(Object)
    private _data: Object;

    public execute(): void {
        TargetCommand.TARGET_VALUE = (<any>this._data).value;
    }
}
