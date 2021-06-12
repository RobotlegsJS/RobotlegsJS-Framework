import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { GameOverPopup } from "./../views/GameOverPopup";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class GameOverPopupMediator extends Mediator<GameOverPopup> {
    @inject(FlowService) public flowService: FlowService;

    @inject(GameService) public gameService: GameService;

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
