// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IBundle, IContext, ILogger, instanceOfType } from "@robotlegsjs/core";

import { IContextView } from "../../extensions/contextView/api/IContextView";
import { ContextView } from "../../extensions/contextView/impl/ContextView";
import { ContextViewListenerConfig } from "../../extensions/contextView/impl/ContextViewListenerConfig";

import { ContextViewExtension } from "../../extensions/contextView/ContextViewExtension";
import { MediatorMapExtension } from "../../extensions/mediatorMap/MediatorMapExtension";
import { StageCrawlerExtension } from "../../extensions/viewManager/StageCrawlerExtension";
import { StageObserverExtension } from "../../extensions/viewManager/StageObserverExtension";
import { ViewManagerExtension } from "../../extensions/viewManager/ViewManagerExtension";

/**
 * For that Classic Robotlegs flavour
 *
 * <p>This bundle installs a number of extensions commonly used
 * in typical Robotlegs applications and modules.</p>
 */
export class PixiBundle implements IBundle {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _context: IContext;
    private _logger: ILogger;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        this._context = context;
        this._logger = context.getLogger(this);

        this._context.install(
            ContextViewExtension,
            ViewManagerExtension,
            StageObserverExtension,
            MediatorMapExtension,
            StageCrawlerExtension
        );

        this._context.addConfigHandler(
            instanceOfType(ContextView),
            this._handleContextView.bind(this)
        );
        this._context.whenInitializing(this._whenInitializing.bind(this));
        this._context.afterDestroying(this._afterDestroying.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _handleContextView(): void {
        this._context.configure(ContextViewListenerConfig);
    }

    private _whenInitializing(): void {
        if (!this._context.injector.isBound(IContextView)) {
            this._logger.error("PixiBundle requires IContextView.");
        }
    }

    private _afterDestroying(): void {
        this._context = null;
        this._logger = null;
    }
}
