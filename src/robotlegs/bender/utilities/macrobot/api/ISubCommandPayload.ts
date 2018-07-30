// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IType } from "@robotlegsjs/core";

export interface ISubCommandPayload<T> {
    data: T;
    type: IType<T>;
    name: string;

    ofType(type: IType<T>): ISubCommandPayload<T>;
    withName(name: string): ISubCommandPayload<T>;
}
