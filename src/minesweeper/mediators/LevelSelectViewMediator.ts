import { LevelSelectView } from "../views/LevelSelectView";
import { GameService } from "./../services/GameService";
import { FlowService } from "./../services/FlowService";
import { ViewPortSize } from "./../utils/ViewPortSize";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class LevelSelectViewMediator extends Mediator<LevelSelectView> {

    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameService)
    public gameService: GameService;


    public initialize(): void {

        this.eventMap.mapListener(this.view.easyButton, "click", this.levelButton_onTriggeredHandler, this);
        this.eventMap.mapListener(this.view.normalButton, "click", this.levelButton_onTriggeredHandler, this);
        this.eventMap.mapListener(this.view.hardButton, "click", this.levelButton_onTriggeredHandler, this);
        this.eventMap.mapListener(this.view.customButton, "click", this.levelCustomButton_onTriggeredHandler, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private levelCustomButton_onTriggeredHandler(e: any): void {
        this.flowService.showLevelCustomOptionsPopup();
    }

    private levelButton_onTriggeredHandler(e: any): void {
        let levelId = e.target.text;
        this.gameService.createLevel(levelId);
    }
}
