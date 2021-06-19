import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { PalidorEvent } from "@robotlegsjs/pixi-palidor";
import { Model } from "../models/Model";
import { FeedbackPopup } from "../views/FeedbackPopup";

@injectable()
export class FeedbackPopupMediator extends Mediator<FeedbackPopup> {
    @inject(Model)
    private _model: Model;

    public initialize(): void {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.createMSG(this._model.feedback);
        this.eventMap.mapListener(this.view, "click", this._onClick, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClick(e: any): void {
        this.eventDispatcher.dispatchEvent(
            new PalidorEvent(PalidorEvent.REMOVE_LAST_FLOATING_VIEW_ADDED)
        );
    }
}
