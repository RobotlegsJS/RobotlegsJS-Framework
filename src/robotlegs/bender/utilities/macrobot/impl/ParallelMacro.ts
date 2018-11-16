// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";

import { AbstractMacro } from "./AbstractMacro";

@injectable()
export abstract class ParallelMacro extends AbstractMacro implements IMacro {
    private _executionCount: number = 0;

    private _success: boolean = true;
    private _running: boolean = false;

    private _commands: ISubCommandMapping[];

    public execute(payload?: any, ...payloads: any[]): void {
        const executeArguments: any[] = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i: number = 0; i < arguments.length; i++) {
            if (arguments[i] !== undefined) {
                executeArguments.push(arguments[i]);
            }
        }
        this.captureMacroPayload(executeArguments);

        this.prepare();

        this._commands = this._mappings.getList();

        if (this.hasCommands) {
            let numCommands: number = this._commands.length;
            let i: number = 0;

            this._running = true;

            for (i = 0; i < numCommands && this._success; i++) {
                let mapping: ISubCommandMapping = this._commands[i];
                this.executeCommand(mapping, payload, payloads);
            }
        } else {
            this.dispatchComplete(true);
        }
    }

    private get hasCommands(): boolean {
        return this._mappings && this._commands.length > 0;
    }

    protected commandCompleteHandler(success: boolean): void {
        this._executionCount++;
        this._success = this._success && success;

        if (this._running && (!this._success || this._executionCount === this._commands.length)) {
            this.dispatchComplete(this._success);
        }
    }

    protected dispatchComplete(success: boolean): void {
        this._running = false;
        this._success = true;
        this._executionCount = 0;
        this._commands = null;

        super.dispatchComplete(success);
    }
}
