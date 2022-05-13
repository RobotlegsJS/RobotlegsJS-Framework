import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { FlowService } from "../services/FlowService";
import { OptionsView } from "../views/OptionsView";

@injectable()
export class OptionsViewMediator extends Mediator<OptionsView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.on(this.view.homeButton, "click", this._onClickHomeButton, this);
        this.eventMap.on(this.view.resetButton, "click", this._onClickResetButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickHomeButton(e: any, thisObject: any): void {
        this._flowService.setHomeView();
    }

    private _onClickResetButton(e: any): void {
        this._flowService.showResetConfirmPopup();
    }
}
