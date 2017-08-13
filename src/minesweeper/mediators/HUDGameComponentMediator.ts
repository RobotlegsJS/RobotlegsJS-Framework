import { GameEvent } from "./../events/GameEvent";
import { GameStatus } from "./../game/models/GameStatus";
import { LevelModel } from "./../game/models/LevelModel";
import { GameService } from "./../services/GameService";
import { FlowService } from "./../services/FlowService";
import { HUDGameComponent } from "./../views/components/HUDGameComponent";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class HUDGameComponentMediator extends Mediator<HUDGameComponent> {

    @inject(LevelModel)
    public levelModel: LevelModel;

    @inject(GameStatus)
    public gameStatus: GameStatus;

    @inject(GameService)
    public gameService: GameService;

    @inject(FlowService)
    public flowService: FlowService;

    private _paused: boolean;

    public initialize(): void {
        this.view.updateValues(this.levelModel);
        this.eventMap.mapListener(this.view.pauseButton, "click", this.pauseButton_onTriggeredHandler, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_HUD_DATA, this.game_onUpdateHandler, this);
    }

    public destroy(): void {
        this._paused = true;
        this.eventMap.unmapListeners();
    }

    private game_onResumeHandler(e: any): void {
        this._paused = false;
        this.tick(this);
    }

    private tick(obThis: any = this): void {
/*  */
    }

    private game_onUpdateHandler(e: any): void {
        this.view.updateValues(this.levelModel);
    }

    private pauseButton_onTriggeredHandler(e: any): void {
        this._paused = true;
        this.flowService.showPausePopup();
    }

}
