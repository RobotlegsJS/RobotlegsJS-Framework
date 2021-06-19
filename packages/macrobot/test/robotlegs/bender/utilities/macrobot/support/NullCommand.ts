// ------------------------------------------------------------------------------
//  Copyright (c) Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ICommand, injectable } from "@robotlegsjs/core";

@injectable()
export class NullCommand implements ICommand {
    public execute(): void {
        // do nothing
    }
}
