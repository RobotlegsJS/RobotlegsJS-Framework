// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export class BossGuard {
    protected _approve: boolean;

    public constructor(approve: boolean) {
        this._approve = approve;
    }

    public approve(): boolean {
        return this._approve;
    }
}
