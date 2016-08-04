/**
 * Author:  Alessandro Bianco
 * Website: http://alessandrobianco.eu
 * Twitter: @alebianco
 * Created: 26/07/12 8.32
 *
 * Copyright © 2011 - 2013 Alessandro Bianco
 */

import { ISubCommandPayload } from "../api/ISubCommandPayload";

export class SubCommandPayload implements ISubCommandPayload {

    private _data: any;
    private _type: any;
    private _name: string;

    constructor(data: any, type: any) {
        if (data == null || data === undefined) {
            // throw new ArgumentError("Payload data can't be null");
        }

        if (type == null || type === undefined) {
            // throw new ArgumentError("Payload type can't be null");
        }

        this._data = data;
        this._type = type;
        this._name = "";
    }

    public get name(): string {
        return this._name;
    }

    public get type(): any {
        return this._type;
    }

    public get data(): any {
        return this._data;
    }

    public withName(name: string): SubCommandPayload {
        this._name = name;
        return this;
    }

    public ofClass(type: string): SubCommandPayload {
        this._type = type;
        return this;
    }
}
