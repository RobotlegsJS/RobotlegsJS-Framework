// ------------------------------------------------------------------------------
//  2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";

import { AbstractMacro } from "./AbstractMacro";

export abstract class ParallelMacro extends AbstractMacro implements IMacro {
    private _executionCount: number = 0;

    private _success: boolean = true;
    private _running: boolean = false;

    private _commands: ISubCommandMapping[];

    public execute(): void {
        this._commands = this._mappings.getList();

        if (this.hasCommands) {
            this._running = true;
            for (let i: number = 0; i < this._commands.length; i++) {
                let mapping: ISubCommandMapping = this._commands[i];

                if (!this._success) {
                    break;
                }

                this.executeCommand(mapping);
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

        if (
            this._running &&
            (!this._success || this._executionCount === this._commands.length)
        ) {
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
