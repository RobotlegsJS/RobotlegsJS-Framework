// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/*============================================================================*/
/* Public Functions                                                           */
/*============================================================================*/

/**
 * This helper creates a synchronous Handler
 * that invokes the supplied closure with the given params
 * (if provided).
 */
export function createHandler(closure: Function = null, ...params: any[]): Function {
    return function (): void {
        if (closure) {
            closure.apply(null, params);
        }
    };
}
