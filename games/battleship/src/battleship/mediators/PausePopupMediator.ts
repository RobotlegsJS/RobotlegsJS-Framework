import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { PausePopup } from "../views/PausePopup";

import { injectable, inject } from "@robotlegsjs/core";

import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class PausePopupMediator extends Mediator<PausePopup> {
    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameService)
    public gameService: GameService;

    public initialize(): void {
        this.view.animationIn();
        this.eventMap.mapListener(this.view.homeButton, "click", this._onClickHomeButton, this);
        this.eventMap.mapListener(this.view.resumeButton, "click", this._onClickResumeButton, this);
        this.eventMap.mapListener(this.view.retryButton, "click", this._onClickRetryButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickHomeButton(e: any): void {
        this.flowService.setHomeView();
        this.flowService.closePopup();
    }

    private _onClickResumeButton(e: any): void {
        this.flowService.closePopup();
    }

    private _onClickRetryButton(e: any): void {
        this.flowService.closePopup();
        this.gameService.retryCommand();
    }
}
