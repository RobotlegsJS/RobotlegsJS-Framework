// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, ICommand } from "@robotlegsjs/core";

import { TargetSignal } from "./TargetSignal";

import { Data } from "./Data";

@injectable()
export class RelayCommand implements ICommand {
    @inject(Data)
    private _data: Data;

    @inject(TargetSignal)
    private _targetSignal: TargetSignal;

    public execute(): void {
        this._targetSignal.dispatch(this._data);
    }
}
