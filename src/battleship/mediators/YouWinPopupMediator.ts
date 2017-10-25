import { LevelModel } from "./../game/models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { YouWinPopup } from "./../views/YouWinPopup";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class YouWinPopupMediator extends Mediator<YouWinPopup> {
    @inject(FlowService) public flowService: FlowService;

    @inject(GameService) public gameService: GameService;

    @inject(LevelModel) public levelModel: LevelModel;

    public initialize(): void {
        this.view.animationIn();
        this.eventMap.mapListener(this.view.homeButton, "click", this.homeButton_onClick, this);
        this.eventMap.mapListener(this.view.retryButton, "click", this.retryButton_onClick, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private homeButton_onClick(e: any): void {
        this.flowService.setHomeView();
        this.flowService.closePopup();
    }

    private retryButton_onClick(e: any): void {
        this.flowService.closePopup();
        this.gameService.retryCommand();
    }
}
