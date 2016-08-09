/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import {
    inject,
    injectable,
    IContext
} from "robotlegs";

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
