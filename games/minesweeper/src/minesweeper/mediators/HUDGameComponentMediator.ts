import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { GameEvent } from "./../events/GameEvent";
import { GameStatus } from "./../game/models/GameStatus";
import { LevelModel } from "./../game/models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { HUDGameComponent } from "./../views/components/HUDGameComponent";

@injectable()
export class HUDGameComponentMediator extends Mediator<HUDGameComponent> {
    @inject(LevelModel) public levelModel: LevelModel;
    @inject(GameStatus) public gameStatus: GameStatus;
    @inject(GameService) public gameService: GameService;
    @inject(FlowService) public flowService: FlowService;

    private _paused: boolean;

    public initialize(): void {
        this.view.updateValues(this.levelModel);
        this.view.animationIn();
        this.eventMap.mapListener(
            this.view.pauseButton,
            "click",
            this.pauseButton_onTriggeredHandler,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_HUD_DATA,
            this.game_onUpdateHandler,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.RESUME,
            this.game_onResumeHandler,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.PAUSE,
            this.game_onPauseHandler,
            this
        );
    }
    public destroy(): void {
        this._paused = true;
        this.eventMap.unmapListeners();
    }
    private game_onResumeHandler(e: any): void {
        this._paused = false;
        this.tick();
    }
    private game_onPauseHandler(e: any): void {
        this._paused = true;
    }
    private tick(): void {
        if (this._paused === true) {
            return;
        }
        this.levelModel.clock++;
        this.view.updateValues(this.levelModel);

        setTimeout(this.tick.bind(this), 1000);
    }
    private game_onUpdateHandler(e: any): void {
        this.view.updateValues(this.levelModel);
    }
    private pauseButton_onTriggeredHandler(e: any): void {
        this._paused = true;
        this.flowService.showPausePopup();
    }
}
