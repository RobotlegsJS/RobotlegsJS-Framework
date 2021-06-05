// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container } from "pixi.js";

// eslint-disable-next-line @rushstack/typedef-var
export const IContainerController = Symbol("IContainerController");
export interface IContainerController {
    addView(view: Container): void;

    changeView(view: Container): void;

    removeCurrentView(): void;

    removeLastFloatingViewAdded(): void;

    removeAllFloatingViews(): void;
}
