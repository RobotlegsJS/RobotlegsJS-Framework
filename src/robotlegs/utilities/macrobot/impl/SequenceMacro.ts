/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import { IMacro } from "../api/IMacro";
import { ISubCommandMapping } from "../api/ISubCommandMapping";

import { AbstractMacro } from "./AbstractMacro";

export abstract class SequenceMacro extends AbstractMacro implements IMacro {

    private _executionIndex: number = 0;

    private _success: boolean = true;
    private _running: boolean = false;

    private _commands: ISubCommandMapping[];

    private _atomic: boolean = true;

    public get atomic(): boolean {
        return this._atomic;
    }

    public set atomic(value: boolean) {
        if (!this._running) {
            this._atomic = value;
        }
    }

    public execute(): void {
        super.execute();

        this._running = true;
        this._executionIndex = 0;
        this._commands = this._mappings.getList();
        this.executeNext();
    }

    protected executeNext(): void {
        if (this.hasCommands) {
            let mapping: ISubCommandMapping = this._commands[this._executionIndex++];
            this.executeCommand(mapping);
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
        this._success = true;
        this._executionIndex = 0;
        this._commands = null;

        super.dispatchComplete(success);
    }
}
