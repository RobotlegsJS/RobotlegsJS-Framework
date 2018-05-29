import { Event, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { PalidorEvent } from "./../../src/robotlegs/bender/extensions/palidorPixi/events/PalidorEvent";
import { FloatingView } from "./../views/FloatingView";

@injectable()
export class FloatingViewMediator extends Mediator<FloatingView> {
    public initialize(): void {
        this.view.interactive = true;
        this.view.setTitle(this.view.parent.children.length);
        this.eventMap.mapListener(this.view.addViewButton, "click", this.onAddView, this);
        this.eventMap.mapListener(this.view.closeAllButton, "click", this.onCloseAll, this);
        this.eventMap.mapListener(this.view.closeButton, "click", this.onClose, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onAddView(e: any): void {
        this.eventDispatcher.dispatchEvent(new Event("floatingView"));
    }
    private onCloseAll(e: any): void {
        this.eventDispatcher.dispatchEvent(new PalidorEvent(PalidorEvent.REMOVE_ALL_FLOATING_VIEWS));
    }
    private onClose(e: any): void {
        this.eventDispatcher.dispatchEvent(new PalidorEvent(PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED));
    }
}
