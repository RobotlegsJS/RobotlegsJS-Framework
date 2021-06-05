// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

// eslint-disable-next-line @rushstack/typedef-var
export const IContextStateManager = Symbol("IContextStateManager");
export interface IContextStateManager {
    stateManager: Phaser.StateManager;
}
