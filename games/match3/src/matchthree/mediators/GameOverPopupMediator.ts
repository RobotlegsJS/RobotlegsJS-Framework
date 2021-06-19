import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { FlowService } from "../services/FlowService";
import { GameService } from "../services/GameService";
import { GameOverPopup } from "../views/GameOverPopup";

@injectable()
export class GameOverPopupMediator extends Mediator<GameOverPopup> {
    @inject(FlowService)
    private _flowService: FlowService;

    @inject(GameService)
    private _gameService: GameService;

    public initialize(): void {
        this.eventMap.mapListener(
            this.view.retryButton,
            "click",
            this._onTriggeredHandlerRetryButton,
            this
        );
        this.eventMap.mapListener(
            this.view.levelSelectButton,
            "click",
            this._onTriggeredHandlerLevelSelectButton,
            this
        );
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }

    private _onTriggeredHandlerRetryButton(e: any): void {
        this._flowService.closePopup();
        this._gameService.retryCommand();
    }

    private _onTriggeredHandlerLevelSelectButton(e: any): void {
        this._flowService.closePopup();
        this._flowService.setLevelSelectView();
    }
}
