// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IFlowViewMapping } from "./IFlowViewMapping";

// eslint-disable-next-line @rushstack/typedef-var
export const IFlowManager = Symbol("IFlowManager");
export interface IFlowManager {
    map(event: string): IFlowViewMapping;
}
