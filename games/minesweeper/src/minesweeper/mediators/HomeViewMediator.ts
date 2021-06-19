import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { FlowService } from "../services/FlowService";
import { HomeView } from "../views/HomeView";

@injectable()
export class HomeViewMediator extends Mediator<HomeView> {
    @inject(FlowService)
    public flowService: FlowService;

    public initialize(): void {
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.animationIn();
        this.eventMap.mapListener(this.view, "click", this._onClickPlayButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickPlayButton(e: any): void {
        this.view.animationOut(this._animationComplete.bind(this));
    }

    private _animationComplete(): void {
        this.flowService.setLevelSelectView();
    }
}
