// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";
import { ICommand } from "../../../../../../src/robotlegs/bender/extensions/commandCenter/api/ICommand";
import { CommandMapping } from "../../../../../../src/robotlegs/bender/extensions/commandCenter/impl/CommandMapping";
import { IClass } from "../../../../../../src/robotlegs/bender/extensions/matching/IClass";

@injectable()
export class PriorityMapping extends CommandMapping {
    protected _priority: number;

    public constructor(commandClass: IClass<ICommand>, priority: number) {
        super(commandClass);
        this._priority = priority;
    }

    public get priority(): number {
        return this._priority;
    }
}
