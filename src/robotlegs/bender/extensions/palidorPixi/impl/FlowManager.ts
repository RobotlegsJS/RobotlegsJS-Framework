import { FlowViewMapping } from "./FlowViewMapping";
import { IFlowViewMapping } from "../api/IFlowViewMapping";
import { IFlowManager } from "../api/IFlowManager";

import { injectable, inject, IEventMap, IEventDispatcher } from "@robotlegsjs/core";

@injectable()
export class FlowManager implements IFlowManager {

    @inject(IEventMap)
    public eventMap: IEventMap;

    @inject(IEventDispatcher)
    public eventDispatcher: IEventDispatcher;

    private _views: Map<string, any>;
    public get views(): Map<string, any> {
        return this._views;
    }

    constructor() {
        this._views = new Map<string, any>();
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
        this.eventMap.mapListener(this.eventDispatcher, eventString, this.onSetCurrentView, this);
    }

    public mapFloatingView(eventString: string, viewClass: any): void {
        this._views.set(eventString, viewClass);
        this.eventMap.mapListener(this.eventDispatcher, eventString, this.onAddFloatingView, this);
    }

    private onSetCurrentView(e: any): void {
        /*  */
    }

    private onAddFloatingView(e: any): void {
        /*  */
    }
}
