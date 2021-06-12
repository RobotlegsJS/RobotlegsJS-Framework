import { FlowService } from "./../services/FlowService";
import { GameView } from "./../views/GameView";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class GameViewMediator extends Mediator<GameView> {
    @inject(FlowService) public flowService: FlowService;
    public initialize(): void {
        this.view.createComponents();
        this.view.animationIn();
        this.eventMap.mapListener(this.view.pauseButton, "click", this.pauseButton_onTriggeredHandler, this);
    }

    public destroy(): void {
        this.view.destroy();
    }
    private pauseButton_onTriggeredHandler(e: any): void {
        this.flowService.showPausePopup();
    }
}
