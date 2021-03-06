// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { IViewManager } from "../../viewManager/api/IViewManager";
import { IContextView } from "../api/IContextView";

/**
 * This configuration file adds the ContextView to the viewManager.
 *
 * It requires that the ViewManagerExtension, ContextViewExtension
 * and a ContextView have been installed.
 */
@injectable()
export class ContextViewListenerConfig implements IConfig {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _contextView: IContextView;

    private _viewManager: IViewManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    public constructor(
        @inject(IContextView) contextView: IContextView,
        @inject(IViewManager) viewManager: IViewManager
    ) {
        this._contextView = contextView;
        this._viewManager = viewManager;
    }

    /**
     * @inheritDoc
     */
    public configure(): void {
        // Adds the Context View to the View Manager at startup
        this._viewManager.addContainer(this._contextView.view);
    }
}
