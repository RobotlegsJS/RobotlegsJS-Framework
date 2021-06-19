import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { GameEvent } from "./../events/GameEvent";
import { GameModel } from "./../models/GameModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { HUDGameComponent } from "./../views/components/HUDGameComponent";

@injectable()
export class HUDGameComponentMediator extends Mediator<HUDGameComponent> {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.mapListener(this.view.pauseButton, "click", this._onClickPauseButton, this);
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_DATA,
            this._onUpdateGame,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onUpdateGame(e: any): void {
        this.view.updateData(this._model);
    }

    private _onClickPauseButton(e: any): void {
        this._gameService.pause();
        this._flowService.showPausePopup();
    }
}
