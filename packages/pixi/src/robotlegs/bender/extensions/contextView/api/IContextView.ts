// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container } from "pixi.js";

// eslint-disable-next-line @rushstack/typedef-var
export const IContextView = Symbol("IContextView");
export interface IContextView {
    view: Container;
}
