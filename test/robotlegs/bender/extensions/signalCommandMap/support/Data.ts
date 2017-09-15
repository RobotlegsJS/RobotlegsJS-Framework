// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

@injectable()
export class Data {
    protected _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public get value(): number {
        return this._value;
    }
}
