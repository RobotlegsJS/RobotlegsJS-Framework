import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { FlowService } from "../services/FlowService";
import { ResetConfirmPopup } from "../views/ResetConfirmPopup";

@injectable()
export class ResetConfirmPopupMediator extends Mediator<ResetConfirmPopup> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.mapListener(
            this.view.confirmButton,
            "click",
            this._onClickConfirmButton,
            this
        );
        this.eventMap.mapListener(this.view.cancelButton, "click", this._onClickCancelButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickConfirmButton(e: any): void {
        this._flowService.closePopup();
    }

    private _onClickCancelButton(e: any): void {
        this._flowService.closePopup();
    }
}
