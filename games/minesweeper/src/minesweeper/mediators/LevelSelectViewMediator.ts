import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { HighScoreManager } from "../game/managers/HighScoreManager";
import { LevelSelectView } from "../views/LevelSelectView";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";

@injectable()
export class LevelSelectViewMediator extends Mediator<LevelSelectView> {
    @inject(FlowService) public flowService: FlowService;
    @inject(GameService) public gameService: GameService;
    @inject(HighScoreManager) public highScoreManager: HighScoreManager;

    public initialize(): void {
        this.view.updateHighscore(this.highScoreManager.getAllHighScore());
        this.view.animationIn();
        this.eventMap.mapListener(
            this.view.easyButton,
            "click",
            this.levelButton_onTriggeredHandler,
            this
        );
        this.eventMap.mapListener(
            this.view.normalButton,
            "click",
            this.levelButton_onTriggeredHandler,
            this
        );
        this.eventMap.mapListener(
            this.view.hardButton,
            "click",
            this.levelButton_onTriggeredHandler,
            this
        );
        this.eventMap.mapListener(
            this.view.customButton,
            "click",
            this.levelCustomButton_onTriggeredHandler,
            this
        );
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private levelCustomButton_onTriggeredHandler(e: any): void {
        this.flowService.showLevelCustomOptionsView();
    }
    private levelButton_onTriggeredHandler(e: any): void {
        const levelId = e.target.text;
        this.gameService.createLevel(levelId);
    }
}
