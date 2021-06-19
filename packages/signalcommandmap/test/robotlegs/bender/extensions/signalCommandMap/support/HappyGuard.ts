// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IGuard, injectable } from "@robotlegsjs/core";

@injectable()
export class HappyGuard implements IGuard {
    public approve(): boolean {
        return true;
    }
}
