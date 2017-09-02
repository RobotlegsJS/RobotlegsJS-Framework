import { FlowViewMapping } from "./FlowViewMapping";
import { IContainerController } from "../api/IContainerController";
import { IFlowViewMapping } from "../api/IFlowViewMapping";
import { IFlowManager } from "../api/IFlowManager";
import { PalidorEvent } from "./../events/PalidorEvent";

import { injectable, inject, IEventMap, IEventDispatcher } from "@robotlegsjs/core";

@injectable()
export class FlowManager implements IFlowManager {

    private _eventMap: IEventMap;
    private _controller: IContainerController;
    public get controller(): IContainerController {
        return this._controller;
    }

    private _dispatcher: IEventDispatcher;
    public get dispatcher(): IEventDispatcher {
        return this._dispatcher;
    }

    private _views: Map<string, any>;
    public get views(): Map<string, any> {
        return this._views;
    }

    constructor(
        @inject(IEventMap) eventMap: IEventMap,
        @inject(IContainerController) controller: IContainerController,
        @inject(IEventDispatcher) eventDispatcher: IEventDispatcher
    ) {
        this._eventMap = eventMap;
        this._dispatcher = eventDispatcher;
        this._controller = controller;

        this._views = new Map<string, any>();
        this.mapPalidorListeners();
    }

    public map(event: string): IFlowViewMapping {
        let clazz = this._views.get(event);
        if (clazz !== undefined) {
            return null;
        }
        return new FlowViewMapping(event, this);
    }

    public mapView(eventString: string, viewClass: any): void {
        this._views.set(eventString, viewClass);
        this._eventMap.mapListener(this._dispatcher, eventString, this.onChangeView, this);
    }

    public mapFloatingView(eventString: string, viewClass: any): void {
        this._views.set(eventString, viewClass);
        this._eventMap.mapListener(this._dispatcher, eventString, this.onAddFloatingView, this);
    }

    private mapPalidorListeners(): void {
        this._eventMap.mapListener(this._dispatcher, PalidorEvent.REMOVE_CURRENT_VIEW, this.onRemoveCurrentView, this);
        this._eventMap.mapListener(this._dispatcher, PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED, this.onRemoveLastFloatingView, this);
        this._eventMap.mapListener(this._dispatcher, PalidorEvent.REMOVE_ALL_FLOATING_VIEWS, this.onRemoveAllFloatingView, this);
    }

    private onChangeView(e: any): void {
        let clazz = this._views.get(e.type);
        this._controller.removeCurrentView();
        this._controller.changeView(new clazz());
    }

    private onAddFloatingView(e: any): void {
        let clazz = this._views.get(e.type);
        this._controller.addView(new clazz());
    }

    private onRemoveCurrentView(e: any): void {
        this._controller.removeCurrentView();
    }

    private onRemoveLastFloatingView(): void {
        this._controller.removeLastFloatingViewAdded();
    }

    private onRemoveAllFloatingView(e: any): void {
        this._controller.removeAllFloatingViews();
    }
}
