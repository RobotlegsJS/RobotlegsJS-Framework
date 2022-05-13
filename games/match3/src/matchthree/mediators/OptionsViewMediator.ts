import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { FlowService } from "../services/FlowService";
import { OptionsView } from "../views/OptionsView";

@injectable()
export class OptionsViewMediator extends Mediator<OptionsView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.on(this.view.backButton, "click", this._onClickBackButton, this);
        this.eventMap.on(this.view.deleteButton, "click", this._onClickDeleteButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickBackButton(e: any, thisObject: any): void {
        this._flowService.setHomeView();
    }

    private _onClickDeleteButton(e: any): void {
        this._flowService.showAlertPopup();
    }
}
