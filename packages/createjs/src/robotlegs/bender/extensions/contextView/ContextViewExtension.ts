// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger, instanceOfType } from "@robotlegsjs/core";
import { IContextView } from "./api/IContextView";
import { applyCreateJSPatch } from "./createjsPatch/createjs-patch";
import { ContextView } from "./impl/ContextView";

/**
 * <p>This Extension waits for a ContextView to be added as a configuration
 * and maps it into the context's injector.</p>
 *
 * <p>It should be installed before context initialization.</p>
 */
export class ContextViewExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _logger: ILogger;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        this._injector = context.injector;
        this._logger = context.getLogger(this);
        context.beforeInitializing(this._beforeInitializing.bind(this));
        context.addConfigHandler(instanceOfType(ContextView), this._handleContextView.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _handleContextView(contextView: IContextView): void {
        if (this._injector.isBound(IContextView)) {
            this._logger.warn("A contextView has already been installed, ignoring {0}", [
                contextView.view
            ]);
        } else {
            this._logger.debug("Mapping {0} as contextView", [contextView.view]);

            applyCreateJSPatch(contextView.view);

            this._injector.bind(IContextView).toConstantValue(contextView);
        }
    }

    private _beforeInitializing(): void {
        if (!this._injector.isBound(IContextView)) {
            this._logger.error(
                "A ContextView must be installed if you install the ContextViewExtension."
            );
        }
    }
}
