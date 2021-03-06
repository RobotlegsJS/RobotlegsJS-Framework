// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector } from "@robotlegsjs/core";
import { ISceneManager } from "../viewManager/api/ISceneManager";
import { ISceneMediatorMap } from "./api/ISceneMediatorMap";
import { SceneMediatorMap } from "./impl/SceneMediatorMap";

/**
 * This extension installs a shared ISceneMediatorMap into the context
 */
export class SceneMediatorMapExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _mediatorMap: SceneMediatorMap;

    private _sceneManager: ISceneManager;

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
        this._injector.bind(ISceneMediatorMap).to(SceneMediatorMap).inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private _beforeInitializing(): void {
        this._mediatorMap = this._injector.get<SceneMediatorMap>(ISceneMediatorMap);
        if (this._injector.isBound(ISceneManager)) {
            this._sceneManager = this._injector.get<ISceneManager>(ISceneManager);
            this._sceneManager.addSceneHandler(this._mediatorMap);
        }
    }

    private _beforeDestroying(): void {
        this._mediatorMap.unmediateAll();
        if (this._injector.isBound(ISceneManager)) {
            this._sceneManager = this._injector.get<ISceneManager>(ISceneManager);
            this._sceneManager.removeSceneHandler(this._mediatorMap);
        }
    }

    private _whenDestroying(): void {
        if (this._injector.isBound(ISceneMediatorMap)) {
            this._injector.unbind(ISceneMediatorMap);
        }
    }
}
