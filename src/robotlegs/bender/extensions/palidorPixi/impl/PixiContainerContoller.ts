import { IContainerController } from "../api/IContainerController";
import { IPixiRootContainer } from "../api/IPixiRootContainer";

import { Container } from "pixi.js";
import { injectable, inject } from "@robotlegsjs/core";

@injectable()
export class PixiContainerContoller implements IContainerController {

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

    private _floatingViews: Array<Container>;
    public get floatingViews(): Array<Container> {
        return this._floatingViews;
    }

    constructor( @inject(IPixiRootContainer) rootContainer: IPixiRootContainer) {
        this._floatingViews = new Array<Container>();
        this._root = rootContainer.getRootContainer();
        this.createLayers();
    }

    public addView(view: any): void {
        if (this._floatingViews.indexOf(view) === -1) {
            this._floatingViews.push(view);
            this._dynamicLayer.addChild(view);
        }
    }

    public changeView(view: any): void {
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
