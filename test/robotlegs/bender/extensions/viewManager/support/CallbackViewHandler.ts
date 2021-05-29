// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import DisplayObjectContainer from "openfl/display/DisplayObjectContainer";

import { IClass } from "@robotlegsjs/core";

import { IViewHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";

/**
 * @private
 */
export class CallbackViewHandler implements IViewHandler {
    private _callback: Function;

    constructor(callback: Function = null) {
        this._callback = callback;
    }

    public handleView(view: DisplayObjectContainer, type: IClass<any>): void {
        if (this._callback) {
            this._callback(view, type);
        }
    }
}
