import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { AlertPopup } from "../views/AlertPopup";

@injectable()
export class AlertPopupMediator extends Mediator<AlertPopup> {
    public initialize(): void {
        this.eventMap.mapListener(
            this.view.confirmButton,
            "click",
            this._onTriggeredHandlerConfirmButton,
            this
        );
        this.eventMap.mapListener(
            this.view.cancelButton,
            "click",
            this._onTriggeredHandlerCancelButton,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTriggeredHandlerConfirmButton(e: any): void {
        this.view.parent.removeChild(this.view);
    }

    private _onTriggeredHandlerCancelButton(e: any): void {
        this.view.parent.removeChild(this.view);
    }
}
