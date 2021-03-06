// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { instanceOfType } from "../../../../../../src/robotlegs/bender/extensions/matching/instanceOfType";
import { IType } from "../../../../../../src/robotlegs/bender/extensions/matching/IType";
import { IMatcher } from "../../../../../../src/robotlegs/bender/framework/api/IMatcher";

export class TypeCollection<T> {
    private _type: IType<T>;
    private _subTypeOf: IType<T>[];
    private _items: T[];

    public constructor(type: IType<T>, subTypeOf: IType<T>[], items: T[]) {
        this._type = type;
        this._subTypeOf = subTypeOf;
        this._items = items;
    }

    public get matcher(): IMatcher {
        return instanceOfType<T>(this._type);
    }

    public get type(): IType<T> {
        return this._type;
    }

    public get matchWith(): IType<T>[] {
        return this._subTypeOf.concat(this._type);
    }

    public get items(): T[] {
        return this._items;
    }
}
