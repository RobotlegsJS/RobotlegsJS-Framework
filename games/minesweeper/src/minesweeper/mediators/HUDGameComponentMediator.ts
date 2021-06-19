import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameEvent } from "../events/GameEvent";
import { GameStatus } from "../game/models/GameStatus";
import { LevelModel } from "../game/models/LevelModel";
import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { HUDGameComponent } from "../views/components/HUDGameComponent";

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
        this.view.animationIn();
        this.eventMap.mapListener(this.view.pauseButton, "click", this._onTriggeredHandler, this);
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_HUD_DATA,
            this._onUpdateHandler,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.RESUME,
            this._onResumeHandler,
            this
        );
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.PAUSE,
            this._onPauseHandler,
            this
        );
    }

    public destroy(): void {
        this._paused = true;
        this.eventMap.unmapListeners();
    }

    private _onResumeHandler(e: any): void {
        this._paused = false;
        this._tick();
    }

    private _onPauseHandler(e: any): void {
        this._paused = true;
    }

    private _tick(): void {
        if (this._paused === true) {
            return;
        }

        this.levelModel.clock++;
        this.view.updateValues(this.levelModel);

        setTimeout(this._tick.bind(this), 1000);
    }

    private _onUpdateHandler(e: any): void {
        this.view.updateValues(this.levelModel);
    }

    private _onTriggeredHandler(e: any): void {
        this._paused = true;
        this.flowService.showPausePopup();
    }
}
