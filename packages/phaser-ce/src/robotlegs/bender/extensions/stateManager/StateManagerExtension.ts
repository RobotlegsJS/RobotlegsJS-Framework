// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector } from "@robotlegsjs/core";
import { IStateManager } from "./api/IStateManager";
import { StateManager } from "./impl/StateManager";
import { StateRegistry } from "./impl/StateRegistry";

/**
 * This extension install a State Manager into the context
 */
export class StateManagerExtension implements IExtension {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _stateRegistry: StateRegistry;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _viewManager: IStateManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.whenInitializing(this._whenInitializing.bind(this));
        context.whenDestroying(this._whenDestroying.bind(this));

        this._injector = context.injector;

        // Just one Container Registry
        StateManagerExtension._stateRegistry =
            StateManagerExtension._stateRegistry || new StateRegistry();
        this._injector.bind(StateRegistry).toConstantValue(StateManagerExtension._stateRegistry);

        // But you get your own View Manager
        this._injector.bind(IStateManager).to(StateManager).inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _whenInitializing(): void {
        this._viewManager = this._injector.get<IStateManager>(IStateManager);
    }

    private _whenDestroying(): void {
        this._viewManager.removeAllHandlers();
        this._injector.unbind(IStateManager);
        this._injector.unbind(StateRegistry);
    }
}
