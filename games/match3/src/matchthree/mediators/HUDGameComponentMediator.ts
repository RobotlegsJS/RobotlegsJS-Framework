import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameEvent } from "../events/GameEvent";
import { GameStatus } from "../game/models/GameStatus";
import { LevelInfo } from "../game/models/LevelInfo";
import { LevelModel } from "../game/models/LevelModel";
import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { HUDGameComponent } from "../views/components/HUDGameComponent";

@injectable()
export class HUDGameComponentMediator extends Mediator<HUDGameComponent> {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameStatus)
    private _gameStatus: GameStatus;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    private _paused: boolean;

    public initialize(): void {
        this.eventMap.on(this.view.pauseButton, "click", this._onTriggeredHandlerPauseButton, this);
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_HUD_DATA,
            this._onUpdateHandlerGame,
            this
        );

        this._setupHUDType();
    }

    public destroy(): void {
        this._paused = true;
        this.eventMap.unmapListeners();
    }

    private _setupHUDType(): void {
        if (this._levelModel.levelInfo.levelType === LevelInfo.TIMER_TYPE) {
            this.view.setTimerType();
            this.eventMap.mapListener(
                this.eventDispatcher,
                GameEvent.RESUME,
                this._onResumeHandlerGame,
                this
            );
        } else {
            this.view.setMoveType();
        }
    }

    private _onResumeHandlerGame(e: any): void {
        this._paused = false;
        this._tick();
    }

    private _tick(): void {
        if (this._paused === true) {
            return;
        }
        this._levelModel.clock--;
        this.view.updateValues(this._levelModel);

        if (
            this._levelModel.levelInfo.levelType === LevelInfo.TIMER_TYPE &&
            this._levelModel.clock === 0
        ) {
            if (this._gameStatus.hasToWait) {
                this._gameService.gameOver();
            } else {
                this._gameService.gameOverCommand();
            }
            this._paused = true;
            return;
        }
        setTimeout(this._tick.bind(this), 1000);
    }

    private _onUpdateHandlerGame(e: any): void {
        this.view.updateValues(this._levelModel);
    }

    private _onTriggeredHandlerPauseButton(e: any): void {
        this._paused = true;
        this._flowService.showPausePopup();
    }
}
