// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "inversify";

import { ICommand } from "@robotlegsjs/core";

import { Data } from "./Data";

@injectable()
export class TargetCommand implements ICommand {
    public static TARGET_VALUE: number;

    @inject(Data) private _data: Data;

    public execute(): void {
        TargetCommand.TARGET_VALUE = this._data.value;
    }
}
