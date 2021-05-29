// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, IContext, IExtension, UID } from "@robotlegsjs/core";

import { ISignalCommandMap } from "./api/ISignalCommandMap";
import { SignalCommandMap } from "./impl/SignalCommandMap";

// allow signals to be injected
injectable()(Phaser.Signal);

export class SignalCommandMapExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _uid: string = UID.create(SignalCommandMapExtension);

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    public extend(context: IContext): void {
        context.injector
            .bind(ISignalCommandMap)
            .to(SignalCommandMap)
            .inSingletonScope();
    }

    public toString(): string {
        return this._uid;
    }
}
