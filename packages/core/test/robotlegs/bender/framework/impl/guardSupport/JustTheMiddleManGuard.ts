// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable } from "inversify";
import { IGuard } from "../../../../../../src/robotlegs/bender/framework/api/IGuard";
import { BossGuard } from "./BossGuard";

@injectable()
export class JustTheMiddleManGuard implements IGuard {
    private _bossDecision: BossGuard;

    public constructor(@inject(BossGuard) bossDecision: BossGuard) {
        this._bossDecision = bossDecision;
    }

    public approve(): boolean {
        return this._bossDecision.approve();
    }
}
