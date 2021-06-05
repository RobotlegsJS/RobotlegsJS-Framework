// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IType } from "@robotlegsjs/core";

import { ISubCommandPayload } from "../api/ISubCommandPayload";

export class SubCommandPayload<T> implements ISubCommandPayload<T> {
    private _data: T;
    private _type: IType<T>;
    private _name: string;

    public constructor(data: T, type: IType<T> = null) {
        if (data === undefined || data === null) {
            throw new Error("Payload data can't be null");
        }

        this._data = data;
        this._type = type;
        this._name = "";
    }

    public ofType(type: IType<T>): ISubCommandPayload<T> {
        this._type = type;
        return this;
    }

    public withName(name: string): ISubCommandPayload<T> {
        this._name = name;
        return this;
    }

    public get data(): T {
        return this._data;
    }

    public get type(): IType<T> {
        if (!this._type) {
            this._type = <IType<T>>this._data.constructor;
        }

        return this._type;
    }

    public get name(): string {
        return this._name;
    }
}
