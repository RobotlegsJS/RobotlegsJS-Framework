// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContainerController } from "../api/IContainerController";
import { IFlowViewMapping } from "../api/IFlowViewMapping";
import { IFlowManager } from "../api/IFlowManager";

import { PalidorEvent } from "./../events/PalidorEvent";

import { FlowViewMapping } from "./FlowViewMapping";

import { Container } from "pixi.js";

import { injectable, inject, IClass, IEventMap, IEventDispatcher, Event } from "@robotlegsjs/core";

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

    private _views: Map<string, IClass<Container>>;
    public get views(): Map<string, IClass<Container>> {
        return this._views;
    }

    public constructor(
        @inject(IEventMap) eventMap: IEventMap,
        @inject(IContainerController) controller: IContainerController,
        @inject(IEventDispatcher) eventDispatcher: IEventDispatcher
    ) {
        this._eventMap = eventMap;
        this._dispatcher = eventDispatcher;
        this._controller = controller;

        this._views = new Map<string, IClass<Container>>();
        this._mapPalidorListeners();
    }

    public map(event: string): IFlowViewMapping {
        let clazz = this._views.get(event);
        if (clazz !== undefined) {
            return null;
        }
        return new FlowViewMapping(event, this);
    }

    public mapView(eventString: string, viewClass: IClass<Container>): void {
        this._views.set(eventString, viewClass);
        this._eventMap.mapListener(this._dispatcher, eventString, this._onChangeView, this);
    }

    public mapFloatingView(eventString: string, viewClass: IClass<Container>): void {
        this._views.set(eventString, viewClass);
        this._eventMap.mapListener(this._dispatcher, eventString, this._onAddFloatingView, this);
    }

    private _mapPalidorListeners(): void {
        this._eventMap.mapListener(
            this._dispatcher,
            PalidorEvent.REMOVE_CURRENT_VIEW,
            this._onRemoveCurrentView,
            this
        );
        this._eventMap.mapListener(
            this._dispatcher,
            PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED,
            this._onRemoveLastFloatingView,
            this
        );
        this._eventMap.mapListener(
            this._dispatcher,
            PalidorEvent.REMOVE_ALL_FLOATING_VIEWS,
            this._onRemoveAllFloatingView,
            this
        );
    }

    private _onChangeView(e: Event): void {
        let clazz = this._views.get(e.type);
        this._controller.removeCurrentView();
        this._controller.changeView(new clazz());
    }

    private _onAddFloatingView(e: Event): void {
        let clazz = this._views.get(e.type);
        this._controller.addView(new clazz());
    }

    private _onRemoveCurrentView(e: Event): void {
        this._controller.removeCurrentView();
    }

    private _onRemoveLastFloatingView(): void {
        this._controller.removeLastFloatingViewAdded();
    }

    private _onRemoveAllFloatingView(e: Event): void {
        this._controller.removeAllFloatingViews();
    }
}
