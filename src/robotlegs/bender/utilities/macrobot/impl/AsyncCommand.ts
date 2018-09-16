// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, IContext } from "@robotlegsjs/core";

import { IAsyncCommand } from "../api/IAsyncCommand";

@injectable()
export abstract class AsyncCommand implements IAsyncCommand {
    protected _context: IContext;
    protected _listeners: any[] = [];

    constructor(@inject(IContext) context: IContext) {
        this._context = context;

        this._context.detain(this);
    }

    public registerCompleteCallback(listener: Function): void {
        this._listeners.unshift(listener);
    }

    public abstract execute(...args: any[]): void;

    protected dispatchComplete(success: boolean): void {
        this._context.release(this);

        this._listeners.forEach((listener: Function) => {
            if (listener.length === 0) {
                listener();
            } else {
                listener(success);
            }
        });

        this._listeners = null;
    }
}
