import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { InfoPopup } from "./../views/InfoPopup";

@injectable()
export class InfoPopupMediator extends Mediator<InfoPopup> {
    @inject(FlowService)
    private _service: FlowService;

    public initialize(): void {
        this.eventMap.mapListener(this.view.closeButton, "click", this._onClickCloseButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickCloseButton(e: any): void {
        this._service.closePopup();
        this._service.showStartingPopup();
    }
}
