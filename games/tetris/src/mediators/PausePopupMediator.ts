import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { PausePopup } from "./../views/PausePopup";

@injectable()
export class PausePopupMediator extends Mediator<PausePopup> {
    @inject(FlowService)
    private _flowService: FlowService;

    @inject(GameService)
    private _gameService: GameService;

    public initialize(): void {
        this.eventMap.mapListener(this.view.homeButton, "click", this._onClickHomeButton, this);
        this.eventMap.mapListener(this.view.resumeButton, "click", this._onClickResumeButton, this);
        this.eventMap.mapListener(this.view.retryButton, "click", this._onClickRetryButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickHomeButton(e: any): void {
        this._flowService.setHomeView();
        this._flowService.closePopup();
    }

    private _onClickResumeButton(e: any): void {
        this._flowService.closePopup();
        this._flowService.showStartingPopup();
    }

    private _onClickRetryButton(e: any): void {
        this._flowService.closePopup();
        this._gameService.createLevel();
    }
}
