import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { PalidorEvent } from "@robotlegsjs/pixi-palidor";

import { Texts } from "../utils/Texts";
import { FeedbackPopup } from "./../views/FeedbackPopup";

@injectable()
export class FeedbackPopupMediator extends Mediator<FeedbackPopup> {
    public initialize(): void {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.createMSG(Texts.SUCCESS);
        this.eventMap.mapListener(this.view, "click", this.onClick, this);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onClick(e: any): void {
        this.eventDispatcher.dispatchEvent(new PalidorEvent(PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED));
    }
}
