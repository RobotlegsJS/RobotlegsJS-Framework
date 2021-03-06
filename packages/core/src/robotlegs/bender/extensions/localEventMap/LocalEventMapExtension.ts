// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext } from "../../framework/api/IContext";
import { IExtension } from "../../framework/api/IExtension";
import { IEventMap } from "./api/IEventMap";
import { EventMap } from "./impl/EventMap";

/**
 * An Event Map keeps track of listeners and provides the ability
 * to unregister all listeners with a single method call.
 */
export class LocalEventMapExtension implements IExtension {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.injector.bind(IEventMap).to(EventMap);
    }
}
