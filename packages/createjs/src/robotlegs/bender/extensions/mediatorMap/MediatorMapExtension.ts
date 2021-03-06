// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector } from "@robotlegsjs/core";
import { IViewManager } from "../viewManager/api/IViewManager";
import { IMediatorMap } from "./api/IMediatorMap";
import { MediatorMap } from "./impl/MediatorMap";

/**
 * This extension installs a shared IMediatorMap into the context
 */
export class MediatorMapExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _mediatorMap: MediatorMap;

    private _viewManager: IViewManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context
            .beforeInitializing(this._beforeInitializing.bind(this))
            .beforeDestroying(this._beforeDestroying.bind(this))
            .whenDestroying(this._whenDestroying.bind(this));
        this._injector = context.injector;
        this._injector.bind(IMediatorMap).to(MediatorMap).inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _beforeInitializing(): void {
        this._mediatorMap = this._injector.get<MediatorMap>(IMediatorMap);

        if (this._injector.isBound(IViewManager)) {
            this._viewManager = this._injector.get<IViewManager>(IViewManager);
            this._viewManager.addViewHandler(this._mediatorMap);
        }
    }

    private _beforeDestroying(): void {
        this._mediatorMap.unmediateAll();

        if (this._injector.isBound(IViewManager)) {
            this._viewManager = this._injector.get<IViewManager>(IViewManager);
            this._viewManager.removeViewHandler(this._mediatorMap);
        }
    }

    private _whenDestroying(): void {
        if (this._injector.isBound(IMediatorMap)) {
            this._injector.unbind(IMediatorMap);
        }
    }
}
