// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContainerController } from "../api/IContainerController";

import { Container } from "pixi.js";
import { injectable, inject } from "@robotlegsjs/core";
import { IContextView } from "@robotlegsjs/pixi";

@injectable()
export class PixiContainerController implements IContainerController {
    private _root: Container;

    private _staticLayer: Container;
    public get staticLayer(): Container {
        return this._staticLayer;
    }

    private _dynamicLayer: Container;
    public get dynamicLayer(): Container {
        return this._dynamicLayer;
    }

    private _currentView: Container;
    public get currentView(): Container {
        return this._currentView;
    }

    private _floatingViews: Container[];
    public get floatingViews(): Container[] {
        return this._floatingViews;
    }

    public constructor(@inject(IContextView) contextView: IContextView) {
        this._floatingViews = [];
        this._root = contextView.view;
        this.createLayers();
    }

    public addView(view: Container): void {
        if (this._floatingViews.indexOf(view) === -1) {
            this._floatingViews.push(view);
            this._dynamicLayer.addChild(view);
        }
    }

    public changeView(view: Container): void {
        this._currentView = view;
        this._staticLayer.addChildAt(view, 0);
    }

    public removeCurrentView(): void {
        if (this._currentView !== undefined) {
            this._staticLayer.removeChild(this._currentView);
            this._currentView = undefined;
        }
    }

    public removeLastFloatingViewAdded(): void {
        if (this._floatingViews.length > 0) {
            this._dynamicLayer.removeChild(this._floatingViews.pop());
        }
    }

    public removeAllFloatingViews(): void {
        while (this._floatingViews.length > 0) {
            this._dynamicLayer.removeChild(this._floatingViews.pop());
        }
    }

    public createLayers(): void {
        this._staticLayer = new Container();
        this._dynamicLayer = new Container();

        this._root.addChild(this._staticLayer);
        this._root.addChild(this._dynamicLayer);
    }
}
