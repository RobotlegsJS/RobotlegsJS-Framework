import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { HighScoreManager } from "../game/managers/HighScoreManager";
import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { LevelSelectView } from "../views/LevelSelectView";

@injectable()
export class LevelSelectViewMediator extends Mediator<LevelSelectView> {
    @inject(FlowService)
    public flowService: FlowService;

    @inject(GameService)
    public gameService: GameService;

    @inject(HighScoreManager)
    public highScoreManager: HighScoreManager;

    public initialize(): void {
        this.view.updateHighscore(this.highScoreManager.getAllHighScore());
        this.view.animationIn();
        this.eventMap.on(this.view.easyButton, "click", this._onTriggeredHandlerLevelButton, this);
        this.eventMap.on(
            this.view.normalButton,
            "click",
            this._onTriggeredHandlerLevelButton,
            this
        );
        this.eventMap.on(this.view.hardButton, "click", this._onTriggeredHandlerLevelButton, this);
        this.eventMap.on(
            this.view.customButton,
            "click",
            this._onTriggeredHandlerLevelCustomButton,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTriggeredHandlerLevelCustomButton(e: any): void {
        this.flowService.showLevelCustomOptionsView();
    }

    private _onTriggeredHandlerLevelButton(e: any): void {
        const levelId = e.target.text;
        this.gameService.createLevel(levelId);
    }
}
