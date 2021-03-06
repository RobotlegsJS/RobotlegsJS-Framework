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
 * This helper creates an asynchronous Handler that waits 5 ms
 * and then invokes the supplied closure with the given params
 * (if provided) and finally calls back.
 */
export function createAsyncHandler(closure: Function = null, ...params: any[]): Function {
    return function (message: any, callback: Function): void {
        setTimeout(function (): void {
            if (closure) {
                closure.apply(null, params);
            }
            callback();
        }, 5);
    };
}
