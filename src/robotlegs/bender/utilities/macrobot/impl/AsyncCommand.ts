// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    inject,
    injectable,
    IContext
} from "@robotlegsjs/core";

import { IAsyncCommand } from "../api/IAsyncCommand";

@injectable()
export class AsyncCommand implements IAsyncCommand {

    protected _context: IContext;
    protected _listeners: any[] = [];

    constructor(
        @inject(IContext) context: IContext
    ) {
        this._context = context;
    }

    public registerCompleteCallback(listener: Function): void {
        this._listeners.unshift(listener);
    }

    public execute(): void {
        this._context.detain(this);
    }

    protected dispatchComplete(success: boolean): void {
        this._context.release(this);

        for (let i: number = 0; i < this._listeners.length; i++) {
            let listener: Function = this._listeners[i];

            if (listener.length === 0) {
                listener();
            } else {
                listener(success);
            }
        }

        if (this._listeners) {
            this._listeners = null;
        }
    }
}
