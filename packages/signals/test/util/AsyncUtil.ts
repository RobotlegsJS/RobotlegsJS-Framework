/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class AsyncUtil {
    public add(
        callback: Function,
        delay: number,
        doneCallback?: Function,
        ...args: any[]
    ): Function {
        return () => {
            this._createTimeout(callback, delay, doneCallback, ...args);
        };
    }

    private _createTimeout(
        callback: Function,
        delay: number,
        doneCallback?: Function,
        ...args: any[]
    ): void {
        setTimeout(function () {
            if (callback) {
                callback(...args);
            }

            if (doneCallback) {
                doneCallback();
            }
        }, delay);
    }
}
