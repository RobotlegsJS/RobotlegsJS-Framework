import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { HomeView } from "./../views/HomeView";

@injectable()
export class HomeViewMediator extends Mediator<HomeView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.mapListener(this.view.playButton, "click", this._onClickPlayButton, this);
        this.eventMap.mapListener(
            this.view.optionsButton,
            "click",
            this._onClickOptionsButton,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickPlayButton(e: any): void {
        this._flowService.setLevelSelectView();
    }

    private _onClickOptionsButton(e: any): void {
        this._flowService.setOptionsView();
    }
}
