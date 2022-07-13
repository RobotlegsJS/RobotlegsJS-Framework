import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { LevelModel } from "../game/models/LevelModel";
import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { YouWinPopup } from "../views/YouWinPopup";

@injectable()
export class YouWinPopupMediator extends Mediator<YouWinPopup> {
    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameService)
    public gameService: GameService;

    @inject(LevelModel)
    public levelModel: LevelModel;

    public initialize(): void {
        this.view.animationIn();
        this.view.showInfo(this.levelModel.clock, this.levelModel.numClicks);
        this.eventMap.on(this.view.homeButton, "click", this._onClickHomeButton, this);
        this.eventMap.on(this.view.retryButton, "click", this._onClickRetryButton, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onClickHomeButton(e: any): void {
        this.flowService.setHomeView();
        this.flowService.closePopup();
    }

    private _onClickRetryButton(e: any): void {
        this.flowService.closePopup();
        this.gameService.retryCommand();
    }
}
