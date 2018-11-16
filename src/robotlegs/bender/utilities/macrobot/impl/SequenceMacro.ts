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
export abstract class SequenceMacro extends AbstractMacro implements IMacro {
    private _executionIndex: number;

    private _success: boolean;
    private _running: boolean;
    private _completed: boolean;

    private _commands: ISubCommandMapping[];

    private _atomic: boolean;
    private _customAtomic: boolean;
    private _executePayload: any;
    private _executePayloads: any[];

    public get atomic(): boolean {
        return this._customAtomic !== undefined ? this._customAtomic : true;
    }

    public set atomic(value: boolean) {
        if (!this._running && !this._completed) {
            this._customAtomic = value;
        }
    }

    public execute(payload?: any, ...payloads: any[]): void {
        this._executePayload = payload;
        this._executePayloads = payloads;
        const executeArguments: any[] = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i: number = 0; i < arguments.length; i++) {
            if (arguments[i] !== undefined) {
                executeArguments.push(arguments[i]);
            }
        }
        this.captureMacroPayload(executeArguments);

        this.prepare();

        this._atomic = this.atomic;
        this._success = true;
        this._running = true;
        this._completed = false;
        this._executionIndex = 0;
        this._commands = this._mappings.getList();

        this.executeNext();
    }

    protected executeNext(): void {
        if (this.hasCommands) {
            let mapping: ISubCommandMapping = this._commands[this._executionIndex++];
            this.executeCommand(mapping, this._executePayload, this._executePayloads);
        } else {
            this.dispatchComplete(this._success);
        }
    }

    private get hasCommands(): boolean {
        return this._commands && this._executionIndex < this._commands.length;
    }

    protected commandCompleteHandler(success: boolean): void {
        this._success = this._success && success;

        if (this._atomic || this._success) {
            this.executeNext();
        } else {
            this.dispatchComplete(false);
        }
    }

    protected dispatchComplete(success: boolean): void {
        this._running = false;
        this._completed = true;
        this._success = true;
        this._executionIndex = 0;
        this._commands = null;

        super.dispatchComplete(success);
    }
}
