// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container } from "pixi.js";

import { IClass } from "@robotlegsjs/core";

export interface IFlowViewMapping {
    toFloatingView(viewClass: IClass<Container>): void;

    toView(viewClass: IClass<Container>): void;
}
