// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IBundle, IContext } from "@robotlegsjs/core";
import { ContextStateManagerExtension } from "../../extensions/contextStateManager/ContextStateManagerExtension";
import { ContextStateManagerListenerConfig } from "../../extensions/contextStateManager/impl/ContextStateManagerListenerConfig";
import { StateManagerExtension } from "../../extensions/stateManager/StateManagerExtension";
import { StateManagerObserverExtension } from "../../extensions/stateManager/StateManagerObserverExtension";
import { StateMediatorMapExtension } from "../../extensions/stateMediatorMap/StateMediatorMapExtension";

/**
 * For that Classic Robotlegs flavour
 *
 * <p>This bundle installs a number of extensions commonly used
 * in typical Robotlegs applications and modules.</p>
 */
export class PhaserBundle implements IBundle {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.install(
            ContextStateManagerExtension,
            StateManagerExtension,
            StateManagerObserverExtension,
            StateMediatorMapExtension
        );

        context.configure(ContextStateManagerListenerConfig);
    }
}
