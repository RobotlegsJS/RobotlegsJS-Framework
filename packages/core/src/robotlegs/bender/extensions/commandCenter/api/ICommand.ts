// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

// eslint-disable-next-line @rushstack/typedef-var
export const ICommand = Symbol("ICommand");

/**
 * Mandatory Command interface.
 *
 * <p>Note, you do not need to implement this interface,
 * any class with an execute method can be used.</p>
 */
export interface ICommand {
    /**
     * The execute method
     */
    execute(...args: any[]): void;
}
