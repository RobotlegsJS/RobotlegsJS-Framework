import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { GameEvent } from "../events/GameEvent";
import { GameModel } from "../models/GameModel";
import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { HUDGameComponent } from "../views/components/HUDGameComponent";

@injectable()
export class HUDGameComponentMediator extends Mediator<HUDGameComponent> {
    @inject(GameModel)
    private _model: GameModel;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    public initialize(): void {
        this.eventMap.on(this.view.pauseButton, "click", this.pauseButton_onClick, this);
        this.eventMap.mapListener(
            this.eventDispatcher,
            GameEvent.UPDATE_HUD_DATA,
            this.game_onUpdate,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private game_onUpdate(e: any): void {
        this.view.updateData(this._model);
    }

    private pauseButton_onClick(e: any): void {
        this._gameService.pause();
        this._flowService.showPausePopup();
    }
}
