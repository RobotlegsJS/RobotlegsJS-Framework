// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { Signal } from "./../../../../../../src/robotlegs/bender/extensions/signalCommandMap/impl/Signal";

import { Data } from "./Data";

@injectable()
export class RelaySignal extends Signal {

    constructor() {
        super(Data);
    }
}
