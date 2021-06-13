import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { HomeView } from "./../views/HomeView";

@injectable()
export class HomeViewMediator extends Mediator<HomeView> {
    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.mapListener(this.view.startButton, "click", this._onClickStartButton, this);
        this.eventMap.mapListener(
            this.view.optionButton,
            "click",
            this._onClickOptionsButton,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickStartButton(e: any): void {
        this._flowService.setGameView();
    }

    private _onClickOptionsButton(e: any): void {
        this._flowService.setOptionsView();
    }
}
