// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//  Copyright (c) 2016 San Dinh Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, UID } from "@robotlegsjs/core";

import { ISignalMap } from "./api/ISignalMap";
import { SignalMap } from "./impl/SignalMap";

export class SignalMediatorExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _uid: string = UID.create(SignalMediatorExtension);

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    public extend(context: IContext): void {
        context.injector.bind(ISignalMap).to(SignalMap).inSingletonScope();
    }

    public toString(): string {
        return this._uid;
    }
}
